from app import db
import models
from datetime import datetime

class AnonymousReport(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(200), nullable=False)
    issue_type = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, default=datetime.now)

class FacilityAudit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(200), nullable=False)
    pads_stocked = db.Column(db.Boolean, nullable=False)
    bins_clean = db.Column(db.Boolean, nullable=False)
    access_available = db.Column(db.Boolean, nullable=False)
    audit_date = db.Column(db.DateTime, default=datetime.now)
    remarks = db.Column(db.Text)

class IssueResolution(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    issue_id = db.Column(db.Integer, db.ForeignKey('anonymous_report.id'))
    resolved = db.Column(db.Boolean, default=False)
    resolution_date = db.Column(db.DateTime)
