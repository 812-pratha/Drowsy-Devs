from flask import Flask
from extensions import db
from routes.report_routes import report_bp
from routes.admin_routes import admin_bp

app = Flask(__name__)
app.config.from_pyfile('config.py')

# Initialize the database with app
db.init_app(app)

# Register blueprints
app.register_blueprint(report_bp)
app.register_blueprint(admin_bp)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
