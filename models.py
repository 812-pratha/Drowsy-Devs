from extensions import db
from datetime import datetime, timedelta

class AnonymousReport(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    issue_type = db.Column(db.String(255))
    description = db.Column(db.String(255))
    location = db.Column(db.String(255))
    timestamp = db.Column(db.DateTime)
    status = db.Column(db.String(50), default='Unresolved')

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

class IndividualIssue(db.Model):
    __tablename__ = 'individual_issues'

    id = db.Column(db.Integer, primary_key=True)
    report_id = db.Column(db.Integer, db.ForeignKey('anonymous_report.id'))
    issue_type = db.Column(db.String(100))
    description = db.Column(db.Text)
    status = db.Column(db.String(20), default='Unresolved')
