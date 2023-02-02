from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Method, Transaction, db, User
from ..forms.transaction_form import TransactionForm
import datetime

transaction_routes = Blueprint('transactions', __name__)
# get all transactions for homepage

@transaction_routes.route('/')
def all_transactions():
    transaction = Transaction.query.all()
    return {'transactions' :[transaction.to_dict() for transaction in transaction]} , 200


@transaction_routes.route('/<int:id>', methods = ['POST'])
# @login_required
def create_transaction(id):

    form = TransactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    print('made it here', form)
    if form.validate_on_submit():

        new_transaction = Transaction(sender_id = id)
        # new_method = Method()

        form.populate_obj(new_transaction)
        # print('!!!!!', new_transaction.data)
        # print("@@##", form.data)

        db.session.add(new_transaction)
        db.session.commit()

        return new_transaction.to_dict(), 200

    if form.errors:
        print(form.errors)
        return {
            "errors": form.errors
        }, 400

@transaction_routes.route('/<int:id>', methods=['DELETE'])
def delete_transaction(id):

    specificTransaction = Transaction.query.get(id)

    if not specificTransaction:
        return {"errors": "Payment Method not found"}, 404

    # print('!!!@@@#####', specificTransaction)

    db.session.delete(specificTransaction)
    db.session.commit()

    return {"message": 'successfully deleted'}
