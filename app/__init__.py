from flask import Flask, render_template

from app.auth.routes import auth_bp
# Import Blueprints for routes
from app.core.routes import main_bp


def create_app():

    app = Flask(__name__) # Create instance of a Flask web app

    app.secret_key = "secret-key"

    # Register Route Blueprints
    app.register_blueprint(main_bp)
    app.register_blueprint(auth_bp)

    return app