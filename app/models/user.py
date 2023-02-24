from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    profile_photo = db.Column(db.String(1000))
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)


    comments = db.relationship("Comment", cascade='all, delete-orphan', back_populates='user')

    method = db.relationship("Method", cascade='all, delete-orphan', back_populates = 'user')

    # transaction_sender = db.relationship("Transaction", cascade='all, delete-orphan', back_populates = 'user_sender')

    # transaction_recipient = db.relationship("Transaction", cascade='all, delete-orphan', back_populates = 'user_recipient')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'profile_photo': self.profile_photo,
            'email': self.email
        }
