from flask import Blueprint, render_template, request


# Facilitate language toggle EN/GER
from app.strings_en import STRINGS as EN
from app.strings_de import STRINGS as DE

main_bp = Blueprint("main", __name__, template_folder="templates")

# Main homepage route
@main_bp.route("/", methods=["GET"])
def home():
    lang = request.cookies.get("lang", "en")
    strings = DE if lang == "de" else EN
    return render_template("index.html", strings=strings["index"], lang=lang)

# Contact page
@main_bp.route("/contact")
def contact():
    return "<p>Hello! Welcome to the Contact page!</p>"