from flask import Flask,Blueprint, request, jsonify
from routes.report_routes import report_bp
from routes.admin_routes import admin_bp
from models import AnonymousReport

app = Flask(__name__)
app.register_blueprint(report_bp)
app.register_blueprint(admin_bp)

if __name__ == "__main__":
    app.run(debug=True)


from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_pyfile('config.py')
db = SQLAlchemy(app)

@app.route('/report_issue', methods=['POST'])
def report_issue():
    data = request.form

    if not data or not all(k in data for k in ('location', 'issue_type')):
        return jsonify({'message': 'Missing required fields'}), 400

    report = AnonymousReport(
        location=data['location'],
        issue_type=data['issue_type'],
        description=data.get('description', '')
    )

    db.session.add(report)
    db.session.commit()

    return jsonify({'message': 'Report submitted successfully', 'report_id': report.id}), 201

if __name__ == '__main__':
    app.run(debug=True)

report_bp = Blueprint('report', __name__)

@report_bp.route('/get_reports', methods=['GET'])
def get_reports():
    reports = AnonymousReport.query.all()
    return jsonify([{
        'id': report.id,
        'location': report.location,
        'issue_type': report.issue_type,
        'description': report.description
    } for report in reports]), 200




