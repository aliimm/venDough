from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Method, Transaction, db, User
from ..forms.payment_method_form import PaymentForm





payment_method_routes = Blueprint('payments', __name__)

 ## Get all payment methods for specifc user
@payment_method_routes.route('/<int:id>')
# @login_required
def all_payment_methods(id):
    payment = Method.query.filter(Method.user_id == id)


    return {'methods' :[payment.to_dict() for payment in payment]} , 200

## Create payment method for user
@payment_method_routes.route('/<int:id>/create', methods = ['POST'])
# @login_required
def create_payment(id):

    form = PaymentForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        new_method = Method()
        form.populate_obj(new_method)

        db.session.add(new_method)
        db.session.commit()

        return new_method.to_dict(), 200


    if form.errors:
        return {
            "errors": form.errors
        }, 400

# @song_routes.route('/<int:id>/comments')
# def all_comments(id):
#     comments = Comment.query.filter(Comment.song_id == id)

#     return {'comments' :[comment.to_dict() for comment in comments]} , 200
