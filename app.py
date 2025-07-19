from flask import Flask, request, jsonify, render_template, Response
from extensions import db
from routes.report_routes import report_bp
from routes.admin_routes import admin_bp
from flask_cors import CORS
from models import AnonymousReport, FacilityAudit
from folium.plugins import HeatMap
from collections import defaultdict
import folium

app = Flask(__name__)

app.register_blueprint(report_bp)
app.register_blueprint(admin_bp)
CORS(app)
app.config.from_pyfile('config.py')
db.init_app(app)

@app.route('/map')
def show_map():
    reports = AnonymousReport.query.all()

    building_coords = {
        "A": [19.0330, 73.0297],
        "B": [19.0336, 73.0222],
    }

    heat_data = []
    a_data = []
    b_data = []

    for report in reports:
        building_name = report.location.split(',')[0].strip()
        latlon = building_coords.get(building_name)
        if latlon:
            heat_data.append(latlon)
            if building_name == "A":
                a_data.append(report)
            elif building_name == "B":
                b_data.append(report)

    fmap = folium.Map(location=[19.0333, 73.0260], zoom_start=14)
    HeatMap(heat_data).add_to(fmap)

    def create_summary_by_floor(reports, building_name):
        floor_map = defaultdict(list)
        ordinal_map = {
            "one": "1st",
            "two": "2nd",
            "three": "3rd",
            "four": "4th",
            "five": "5th",
            "six": "6th"
}
        for report in reports:
            parts = report.location.split(',')
            if len(parts) < 2:
                continue
            floor_key = parts[1].strip().lower()  # e.g. "one"
            floor_label = ordinal_map.get(floor_key, floor_key.title() + " Floor")
            floor_map[floor_label].append((report.issue_type, report.description))

        html=f"""
        <div style='font-family: Arial; font-size: 13px; padding: 8px;'>
            <strong style='font-size: 15px; color: #6b21a8;'>{building_name}</strong><br><br>
        """
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

@app.route('/api/audit_data')
def get_audit_data():
    reports = AnonymousReport.query.all()

    # Categorize issues
    categories = {
        "dispenser": {},
        "restroom": {},
        "dustbin": {},
    }

    def classify(issue):
        if "Pad" in issue or "Payment" in issue or "OutofPower" in issue:
            return "dispenser"
        elif "Odor" in issue or "Water" in issue or "Cleaning" in issue or "Locked" in issue:
            return "restroom"
        elif "Dustbin" in issue:
            return "dustbin"
        else:
            return None

    for report in reports:
        issue_list = [i.strip() for i in report.issue_type.split(',')]
        for issue in issue_list:
            group = classify(issue)
            if group:
                categories[group][issue] = categories[group].get(issue, 0) + 1

    return jsonify(categories)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
