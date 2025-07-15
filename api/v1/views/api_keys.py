#!/usr/bin/python3
"""import city_views and creates a route"""

from flask import jsonify, Blueprint, abort, request
from api.v1.views import api_key_views
from models import storage
from models.base_model import BaseModel
from models.api_key import apiKey
from models.city import City
from models.listing import Listing
from models.review import Review
from models.state import State
from models.user import User
import json
from auth.authorization import require_admin_auth, require_user_or_admin_auth, require_agent_or_admin_or_user_auth, require_support_agent_or_admin_or_user_auth


@api_key_views.route("/api_keys", strict_slashes=False, methods=["GET"])
@require_admin_auth
def return_api_keys():
    """returns all api_key objects"""
    all_api_keys = storage.all(apiKey).values()
    api_keys_list = []
    for api_key in all_api_keys:
        api_keys_list.append(api_key.to_dict())
    return jsonify(api_keys_list)


@api_key_views.route("/api_keys/<api_key_id>", strict_slashes=False,
                     methods=["GET", "DELETE"])
def return_api_key_by_id(api_key_id):
    """deletes a api_key"""
    if request.method == "GET":
        all_api_keys = storage.get(apiKey, api_key_id)
        if not all_api_keys:
            abort(404)
        return jsonify(all_api_keys.to_dict())

    elif request.method == "DELETE":
        api_key = storage.get(apiKey, api_key_id)
        if api_key is None:
            abort(404)

        storage.delete(api_key)
        storage.save()
        return jsonify({}), 200


@api_key_views.route("/api_keys", strict_slashes=False,
                     methods=["POST"])
@require_admin_auth
def post_api_key():
    """posts a new api_key"""
    if request.method == "POST":
        if not request.get_json():
            abort(400, description="Not a JSON")
        if 'name' not in request.get_json():
            abort(400, description="Missing name")

        api_key_data = request.get_json()
        new_api_key = apiKey(**api_key_data)
        new_api_key.save()
        return jsonify(new_api_key.to_dict()), 201


@api_key_views.route("/api_keys/<api_key_id>", methods=["PUT"])
@require_admin_auth
def update_api_key(api_key_id):
    """updates data on a api_key"""
    if request.method == "PUT":
        all_api_keys = storage.get(apiKey, api_key_id)
        if not all_api_keys:
            abort(404)
        if not request.get_json():
            abort(400, description="Not a JSON")
        data = request.get_json()
        for key, value in data.items():
            if key not in ["id", "created_at", "updated_at"]:
                setattr(all_api_keys, key, value)
        storage.save()
        return jsonify(all_api_keys.to_dict()), 200


