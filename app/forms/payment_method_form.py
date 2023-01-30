from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import DataRequired


class PaymentForm(FlaskForm):
  card_number = StringField('Card Number', validators=[DataRequired()])
  expiration = DateField('Expiration',  format='%Y-%m-%d', validators=[DataRequired()])
  cvv = StringField('cvv', validators=[DataRequired()])
