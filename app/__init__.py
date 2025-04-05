from flask import Flask, render_template

# Import Blueprints for routes
from .main.routes import main
from .auth.routes import auth

def create_app():
    app = Flask(__name__) # Create instance of a Flask web app
    app.secret_key = "secret-key"
    app.register_blueprint(main)
    app.register_blueprint(auth)
    return app