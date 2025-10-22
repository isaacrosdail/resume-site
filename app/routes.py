import os

from flask import Blueprint, render_template, request, current_app
from flask import send_from_directory

main_bp = Blueprint("main", __name__, template_folder="templates")


@main_bp.get("/")
def home():
    return render_template("index.html")

@main_bp.route("/resume/download")
def download_resume():
    resume_dir = os.path.join(current_app.root_path, 'static', 'resume')
    filename = 'Isaac-Rosdail-Resume.pdf'
    return send_from_directory(resume_dir, filename, as_attachment=True)