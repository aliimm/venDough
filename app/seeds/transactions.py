from app.models import db, Transaction, environment, SCHEMA

def seed_transactions():
    transaction1 = Transaction(
        sender_id = 1, recipient_id = 2, payment_method = 1, amount = 500, message = 'trans 1'
    )
    transaction2 = Transaction(
        sender_id = 2, recipient_id = 1, payment_method = 2, amount = 900, message = 'trans 2'
    )
    transaction3 = Transaction(
        sender_id = 3, recipient_id = 1, payment_method = 3, amount = 1000, message = 'trans 3'
    )

    db.session.add(transaction1)
    db.session.add(transaction2)
    db.session.add(transaction3)
    db.session.commit()


def undo_transactions():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
  else:
    db.session.execute("DELETE FROM transactions")

  db.session.commit()
