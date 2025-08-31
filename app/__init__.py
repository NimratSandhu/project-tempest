from flask import Flask
from app.config import Config
from mongoengine import connect
from .routes.main import main_bp
from .routes.api import api_bp

def create_app(config_name='default'):
    app = Flask(__name__)
    app.config.from_object(Config)
    connect(**app.config["MONGODB_SETTINGS"])

    # Register blueprints
    app.register_blueprint(main_bp)
    app.register_blueprint(api_bp)

    return app