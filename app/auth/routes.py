from flask import Blueprint, render_template, request, session, url_for

from app.strings_de import STRINGS as DE
# Facilitate language toggle EN/GER
from app.strings_en import STRINGS as EN

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register")
def register():
    lang = request.cookies.get("lang", "en")
    strings = DE if lang == "de" else EN
    return render_template("auth/register.html", strings=strings["register"], lang=lang)