#!/usr/bin/env python3
from models import db, User, Comment, Post, Avatar, World
from faker import Faker
from random import randint, choice as rc
from config import app

fake = Faker()

def seed_users():
    users = []
    for _ in range(10):
        user = User(
            name=fake.first_name(),
            username=fake.user_name(),
        )
        user.password_hash =fake.password()
        users.append(user)
    db.session.add_all(users)
    db.session.commit()

def seed_comments(users, posts):
    comments = []
    for _ in range(20):
        comment = Comment(
    content=fake.text(),
    
)

        comments.append(comment)
    db.session.add_all(comments)
    db.session.commit()

def seed_posts(avatars):
    posts = []
    for _ in range(15):
        post = Post(
    likes=fake.random_int(min=0, max=100),
    content=fake.text(),
    
)

        posts.append(post)
    db.session.add_all(posts)
    db.session.commit()

def seed_worlds(avatars):
    worlds = []
    for _ in range(5):
        world = World(
    subject=fake.word(),
    local_avatars=rc(avatars),
    name=fake.word(),
)
        worlds.append(world)
    db.session.add_all(worlds)
    db.session.commit()

# def seed_avatars(users, worlds):
#     avatars = []
#     for user in users:
#         # Check if there are any worlds available before choosing one
#         if worlds:
#             avatar = Avatar(
#                 avatar_info=fake.word(),
#                 user=user,
                
#             )
#             avatars.append(avatar)
#     db.session.add_all(avatars)
#     db.session.commit()
if __name__ == '__main__':
    with app.app_context():
        try:
            print("Starting seed...")

            seed_users()

            users = User.query.all()

            worlds = World.query.all()

            # seed_avatars(users, worlds)

            avatars = Avatar.query.all()

            seed_posts(avatars)

            posts = Post.query.all()

            seed_comments(users, posts)

            print("Seed completed.")

        except Exception as e:
            print(f"Error during seed: {e}")
