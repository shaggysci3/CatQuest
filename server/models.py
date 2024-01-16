from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property



# metadata = MetaData(naming_convention=convention)

# db = SQLAlchemy(metadata=metadata)


# at least 1 validation in any of the models 
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)
    name = db.Column(db.String)

    # Add relationship outgoing
    comments = db.relationship('Comment', back_populates = 'user', cascade= 'all, delete-orphan')
    avatars = db.relationship('Avatar', back_populates = 'user', cascade= 'all, delete-orphan')
    
    @hybrid_property
    def password_hash(self):
      raise Exception('Password hashes may not be viewed')
    @password_hash.setter
    def password_hash(self, password):
      password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
      self._password_hash = password_hash.decode('utf-8')
    def authenticate(self, password):
      return bcrypt.check_password_hash(
      self._password_hash, password.encode('utf-8')
      )
    def __repr__(self):
        return f'<User {self.id}: {self.name}>'
    
    @validates('name')
    def validate_name(self,attr,value):
        if value:
            return value
        else:
            raise ValueError('please enter a name')
    
class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)

    # Add relationship column
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    

    # Add relationship incoming
    user = db.relationship('User', back_populates = 'comments') 
    post = db.relationship('Post', back_populates = 'comments') 
    # post_id
    
    def __repr__(self):
        return f'<Comment {self.id}: {self.name}>'
    

class Post(db.Model, SerializerMixin):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    likes = db.Column(db.String)
    content = db.Column(db.String)

    # Add relationship column
    avatar_id = db.Column(db.Integer, db.ForeignKey('avatars.id'))

    avatar = db.relationship('Avatar', back_populates = 'posts')

    # Add relationship outgoing
    comments = db.relationship('Comment', back_populates = 'post', cascade= 'all, delete-orphan')
    
    
    
    def __repr__(self):
        return f'<Post {self.id}: {self.name}>'
    
class World(db.Model, SerializerMixin):
    __tablename__ = 'worlds'

    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String)
    local_avatars = db.Column(db.String)
    name = db.Column(db.String)

    # Add relationship outgoing
    avatars = db.relationship('Avatar', back_populates = 'world', cascade= 'all, delete-orphan')
    
    
    def __repr__(self):
        return f'<World {self.id}: {self.name}>'
    
class Avatar(db.Model, SerializerMixin):
    __tablename__ = 'avatars'

    id = db.Column(db.Integer, primary_key=True)
    avatar_head = db.Column(db.String)
    avatar_body = db.Column(db.String)
    avatar_legs = db.Column(db.String)

    # Add relationship column
    world_id = db.Column(db.Integer, db.ForeignKey('worlds.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # Add relationship
    user = db.relationship('User', back_populates = 'avatars')
    world = db.relationship('World', back_populates = 'avatars')

    # Add relationship outgoing
    posts = db.relationship('Post', back_populates = 'avatar', cascade= 'all, delete-orphan')

    
    
    def __repr__(self):
        return f'<Avatar {self.id}: {self.name}>'
    