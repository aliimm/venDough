from .db import db, environment, SCHEMA, add_prefix_for_prod


class Transaction(db.Model):
  __tablename__ = 'transactions'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}



id = db.Column(db.Integer, primary_key=True)
sender = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
recipient = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
payment_method =  db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('methods.id')), nullable=False)
amount = db.Column(db.Integer, nullable=False)



def to_dict(self):
    return {
        'id': self.id,
        'sender': self.sender,
        'recipient': self.recipient,
        'payment_method': self.payment_method,
        'amount': self.amount,
    }
