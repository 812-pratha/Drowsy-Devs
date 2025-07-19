# reset_db.py
from app import app
from extensions import db

with app.app_context():
    db.drop_all()      # ⛔ Destroys old tables and data
    db.create_all()    # ✅ Creates fresh tables
    print("Database reset successfully.")
