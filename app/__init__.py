from flask import Flask, send_from_directory

from app.routes import main_bp


def create_app():

    app = Flask(__name__, static_folder="static")
    app.secret_key = "secret-key"

    # Bypass static for /img/
    @app.route("/<path:filename>")
    def serve_image(filename):
        return send_from_directory('static_src/img', filename)

    app.register_blueprint(main_bp)

    return app