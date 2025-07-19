from app import app, db
from models import AnonymousReport, IndividualIssue

with app.app_context():
    reports = AnonymousReport.query.all()

    for report in reports:
        existing = IndividualIssue.query.filter_by(report_id=report.id).first()
        if existing:
            continue

        if report.issue_type:
            issues = [i.strip() for i in report.issue_type.split(',')]

            for issue in issues:
                new_issue = IndividualIssue(
                    report_id=report.id,
                    issue_type=issue,
                    description=report.description or '',
                    status="Unresolved"
                )
                db.session.add(new_issue)

    db.session.commit()
    print("Done migrating individual issues.")
