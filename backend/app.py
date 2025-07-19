from flask import Flask, request, jsonify, render_template, Response
from extensions import db
from routes.report_routes import report_bp
from routes.admin_routes import admin_bp
from flask_cors import CORS
from models import AnonymousReport, FacilityAudit, IndividualIssue
from folium.plugins import HeatMap
from collections import defaultdict
import folium
import os
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy

load_dotenv() 

# ✅ Initialize Flask first
app = Flask(__name__)

# ✅ Now configure it
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.secret_key = os.environ.get('SECRET_KEY', 'devfallback')

# ✅ Initialize extensions after configuration
db = SQLAlchemy(app)
CORS(app)

# ✅ Register blueprints
app.register_blueprint(report_bp)
app.register_blueprint(admin_bp)

@app.route('/map')
def show_map():
    reports = AnonymousReport.query.all()
    building_coords = {
        "A": [19.0330, 73.0297],
        "B": [19.0336, 73.0222],
    }

    heat_data, a_data, b_data = [], [], []

    for report in reports:
        building_name = report.location.split(',')[0].strip()
        latlon = building_coords.get(building_name)
        if latlon:
            heat_data.append(latlon)
            (a_data if building_name == "A" else b_data).append(report)

    fmap = folium.Map(location=[19.0333, 73.0260], zoom_start=14)
    HeatMap(heat_data).add_to(fmap)

    def create_summary_by_floor(reports, building_name):
        floor_map = defaultdict(list)
        ordinal_map = {
            "one": "1st", "two": "2nd", "three": "3rd",
            "four": "4th", "five": "5th", "six": "6th"
        }

        for report in reports:
            parts = report.location.split(',')
            if len(parts) < 2:
                continue
            floor_key = parts[1].strip().lower()
            floor_label = ordinal_map.get(floor_key, floor_key.title() + " Floor")
            floor_map[floor_label].append((report.issue_type, report.description))

        html = f"<div style='font-family: Arial; font-size: 13px; padding: 8px;'><strong style='font-size: 15px; color: #6b21a8;'>{building_name}</strong><br><br>"
        for floor, issues in floor_map.items():
            html += f"<strong>{floor} Floor</strong>: {len(issues)} issue(s)<br>"
        html += "</div>"
        return folium.Popup(html, max_width=300)

    if a_data:
        folium.Marker(
            location=building_coords["A"],
            popup=create_summary_by_floor(a_data, "A Building"),
            icon=folium.CustomIcon(
                'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                icon_size=(30, 30),
                icon_anchor=(15, 40)
            )
        ).add_to(fmap)

    if b_data:
        folium.Marker(
            location=building_coords["B"],
            popup=create_summary_by_floor(b_data, "B Building"),
            icon=folium.CustomIcon(
                'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                icon_size=(30, 30),
                icon_anchor=(15, 40)
            )
        ).add_to(fmap)

    return fmap._repr_html_()


@app.route('/api/audit_data', methods=['GET'])
def get_audit_data():
    reports = AnonymousReport.query.all()

    issue_categories = {
        "Dustbin": ["NoDustbinAvailable", "LidBrokenDamaged", "Overflowing", "Other", "noissue"],
        "Restroom": ["UncleanToilet", "NoWaterSupply", "NeedsImmediateCleaning", "Locked", "Damaged", "Other", "noissue", "BadOdor"],
        "Dispenser": ["NoDispenserAvailable", "NoPads", "MachineOutofPower", "PaymentNotWorking", "Damaged", "Other", "noissue"],
    }

    output = {
        category: {
            "Resolved": defaultdict(int),
            "Unresolved": defaultdict(int)
        } for category in issue_categories
    }

    for report in reports:
        # Normalize the status string to title case for consistent keys
        status = (report.status or "Unresolved").title()
        if status not in ["Resolved", "Unresolved"]:
            status = "Unresolved"

        issues = report.issue_type.split(',') if report.issue_type else []

        for issue in issues:
            issue = issue.strip()
            for category, keywords in issue_categories.items():
                if issue in keywords:
                    output[category][status][issue] += 1

    # Convert defaultdicts to dicts for JSON
    final_output = {
        category: {
            "Resolved": dict(data["Resolved"]),
            "Unresolved": dict(data["Unresolved"])
        } for category, data in output.items()
    }

    return jsonify(final_output)

