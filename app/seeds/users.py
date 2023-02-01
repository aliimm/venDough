from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name = 'demo', last_name = 'ooo', username='Demo', profile_photo= 'https://m.media-amazon.com/images/I/A194kjllWaL.jpg', email='demo@aa.io', password='password')
    marnie = User(
        first_name = 'marnie', last_name = 'eee', username='marnie', profile_photo= 'https://people.com/thmb/tBx20_9w4w_xO8sOCxBBuxmHqx0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(704x289:706x291)/jhene-aiko-3-1c529705dce74c3c84bf0bdc1d23a446.jpg', email='marnie@aa.io', password='password')
    bobbie = User(
        first_name = 'bobbie', last_name = 'yrrr', username='bobbie', profile_photo= 'https://www.the-sun.com/wp-content/uploads/sites/6/2022/02/SC-Yeat-Comp-copy-2.jpg', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
