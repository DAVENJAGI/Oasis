#!/usr/bin/python3
"""import city_views and creates a route"""

from flask import jsonify, Blueprint, abort, request
from api.v1.views import tag_views
from models import storage
from models.base_model import BaseModel
from models.tag import Tag
from models.city import City
from models.listing import Listing
from models.review import Review
from models.state import State
from models.user import User
import json
from auth.authorization import require_admin_auth, require_user_or_admin_auth, require_agent_or_admin_or_user_auth, require_support_agent_or_admin_or_user_auth


@tag_views.route("/tags", strict_slashes=False, methods=["GET"])
@require_agent_or_admin_or_user_auth
def return_tags():
    """returns all tag objects"""
    all_tags = storage.all(Tag).values()
    tags_list = []
    for tag in all_tags:
        tags_list.append(tag.to_dict())
    return jsonify(tags_list)


@tag_views.route("/tags/<tag_id>", strict_slashes=False,
                     methods=["GET", "DELETE"])
@require_agent_or_admin_or_user_auth
def return_tag_by_id(tag_id):
    """deletes a tag"""
    if request.method == "GET":
        all_tags = storage.get(Tag, tag_id)
        if not all_tags:
            abort(404)
        return jsonify(all_tags.to_dict())

    elif request.method == "DELETE":
        tag = storage.get(Tag, tag_id)
        if tag is None:
            abort(404)

        storage.delete(tag)
        storage.save()
        return jsonify({}), 200


@tag_views.route("/tags", strict_slashes=False,
                     methods=["POST"])
@require_admin_auth
def post_tag():
    """posts a new tag"""
    if request.method == "POST":
        if not request.get_json():
            abort(400, description="Not a JSON")
        if 'name' not in request.get_json():
            abort(400, description="Missing name")

        tag_data = request.get_json()
        new_tag = Tag(**tag_data)
        new_tag.save()
        return jsonify(new_tag.to_dict()), 201


@tag_views.route("/tags/<tag_id>", methods=["PUT"])
@require_admin_auth
def update_tag(tag_id):
    """updates data on a tag"""
    if request.method == "PUT":
        all_tags = storage.get(Tag, tag_id)
        if not all_tags:
            abort(404)
        if not request.get_json():
            abort(400, description="Not a JSON")
        data = request.get_json()
        for key, value in data.items():
            if key not in ["id", "created_at", "updated_at"]:
                setattr(all_tags, key, value)
        storage.save()
        return jsonify(all_tags.to_dict()), 200

