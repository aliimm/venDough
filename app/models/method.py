from .db import db, environment, SCHEMA, add_prefix_for_prod

class Method(db.Model):
    __tablename__ = 'methods'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    card_number = db.Column(db.String, nullable=False)
    expiration = db.Column(db.DateTime, nullable=False)
    cvv = db.Column(db.String, nullable=False)

    @property
    def formatted_month_and_year(self):
        return self.month_and_year.strftime("%m/%Y")

    user = db.relationship('User', back_populates='method')

    # transaction = db.relationship('Transaction', back_populates='method')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'card_number': self.card_number,
            'expiration': self.expiration,
            'cvv': self.cvv,
        }
