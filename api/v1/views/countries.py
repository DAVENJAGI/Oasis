#!/usr/bin/python3
"""imports app_views and creates a route /status"""

from flask import jsonify, Blueprint, abort, request
from api.v1.views import location_views
from models import storage
from models.base_model import BaseModel
from models.amenity import Amenity
from models.city import City
from models.listing import Listing 
from models.review import Review
from models.country import Country
from models.user import User
import json

# location_views = Blueprint("countries", __name__)


@location_views.route("/countries", strict_slashes=False, methods=["GET"])
def return_countries():
    """returns all country objects"""
    all_countries = storage.all(Country).values()
    countries_list = []
    for country in all_countries:
        countries_list.append(country.to_dict())
    return jsonify(countries_list)


@location_views.route("/countries/<country_id>", strict_slashes=False)
def return_country(country_id):
    """Returns country based on country_id"""
    if request.method == "GET":
        all_countries = storage.get(Country, country_id)
        if not all_countries:
            abort(404)
        return jsonify(all_countries.to_dict())


@location_views.route("/countries/<country_id>", methods=["DELETE"])
def delete_country(country_id):
    """deletes country"""
    if request.method == "DELETE":
        country = storage.get(Country, country_id)
        if country is None:
            abort(404)
        storage.delete(country)
        storage.save()
        return jsonify({}), 200


@location_views.route("/countries/", strict_slashes=False, methods=["POST"])
def post_country():
    """posts a new country"""
    if request.method == "POST":
        if not request.get_json():
            abort(400, description="Not a JSON")
        if 'name' not in request.get_json():
            return make_response(jsonify({"error": "Missing country name in data"}), 400)
        if 'country_code' not in request.get_json():
            return make_response(jsonify({"error": "Missing country county code in data"}), 400)

    country_data = request.get_json()
    instance = Country(**country_data)
    instance.save()
    return jsonify(instance.to_dict()), 201


@location_views.route("/countries/<country_id>", methods=["PUT"])
def update_country(country_id):
    """updates data on a country"""
    if request.method == "PUT":
        all_countries = storage.get(Country, country_id)
        if not all_countries:
            abort(404)
        if not request.get_json():
            abort(400, description="Not a JSON")
        data = request.get_json()
        for key, value in data.items():
            if key not in ["id", "created_at", "updated_at"]:
                setattr(all_countries, key, value)
        storage.save()
        return jsonify(all_countries.to_dict()), 200
