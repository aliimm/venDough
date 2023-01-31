from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField, BooleanField, DateTimeField
from wtforms.validators import DataRequired


class TransactionForm(FlaskForm):
  amount = IntegerField('Amount', validators=[DataRequired()])
  payment_method = IntegerField('payment_method', validators=[DataRequired()])
  message = StringField('message', validators=[DataRequired()])
  pending = BooleanField('boolean', validators=[DataRequired( )])
  created_at = DateTimeField('created at',  validators=[DataRequired()])
