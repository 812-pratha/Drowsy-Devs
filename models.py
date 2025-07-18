from extensions import db

class AnonymousReport(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(100), nullable=False)
    issue_type = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    name = db.Column(db.String(100)) 
    branch = db.Column(db.String(100)) 