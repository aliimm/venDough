from app.models import db, Method, environment, SCHEMA
import datetime

def seed_methods():
    method1 = Method(
        user_id = 1, card_number = '1234567891234567', expiration = datetime.date(2025, 3, 28), cvv= '188'
    )

    method2 = Method(
        user_id = 2, card_number = '9876543211234567', expiration = datetime.date(2027, 5, 21), cvv= '459'
    )

    method3 = Method(
        user_id = 2, card_number = '9876543211234567', expiration = datetime.date(2024, 5, 10), cvv= '188'
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
