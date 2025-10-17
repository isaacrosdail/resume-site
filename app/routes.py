from flask import Blueprint, render_template, request

from app.strings_de import STRINGS as DE
from app.strings_en import STRINGS as EN

main_bp = Blueprint("main", __name__, template_folder="templates")


@main_bp.get("/")
def home():
    lang = request.cookies.get("lang", "en")
    strings = DE if lang == "de" else EN
    return render_template("index.html", strings=strings["index"], lang=lang)
