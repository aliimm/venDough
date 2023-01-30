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


##Get ONE SPECFIC CARD
@payment_method_routes.route('/<int:id>/specific')
def payment_details(id):

    current_paymentform = Method.query.get(id)

    if not current_paymentform:
        return {"errors": "Method not found"}, 404

    print(current_paymentform)
    return {'method': current_paymentform.to_dict()} , 200





## Create payment method for user
@payment_method_routes.route('/<int:id>', methods = ['POST'])
# @login_required
def create_payment(id):

    form = PaymentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    print('made it here', form)
    if form.validate_on_submit():
        new_method = Method(user_id = id)
        # new_method = Method()

        form.populate_obj(new_method)

        db.session.add(new_method)
        db.session.commit()

        return new_method.to_dict(), 200

    if form.errors:
        print(form.errors)
        return {
            "errors": form.errors
        }, 400

# UPDATE SPECIFIC PAYMENT METHOD BY METHODID
@payment_method_routes.route('/<int:methodId>', methods=['PUT'])
# @login_required
def update_payment(methodId):

    specificMethod = Method.query.get(methodId)
    form = PaymentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        form.populate_obj(specificMethod)
        db.session.add(specificMethod)
        db.session.commit()
        return specificMethod.to_dict(), 201



# delete payment method by Method ID
@payment_method_routes.route('/<int:methodId>', methods=['DELETE'])
def delete_pay(methodId):

    specificMethod = Method.query.get(methodId)

    if not specificMethod:
        return {"errors": "Payment Method not found"}, 404

    # print('!!!@@@#####', specificMethod)

    db.session.delete(specificMethod)
    db.session.commit()

    return {"message": 'successfully deleted'}
