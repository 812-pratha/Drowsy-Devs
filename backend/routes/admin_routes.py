from flask import Blueprint

admin_bp = Blueprint("admin_bp", __name__)

@admin_bp.route("/admin/test", methods=["GET"])
def test_admin():
    return {"message": "Admin route working"}
