from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Method, Transaction, db, User


transaction_routes = Blueprint('transactions', __name__)
# get all transactions for homepage
@transaction_routes.route('/')
def all_transactions():
    transaction = Transaction.query.all()


    return {'transaction' :[transaction.to_dict() for transaction in transaction]} , 200
