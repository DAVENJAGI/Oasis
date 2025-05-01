#!/usr/bin/python3
"""creates a variable app, instance of flask, and tears down"""

from flask import Flask
from api.v1.views import app_views, state_views, city_views
from api.v1.views import amenity_views, user_views
from models import storage
import os
from flask import jsonify

app = Flask(__name__)
app.register_blueprint(app_views)
app.register_blueprint(state_views)
app.register_blueprint(city_views)
app.register_blueprint(amenity_views)
app.register_blueprint(user_views)
cors = CORS(app, resources={"/*": {"origins": "0.0.0.0"}})

@app.teardown_appcontext
def teardown(exception=None):
    """Closes a session"""
    storage.close()


@app.errorhandler(404)
def not_found(error):
    """returns a json string of error 404"""
    return jsonify({"error":  "Not found"}), 404


if __name__ == "__main__":
    host = os.getenv("HBNB_API_HOST", "0.0.0.0")
    port = int(os.getenv("HBNB_API_PORT", 5000))
    app.run(host=host, port=port, threaded=True)
