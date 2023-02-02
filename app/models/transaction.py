from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
# import datetime

class Transaction(db.Model):
    __tablename__ = 'transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}





    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable = False)
    recipient_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable = False)
    payment_method =  db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('methods.id')), nullable = False)
    amount = db.Column(db.Integer, nullable = False)
    message = db.Column(db.String(500), nullable = False)
    pending = db.Column(db.Boolean, server_default = "True", nullable = False)
    created_at = db.Column(db.DateTime, server_default = func.now())


    sender = db.relationship('User', backref='user_transactions', foreign_keys=sender_id)
    recipient = db.relationship("User", backref='recipient_transactions', foreign_keys=[recipient_id])



    method = db.relationship('Method', back_populates = 'transaction')




    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'recipient_id': self.recipient_id,
            'payment_method': self.payment_method,
            'amount': self.amount,
            'message': self.message,
            'pending': self.pending,
            'created_at': self.created_at

        }
