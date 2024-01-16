from models import db, User, Comment, Post, Avatar, World
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask import Flask, make_response, jsonify, request
import os


#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
migrate = Migrate(app, db)
api = Api(app)

# Views go here!

class Login(Resource):
  def post(self):
    data = request.get_json()
    username = data['username']
    password = data['password']
    user = User.query.filter(User.username == username).first()
    if user:
      if user.authenticate(password):
          return make_response(user.to_dict(), 200)
      return {'error': "Unauthorized"}, 401
    return {'error': "User Not Found"}, 404 
  
api.add_resource(Login,'/login')

class AllUsers(Resource):
    def get(self):
        response_body = [user.to_dict(rules=('-comments',"-avatars")) for user in User.query.all()]
        return make_response(response_body,200)
    def post(self):
        try:
            # Ensure required fields are present in the request
            name = request.json.get('name')
            password = request.json.get('password')
            username = request.json.get('username')

            if not all([name, username, password]):
                raise ValueError("Missing required fields")

            new_u = User(
                name=name,
                username=username,
            )
            new_u.password_hash = password
            db.session.add(new_u)
            db.session.commit()

            # Assuming to_dict() method is defined in your Mission model
            rb = new_u.to_dict(rules = ('-comments','-avatars'))
            return make_response(rb, 201)

        except ValueError:
            rb = {
                "errors": ["validation errors"]
                }
            return make_response(rb, 400)

api.add_resource(AllUsers,'/users')

class UserById(Resource):
    def get(self,id):

        user = User.query.filter(User.id == id).first()

        if user:
            response_body = user.to_dict(rules = ('-comments','-avatars'))
            return make_response(response_body,200)
        else:
            response_body = {
                "error": "User not found"
            }
            return make_response(response_body,404)
    
    def delete(self, id ):
        user = User.query.filter(User.id == id).first()

        if user:
            db.session.delete(user)
            db.session.commit()
            response_body = {}
            return make_response(response_body, 204)
        else:
            response_body = {
                "error": "Scientist not found"
            }
            return make_response(response_body,404)
    
    def patch(self, id):
        user = User.query.filter(User.id == id).first()

        if user:
            try:
                # Get the data from the PATCH request
                data = request.json

                # Update user attributes if present in the request
                if 'name' in data:
                    user.name = data['name']
                if 'password' in data:
                    user.password = data['password']
                if 'username' in data:
                    user.username = data['username']

                # Commit changes to the database
                db.session.commit()

                # Return the updated user
                response_body = user.to_dict(rules=('comments', 'avatars'))
                return make_response(response_body, 200)

            except ValueError:
                response_body = {
                    "error": "Invalid data in the request"
                }
                return make_response(response_body, 400)
        else:
            response_body = {
                "error": "User not found"
            }
            return make_response(response_body, 404)

api.add_resource(UserById,'/users/<int:id>')



class AllPosts(Resource):
    def get(self):
        response_body = [post.to_dict(rules=('-comments',"-avatars")) for post in Post.query.all()]
        return make_response(response_body,200)
    

api.add_resource(AllPosts,'/posts')

class AllAvatars(Resource):
    def get(self):
        response_body = [avatar.to_dict(rules=('-user',"-world")) for avatar in Avatar.query.all()]
        return make_response(response_body,200)
    
    def post(self, user_id, world_id):
        try:
            # Ensure required fields are present in the request
            avatar_head= request.json.get('avatar_head')
            avatar_body= request.json.get('avatar_body')
            avatar_legs= request.json.get('avatar_legs') 

            if not all([avatar_head,avatar_body,avatar_legs]):
                raise ValueError("Missing required fields")

            new_a = Avatar(
                avatar_head = avatar_head,
                avatar_body = avatar_body,
                avatar_legs = avatar_legs,
                world_id = world_id,
                user_id = user_id
            )
            db.session.add(new_a)
            db.session.commit()

            # Assuming to_dict() method is defined in your Mission model
            rb = new_a.to_dict(rules = ('-user','-world','-posts'))
            return make_response(rb, 201)

        except ValueError:
            rb = {
                "errors": ["matts error"]
                }
            return make_response(rb, 400)

api.add_resource(AllAvatars,'/avatars/<int:user_id>/<int:world_id>')


class AllWorlds(Resource):
    def get(self):
        response_body = [world.to_dict(rules=('-avatar',)) for world in World.query.all()]
        return make_response(response_body,200)
    def post(self):
        try:
            # Ensure required fields are present in the request
            name = request.json.get('name')
            local_avatars = request.json.get('local_avatars')
            subject = request.json.get('subject')

            if not all([name, subject, local_avatars]):
                raise ValueError("Missing required fields")

            new_w = World(
                name=name,
                local_avatars=local_avatars,
                subject=subject,
            )
            db.session.add(new_w)
            db.session.commit()

            # Assuming to_dict() method is defined in your Mission model
            rb = new_w.to_dict(rules = ('-avatars',))
            return make_response(rb, 201)

        except ValueError:
            rb = {
                "errors": ["validation errors"]
                }
            return make_response(rb, 400)

api.add_resource(AllWorlds,'/worlds')






@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)
   