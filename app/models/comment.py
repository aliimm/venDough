from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    transaction_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('transactions.id'), ondelete='CASCADE'), nullable = False)
    comment = db.Column(db.String, nullable = False)


    user = db.relationship('User', back_populates='comments')
    transaction = db.relationship('Transaction', back_populates='comments')





    def to_dict(self):
        return {
            'id': self.id,
            'transaction_id': self.transaction_id,
            'user_id': self.user_id,
            'comment': self.comment,
        }
