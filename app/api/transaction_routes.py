from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Method, Transaction, db, User, likes
from app.models import Comment
from ..forms.transaction_form import TransactionForm
from ..forms.comment_form import CommentForm
from ..forms.like_form import LikeForm
import datetime

transaction_routes = Blueprint('transactions', __name__)
# get all transactions for homepage

@transaction_routes.route('/<int:id>/likes')
def all_likes(id):
    all_likes = db.session.execute(db.select(likes)).fetchall()

    filtered = filter(lambda like: like[1] == id, all_likes)

    # turns filtered data to a dict
    dict_version = dict(filtered)

    #gets the values from that dict, view object only tho
    valuesI = dict_version.values()

    # turns the view object to a list then sums the length(which is total amount of likes)
    total_likes = (list(valuesI))
    return {'likes': total_likes}, 200


@transaction_routes.route('/<int:id>/likes', methods=['POST'])
def post_like(id):
    form = LikeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        user_id = form.users.data
        transaction_id = form.transactions.data

        selected_transactions = Transaction.query.get(transaction_id)
        selected_user = User.query.get(user_id)

        if selected_user in selected_transactions.song_likes:
            selected_transactions.song_likes.remove(selected_user)
            db.session.commit()
            return all_likes(id)
        else:
            selected_transactions.song_likes.append(selected_user)
            db.session.commit()
            return all_likes(id)




# @transaction_routes.route('/<int:id>/likes', methods=['POST'])
# def post_like(id):
#     form = LikeForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():

#         user_id = form.users.data
#         transaction_id = form.transactions.data

#         selected_transactions = Transaction.query.get(transaction_id)
#         selected_user = User.query.get(user_id)

#         if selected_user in selected_transactions.song_likes:
#             selected_transactions.song_likes.remove(selected_user)
#             db.session.commit()
#             return {"message": 'successfully liked'}
#         else:
#             selected_transactions.song_likes.append(selected_user)
#             db.session.commit()
#             return {"message": 'successfully liked'}





# Delete comment by Comment ID
@transaction_routes.route('/comments/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):

    comment = Comment.query.get(comment_id)

    db.session.delete(comment)
    db.session.commit()

    return {"message": 'successfully deleted'}

#All comments for a specfic transaction by ID
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
