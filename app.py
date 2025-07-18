from flask import Flask
from routes.report_routes import report_bp
from routes.admin_routes import admin_bp  # Only if you added admin

app = Flask(__name__)
app.register_blueprint(report_bp)
app.register_blueprint(admin_bp)  # Optional if you're testing /admin

if __name__ == "__main__":
    app.run(debug=True)


from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_pyfile('config.py')
db = SQLAlchemy(app)


