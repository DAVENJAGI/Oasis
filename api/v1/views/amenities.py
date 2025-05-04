#!/usr/bin/python3
"""import city_views and creates a route"""

from flask import jsonify, Blueprint, abort, request
from api.v1.views import amenity_views
from models import storage
from models.base_model import BaseModel
from models.amenity import Amenity
from models.city import City
from models.listing import Listing
from models.review import Review
from models.state import State
from models.user import User
import json


@amenity_views.route("/amenities", strict_slashes=False, methods=["GET"])
def return_amenities():
    """returns all state objects"""
    all_amenities = storage.all(Amenity).values()
    amenities_list = []
    for amenity in all_amenities:
        amenities_list.append(amenity.to_dict())
    return jsonify(amenities_list)


@amenity_views.route("/amenities/<amenity_id>", strict_slashes=False,
                     methods=["GET", "DELETE"])
def return_amenity_by_id(amenity_id):
    """Returns state based on city_id"""
    if request.method == "GET":
        all_amenities = storage.get(Amenity, amenity_id)
        if not all_amenities:
            abort(404)
        return jsonify(all_amenities.to_dict())

    elif request.method == "DELETE":
        amenity = storage.get(Amenity, amenity_id)
        if amenity is None:
            abort(404)

        storage.delete(amenity)
        storage.save()
        return jsonify({}), 200


@amenity_views.route("/amenities", strict_slashes=False,
                     methods=["POST"])
def post_amenity():
    """posts a new state"""
    if request.method == "POST":
        if not request.get_json():
            abort(400, description="Not a JSON")
        if 'name' not in request.get_json():
            abort(400, description="Missing name")

        amenity_data = request.get_json()
        new_amenity = Amenity(**amenity_data)
        new_amenity.save()
        return jsonify(new_amenity.to_dict()), 201


@amenity_views.route("/amenities/<amenity_id>", methods=["PUT"])
def update_city(amenity_id):
    """updates data on a city"""
    if request.method == "PUT":
        all_amenities = storage.get(Amenity, amenity_id)
        if not all_amenities:
            abort(404)
        if not request.get_json():
            abort(400, description="Not a JSON")
        data = request.get_json()
        for key, value in data.items():
            if key not in ["id", "created_at", "updated_at"]:
                setattr(all_amenities, key, value)
        storage.save()
        return jsonify(all_amenities.to_dict()), 200
