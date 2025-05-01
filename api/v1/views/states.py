#!/usr/bin/python3
"""imports app_views and creates a route /status"""

from flask import jsonify, Blueprint, abort, request
from api.v1.views import state_views
from models import storage
from models.base_model import BaseModel
from models.amenity import Amenity
from models.city import City
from models.place import Place
from models.review import Review
from models.state import State
from models.user import User
import json

# state_views = Blueprint("states", __name__)


@state_views.route("/states", strict_slashes=False, methods=["GET"])
def return_states():
    """returns all state objects"""
    all_states = storage.all(State).values()
    states_list = []
    for state in all_states:
        states_list.append(state.to_dict())
    return jsonify(states_list)


@state_views.route("/states/<state_id>", strict_slashes=False)
def return_state(state_id):
    """Returns state based on state_id"""
    if request.method == "GET":
        all_states = storage.get(State, state_id)
        if not all_states:
            abort(404)
        return jsonify(all_states.to_dict())


@state_views.route("/states/<state_id>", methods=["DELETE"])
def delete_state(state_id):
    """deletes state"""
    if request.method == "DELETE":
        state = storage.get(State, state_id)
        if state is None:
            abort(404)
        storage.delete(state)
        storage.save()
        return jsonify({}), 200


@state_views.route("/states/", strict_slashes=False, methods=["POST"])
def post_state():
    """posts a new state"""
    if request.method == "POST":
        if not request.get_json():
            abort(400, description="Not a JSON")
        if 'name' not in request.get_json():
            abort(400, description="Missing name")
    state_name = request.get_json()
    instance = State(**state_name)
    instance.save()
    return jsonify(instance.to_dict()), 201


@state_views.route("/states/<state_id>", methods=["PUT"])
def update_state(state_id):
    """updates data on a state"""
    if request.method == "PUT":
        all_states = storage.get(State, state_id)
        if not all_states:
            abort(404)
        if not request.get_json():
            abort(400, description="Not a JSON")
        data = request.get_json()
        for key, value in data.items():
            if key not in ["id", "created_at", "updated_at"]:
                setattr(all_states, key, value)
        storage.save()
        return jsonify(all_states.to_dict()), 200
