from flask_wtf import FlaskForm
from wtforms import  IntegerField

class LikeForm(FlaskForm):
  users = IntegerField('Users')
  transactions= IntegerField('Songs')
