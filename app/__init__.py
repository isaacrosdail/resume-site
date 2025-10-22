from flask import Flask, send_from_directory

from app.routes import main_bp


def create_app():

    app = Flask(__name__, static_folder="static")

    # Bypass static for /img/
    @app.route("/<path:filename>")
    def serve_image(filename):
        return send_from_directory('static/img', filename)

    app.register_blueprint(main_bp)

    return app