@app.route('/api/issues')
def get_issues():
    data = {"Dustbin": [], "Restroom": [], "Dispenser": []}
    issue_map = {
        "Dustbin": ["Overflowing", "NoDustbinAvailable", "LidBrokenDamaged", "Other", "noissue"],
        "Restroom": ["UncleanToilet", "NoWaterSupply", "NeedsImmediateCleaning", "Locked", "Damaged", "Other", "noissue"],
        "Dispenser": ["NoDispenserAvailable", "NoPads", "MachineOutofPower", "PaymentNotWorking", "Damaged", "Other", "noissue"]
    }

    for issue in IndividualIssue.query.all():
        for category, types in issue_map.items():
            if issue.issue_type in types:
                data[category].append({
                    "id": issue.id,
                    "description": issue.issue_type,
                    "status": issue.status
                })
                break
    return jsonify(data)


@app.route('/api/update_issue', methods=['POST'])
def update_issue():
    data = request.json
    issue_id = data.get("id")
    new_status = data.get("status")

    issue = IndividualIssue.query.get(issue_id)
    if issue:
        issue.status = new_status
        db.session.commit()
        return jsonify({"success": True})
    return jsonify({"success": False, "error": "Issue not found"}), 404


@app.route('/get_unresolved_tasks')
def get_unresolved_tasks():
    unresolved_reports = AnonymousReport.query.filter_by(status='unresolved').all()
    result = [
        {
            "id": report.id,
            "issue_type": report.issue_type,
            "description": report.description,
            "location": report.location,
            "timestamp": report.timestamp,
        }
        for report in unresolved_reports
    ]
    return jsonify(result)


@app.route('/update_task_status', methods=['POST'])
def update_task_status():
    data = request.json
    report_id = data.get("id")
    new_status = data.get("status")

    report = AnonymousReport.query.get(report_id)
    if report:
        report.status = new_status
        db.session.commit()
        return jsonify({"success": True})
    return jsonify({"success": False, "error": "Not found"}), 404

@app.route('/api/floor_data')
def get_floor_data():
    reports = AnonymousReport.query.all()
    building_data = {
        "A": defaultdict(int),
        "B": defaultdict(int),
    }

    ordinal_map = {

        "one": "1st Floor",
        "two": "2nd Floor",
        "three": "3rd Floor",
        "four": "4th Floor",
        "five": "5th Floor",
        "six": "6th Floor"
    }

    for report in reports:
        parts = report.location.lower().split(",")
        if len(parts) < 2:
            continue
        building = parts[0].strip().upper()
        floor_key = parts[1].strip()
        floor_label = ordinal_map.get(floor_key, floor_key.title())

        if building in building_data:
            building_data[building][floor_label] += 1

    return jsonify({
        "A": dict(building_data["A"]),
        "B": dict(building_data["B"]),
    })



@app.route('/api/location_issues')
def get_location_issues():
    reports = AnonymousReport.query.all()
    issues = IndividualIssue.query.all()

    # Map report_id to location
    report_id_to_location = {report.id: report.location for report in reports}

    # Aggregate data
    from collections import defaultdict
    location_totals = defaultdict(lambda: {"Resolved": 0, "Unresolved": 0})

    for issue in issues:
        location = report_id_to_location.get(issue.report_id)
        if not location:
            continue
        status = issue.status.title() if issue.status else "Unresolved"
        if status not in ["Resolved", "Unresolved"]:
            status = "Unresolved"
        location_totals[location][status] += 1

    # Prepare chart data
    labels = sorted(location_totals.keys())
    resolved = [location_totals[loc]["Resolved"] for loc in labels]
    unresolved = [location_totals[loc]["Unresolved"] for loc in labels]

    chart_data = {
        "labels": labels,
        "datasets": [
            {
                "label": "Resolved",
                "data": resolved,
                "backgroundColor": "rgba(75, 192, 192, 0.6)",
            },
            {
                "label": "Unresolved",
                "data": unresolved,
                "backgroundColor": "rgba(255, 99, 132, 0.6)",
            },
        ],
    }

    return jsonify(chart_data)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
