from flask import Flask
from routes.report_routes import report_bp
from routes.admin_routes import admin_bp

app = Flask(__name__)

app.register_blueprint(report_bp, url_prefix="/api/report")
app.register_blueprint(admin_bp, url_prefix="/api/admin")

if __name__=="__main__":
    app.run(debug=True)
