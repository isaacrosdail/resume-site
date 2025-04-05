from flask import Blueprint, render_template

main = Blueprint("main", __name__)

# Main homepage route
@main.route("/")
def home():
    return render_template("index.html")

# Contact page
@main.route("/contact")
def contact():
    return "<p>Hello! Welcome to the Contact page!</p>"