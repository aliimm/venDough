from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Method, Transaction, db, User
from app.models import Comment
from ..forms.transaction_form import TransactionForm
from ..forms.comment_form import CommentForm
import datetime

transaction_routes = Blueprint('transactions', __name__)
# get all transactions for homepage

# comments

@transaction_routes.route('/comments/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):

    print('comment_id', comment_id)
    comment = Comment.query.get(comment_id)
    print('comment------------', comment)

    db.session.delete(comment)
    db.session.commit()

    return {"message": 'successfully deleted'}

@transaction_routes.route('/<int:id>/comments')
def all_comments(id):
    comments = Comment.query.filter(Comment.transaction_id == id)

    return {'comments' :[comment.to_dict() for comment in comments]} , 200

#post comment
@transaction_routes.route('/<int:id>/comments/new', methods=['POST'])
@login_required
def post_comment(id):

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_comment = Comment()
        form.populate_obj(new_comment)

        db.session.add(new_comment)
        db.session.commit()

        return new_comment.to_dict(), 200


    if form.errors:
        return {
            "errors": form.errors
        }, 400


@transaction_routes.route('/<int:id>')
# @login_required
def one_transactions(id):
    specificTransaction = Transaction.query.get(id)

    if not specificTransaction:
        return {"errors": "Transaction does not exist"}, 404

    return {'Transaction': specificTransaction.to_dict()} , 200




@transaction_routes.route('/')
# @login_required
def all_transactions():
    transaction = Transaction.query.all()
    return {'transactions' :[transaction.to_dict() for transaction in transaction]} , 200


@transaction_routes.route('/<int:id>', methods = ['POST'])
@login_required
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
@login_required

def delete_transaction(id):

    specificTransaction = Transaction.query.get(id)

    if not specificTransaction:
        return {"errors": "Payment Method not found"}, 404

    # print('!!!@@@#####', specificTransaction)

    db.session.delete(specificTransaction)
    db.session.commit()

    return {"message": 'successfully deleted'}
