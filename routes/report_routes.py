from flask import Blueprint, request, jsonify
from models import AnonymousReport
from extensions import db

report_bp = Blueprint("report_bp", __name__)

@report_bp.route("/report", methods=["POST"])
def report():
    data = request.get_json()
    print("Received report:", data)
    return jsonify({"message": "Report received"}), 201

@report_bp.route('/submit-issue', methods=['POST'])
def submit_issue():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid or empty JSON"}), 400

    selected = data.get('selected')
    othervalue = data.get('otherValue')
    dispenser = data.get('dispenserOption')
    dispenserOther = data.get('dispenserOther')
    toiletOption = data.get('toiletOption')
    toiletOther = data.get('toiletOther')
    building = data.get('building')
    floor = data.get('floor')
    name = data.get('name')
    branch = data.get('branch')

    issues = [selected, dispenser, toiletOption]
    descriptions = []
    if othervalue:
        descriptions.append(f"Dustbin: {othervalue}")
    if dispenserOther:
        descriptions.append(f"Dispenser: {dispenserOther}")
    if toiletOther:
        descriptions.append(f"Toilet: {toiletOther}")

    new_report = AnonymousReport(
        location=f"{building}, {floor}",
        issue_type=", ".join(filter(None, issues)),
        description=" | ".join(descriptions),
        name=name,
        branch=branch
    )

    db.session.add(new_report)
    db.session.commit()

    return jsonify({"message": "Issue and location saved successfully!"}), 201
@report_bp.route("/ping", methods=["GET"])
def ping():
    return jsonify({"message": "Backend is working"}), 200

@report_bp.route('/get_reports', methods=['GET'])
def get_reports():
    reports = AnonymousReport.query.all()
    return jsonify([
        {
            'id': report.id,
            'location': report.location,
            'issue_type': report.issue_type,
            'description': report.description
        }
        for report in reports
    ]), 200
