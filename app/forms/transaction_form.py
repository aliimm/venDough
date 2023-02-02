from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class TransactionForm(FlaskForm):
  recipient_id = IntegerField('recipient',validators=[DataRequired()] )
  amount = IntegerField('Amount', validators=[DataRequired()])
  payment_method = IntegerField('payment_method', validators=[DataRequired()])
  message = StringField('message', validators=[DataRequired()])
