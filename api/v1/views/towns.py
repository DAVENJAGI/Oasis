#!/usr/bin/python3
"""import location_views and creates a route"""

from flask import jsonify, Blueprint, abort, request
from api.v1.views import location_views
from models import storage
from models.base_model import BaseModel
from models.amenity import Amenity
from models.town import Town
from models.city import City
from models.state import State
from models.country import Country
from models.listing import Listing 
from models.review import Review
# from models.state import State
from models.user import User
import json
from auth.authorization import require_admin_auth


@location_views.route("/towns", strict_slashes=False, methods=["GET"])
def return_towns():
    """returns all state objects"""
    all_towns = storage.all(Town).values()
    towns_list = []
    for town in all_towns:
        towns_list.append(town.to_dict())
    return jsonify(towns_list)


@location_views.route("/states/<state_id>/towns", methods=['GET'], strict_slashes=False)
def return_by_town_id(state_id):
    """returns town based on state_id"""
    if request.method == "GET":
        state = storage.get(State, state_id)
        if not state:
            abort(404, description="State not found")

        towns_data = [town.to_dict() for town in state.towns]
        return jsonify(towns_data)


@location_views.route("/towns/<town_id>", strict_slashes=False,
                  methods=["GET", "DELETE"])
def return_town(town_id):
    """Returns state based on town_id"""
    if request.method == "GET":
        all_towns = storage.get(Town, town_id)
        if not all_towns:
            abort(404)
        city = storage.get(City, all_towns.city_id)
        if not city:
            abort (404)
        state = storage.get(State, city.state_id)
        if not state:
            abort (404)
        country = storage.get(Country, state.country_id)
        if not country:
            abort (404)
        town_dict = all_towns.to_dict()
        town_dict["city"] = city.constituency_name
        town_dict["state"] = state.name
        town_dict["country"] = country.name

        return jsonify(town_dict)

    elif request.method == "DELETE":
        town = storage.get(Town, town_id)
        if town is None:
            abort(404)

        storage.delete(town)
        storage.save()
        return jsonify({}), 200


@location_views.route("/states/<state_id>/towns/", strict_slashes=False,
                  methods=["POST"])
@require_admin_auth
def post_town(state_id):
    """posts a new state"""
    if request.method == "POST":
        if not request.get_json():
            abort(400, description="Not a JSON")
        if 'name' not in request.get_json():
            abort(400, description="Missing name")

        state = storage.get(State, state_id)
        if not state:
            abort(404)

        town_data = request.get_json()
        new_town = Town(**town_data, state_id=state_id)
        new_town.save()
        return jsonify(new_town.to_dict()), 201


@location_views.route("/towns/<town_id>", methods=["PUT"])
@require_admin_auth
def update_town(town_id):
    """updates data on a town"""
    if request.method == "PUT":
        all_towns = storage.get(Town, town_id)
        if not all_towns:
            abort(404)
        if not request.get_json():
            abort(400, description="Not a JSON")
        data = request.get_json()
        for key, value in data.items():
            if key not in ["id", "created_at", "updated_at"]:
                setattr(all_towns, key, value)
        storage.save()
        return jsonify(all_towns.to_dict()), 200


