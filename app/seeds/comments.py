from app.models import db, Comment, environment, SCHEMA


# Adds a comment1 user, you can add other users here if you want
def seed_comments():
    comment1 = Comment(
        transaction_id=1,  user_id= 2, comment = 'Amazing transaction')
    comment2 = Comment(
        transaction_id=2,  user_id= 3, comment = 'Just terrible')
    comment3 = Comment(
        transaction_id=3,  user_id= 1, comment = 'Pretty average')
    comment4 = Comment(
        transaction_id=3,  user_id= 2, comment = 'tranaction test lol')

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
