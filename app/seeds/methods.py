from app.models import db, Method, environment, SCHEMA
from datetime import date

def seed_methods():
    method1 = Method(
        user_id = 1, card_number = '1234567891234567', expiration = date(2023, 12, 12), cvv= '188'
    )

    method2 = Method(
        user_id = 2, card_number = '9876543211234567', expiration = date(2023, 12, 12), cvv= '459'
    )

    method3 = Method(
        user_id = 2, card_number = '9876543211234567', expiration = date(2023, 12, 12), cvv= '188'
    )

    db.session.add(method1)
    db.session.add(method2)
    db.session.add(method3)
    db.session.commit()


def undo_methods():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.methods RESTART IDENTITY CASCADE;")
  else:
    db.session.execute("DELETE FROM methods")

  db.session.commit()
