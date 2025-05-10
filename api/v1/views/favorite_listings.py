#!/usr/bin/python3
"""
This file contains the favoriteListing module
"""
from api.v1.views import favorites_views
from flask import jsonify, abort, request, make_response
from models import storage
from models.favorites import favoriteListing
from flasgger.utils import swag_from
from werkzeug.security import generate_password_hash


@favorites_views.route('/admins/<string:admin_id>', methods=['DELETE'],
                 strict_slashes=False)
@swag_from('documentation/favorites/delete.yml', methods=['DELETE'])
def del_favorites(admin_id):
    """ delete favorites by id"""
    favorites = storage.get(favoriteListing, admin_id)
    if favorites is None:
        return make_response(jsonify({"error": "favoriteListing not found"}), 404) 
    favorites.delete()
    storage.save()
    message = f"favoriteListing with favoritesId: {admin.id} deleted successfully"
    return jsonify({"Message": message})


@favorites_views.route('/favorites/', methods=['POST'],
                 strict_slashes=False)
@swag_from('documentation/favorites/post.yml', methods=['POST'])
def create_obj_favorites():
    """ create new instance """
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    
    data = request.get_json()

    if 'listing_id' not in request.get_json():
        return make_response(jsonify({"error": "Missing listing id"}), 400)
    if 'user_id'not in request.get_json():
        return make_response(jsonify({"error": "Missing user id"}), 400)
        
    js = request.get_json()

    obj = favoriteListing(**js)
    obj.save()
    return (jsonify(obj.to_dict()), 201)


@favorites_views.route('/admins/<string:admin_id>', methods=['PUT'],
                 strict_slashes=False)
@swag_from('documentation/favorites/put.yml', methods=['PUT'])
def post_favorites(admin_id):
    """  """
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    obj = storage.get(favoriteListing, favorites_id)
    if obj is None:
        abort(404)
    for key, value in request.get_json().items():
        if key not in ['id', 'created_at', 'updated']:
            setattr(obj, key, value)
    storage.save()
    return jsonify(obj.to_dict())
