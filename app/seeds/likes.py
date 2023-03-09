from app.models import db, likes, environment, SCHEMA


def seed_likes():
    like_1 = likes.insert().values(users=1, transactions=2)
    like_2 = likes.insert().values(users=2, transactions=3)
    like_3 = likes.insert().values(users=3, transactions=1)
    like_4 = likes.insert().values(users=1, transactions=1)

    db.session.execute(like_1)
    db.session.execute(like_2)
    db.session.execute(like_3)
    db.session.execute(like_4)
    db.session.commit()


def undo_likes():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
  else:
    db.session.execute("DELETE FROM likes")

  db.session.commit()
