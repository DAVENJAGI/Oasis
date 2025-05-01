#!/usr/bin/python3
"""import city_views and creates a route"""

from flask import jsonify, Blueprint, abort, request
from api.v1.views import city_views
from models import storage
from models.base_model import BaseModel
from models.amenity import Amenity
from models.city import City
from models.place import Place
from models.review import Review
from models.state import State
from models.user import User
import json


@city_views.route("/cities", strict_slashes=False, methods=["GET"])
def return_cities():
    """returns all state objects"""
    all_cities = storage.all(City).values()
    cities_list = []
    for city in all_cities:
        cities_list.append(city.to_dict())
    return jsonify(cities_list)


@city_views.route("/states/<state_id>/cities", strict_slashes=False)
def return_by_city_id(state_id):
    """returns city based on state_id"""
    if request.method == "GET":
        state = storage.get(State, state_id)
        if not state:
            abort(404, description="State not found")

        cities_data = [city.to_dict() for city in state.cities]
        return jsonify(cities_data)


@city_views.route("/cities/<city_id>", strict_slashes=False,
                  methods=["GET", "DELETE"])
def return_city(city_id):
    """Returns state based on city_id"""
    if request.method == "GET":
        all_cities = storage.get(City, city_id)
        if not all_cities:
            abort(404)
        return jsonify(all_cities.to_dict())

    elif request.method == "DELETE":
        city = storage.get(City, city_id)
        if city is None:
            abort(404)

        storage.delete(city)
        storage.save()
        return jsonify({}), 200


@city_views.route("/states/<state_id>/cities/", strict_slashes=False,
                  methods=["POST"])
def post_city(state_id):
    """posts a new state"""
    if request.method == "POST":
        if not request.get_json():
            abort(400, description="Not a JSON")
        if 'name' not in request.get_json():
            abort(400, description="Missing name")

        state = storage.get(State, state_id)
        if not state:
            abort(404)

        city_data = request.get_json()
        new_city = City(**city_data, state_id=state_id)
        new_city.save()
        return jsonify(new_city.to_dict()), 201


@city_views.route("/cities/<city_id>", methods=["PUT"])
def update_city(city_id):
    """updates data on a city"""
    if request.method == "PUT":
        all_cities = storage.get(City, city_id)
        if not all_cities:
            abort(404)
        if not request.get_json():
            abort(400, description="Not a JSON")
        data = request.get_json()
        for key, value in data.items():
            if key not in ["id", "created_at", "updated_at"]:
                setattr(all_cities, key, value)
        storage.save()
        return jsonify(all_cities.to_dict()), 200
