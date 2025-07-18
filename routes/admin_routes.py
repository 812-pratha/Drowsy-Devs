from flask import Blueprint, jsonify

admin_bp = Blueprint("admin_bp", __name__)

@admin_bp.route("/reports", methods=["GET"])
def view_reports():
    dummy_data = [
        {
            "id": 1,
            "location": "BlockA-2ndFloor",
            "issue": "Empty Dispenser",
            "description": "Needs urgent attention",
            "timestamp": "13:30:24"
        },
        {
            "id": 1,
            "location": "BlockB-1stFloor",
            "issue": "Overflowing Dustbin",
            "description": "It stinks and no place to throw garbage",
            "timestamp": "19:12:07"
        }
    ]
    return jsonify({"reports": dummy_data}), 200
