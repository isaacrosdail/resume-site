from flask import Blueprint, render_template, request


# Facilitate language toggle EN/GER
from app.strings_en import STRINGS as EN
from app.strings_de import STRINGS as DE

main = Blueprint("main", __name__)

# Main homepage route
@main.route("/")
def home():
    lang = request.args.get("lang", "en")
    strings = DE if lang == "de" else EN
    return render_template("index.html", strings=strings["index"])

# Contact page
@main.route("/contact")
def contact():
    return "<p>Hello! Welcome to the Contact page!</p>"