from flask import Blueprint, render_template, url_for, request, session

auth = Blueprint("auth", __name__)

@auth.route("/register")
def register():
    return render_template("auth/register.html")