from extensions import db
from datetime import datetime, timedelta

class AnonymousReport(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(100), nullable=False)
    issue_type = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    name = db.Column(db.String(100)) 
    branch = db.Column(db.String(100)) 

class FacilityAudit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)  
    branch = db.Column(db.String(100), nullable=False)  
    location = db.Column(db.String(200), nullable=False)
    
    dispenser_status = db.Column(db.Text, nullable=False)  
    dustbin_status = db.Column(db.Text, nullable=False)    
    washroom_status = db.Column(db.Text, nullable=False)   
    
    audit_date = db.Column(db.DateTime, default=datetime.now)
    remarks = db.Column(db.Text)