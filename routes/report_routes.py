from flask import Blueprint, request, jsonify
from models import AnonymousReport
from extensions import db

report_bp = Blueprint("report_bp", __name__)

@report_bp.route("/report", methods=["POST"])
def report():
    data = request.get_json()
    print("Received report:", data)

    # Just dummy test handler for now
    return jsonify({"message": "Report received"}), 201


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
