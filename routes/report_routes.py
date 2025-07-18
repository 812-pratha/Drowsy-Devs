from flask import Blueprint, request, jsonify

report_bp = Blueprint("report_bp", __name__)

@report_bp.route("/report", methods=["POST"])
def report():
    data = request.json
    print("Received report:", data)
    return jsonify({"message": "Report received"}), 201
