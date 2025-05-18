#!/usr/bin/python3
"""
This file contains the User module
"""
from api.v1.views import user_views
from flask import jsonify, abort, request, make_response
from models import storage
from models.user import User
from models.user_rating import userRating
from models.favorite_listing import favoriteListing
from models.listing import Listing
from flasgger.utils import swag_from
from werkzeug.security import generate_password_hash
from auth.authorization import require_admin_auth, require_user_or_admin_auth, require_agent_or_admin_or_user_auth, require_support_agent_or_admin_or_user_auth

@user_views.route('/users', methods=['GET'], strict_slashes=False)
@swag_from('documentation/user/get.yml', methods=['GET'])
@require_admin_auth
def get_all_users():
    """ get users by id"""
    all_list = [obj.to_dict() for obj in storage.all(User).values()]
    return jsonify(all_list)


@user_views.route('/user/<string:user_id>', methods=['GET'],
                 strict_slashes=False)
@swag_from('documentation/user/get_id.yml', methods=['GET'])
@require_user_or_admin_auth
def get_user(user_id):
    """ get user by id"""
    user = storage.get(User, user_id)
    if user is None:
        message = f"user with id {user_id} not found"
        return make_response(jsonify({"Message": message}), 404)
    return jsonify(user.to_dict())


@user_views.route('/user/<string:user_id>', methods=['DELETE'],
                 strict_slashes=False)
@swag_from('documentation/user/delete.yml', methods=['DELETE'])
@require_user_or_admin_auth
def del_user(user_id):
    """ delete user by id"""
    user = storage.get(User, user_id)
    if user is None:
        abort(404)
    user.delete()
    storage.save()
    return jsonify({})


@user_views.route('/users/', methods=['POST'],
                 strict_slashes=False)
@swag_from('documentation/user/post.yml', methods=['POST'])
def create_obj_user():
    """ create new instance """
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    
    data = request.get_json()

    if 'email' not in request.get_json():
        return make_response(jsonify({"error": "Missing email"}), 400)
    if 'password'not in request.get_json():
        return make_response(jsonify({"error": "Missing password"}), 400)
    if 'telephone_no' not in request.get_json():
        return make_response(jsonify({"error": "Missing telephone_No"}), 400)
    if 'sex' not in request.get_json():
        return make_response(jsonify({"error": "Missing user sex"}), 400)
    
    js = request.get_json()

    hashed_password = generate_password_hash(js['password'])
    js['password'] = hashed_password

    obj = User(**js)
    obj.save()
    return (jsonify(obj.to_dict()), 201)


@user_views.route('/user/<string:user_id>', methods=['PUT'],
                 strict_slashes=False)
@swag_from('documentation/user/put.yml', methods=['PUT'])
@require_user_or_admin_auth
def put_user(user_id):
    """ put user data endpoint  """
    if not request.form:
        return make_response(jsonify({"error": "Missing form data"}), 400)
    obj = storage.get(User, user_id)
    if obj is None:
        abort(404)
    for key, value in request.form.to_dict().items():
        if key not in ['id', 'email', 'created_at', 'updated']:
            setattr(obj, key, value)
    if 'password' in request.form:
        hashed_password = generate_password_hash(request.form['password'])
        setattr(obj, 'password', hashed_password)

    storage.save()
    return jsonify(obj.to_dict())

''' USER FAVORITE LISTINGS '''
@user_views.route('/user/<string:user_id>/favorites/', methods=['POST'],
                 strict_slashes=False)
@swag_from('documentation/favorites/post.yml', methods=['POST'])
@require_user_or_admin_auth
def create_obj_favorites(user_id):
    """ create new instance of user favorite listings"""
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)

    user = storage.get(User, user_id)
    if not user:
        return make_response(jsonify({"error": "User not found"}), 404)
    data = request.get_json()

    if 'listing_id' not in request.get_json():
        return make_response(jsonify({"error": "Missing listing id"}), 400)
    listing = storage.get(Listing, data['listing_id'])
    if not listing:
        return make_response(jsonify({"error": "Listing not found. Please choose a valid lising"}), 400)

    js = request.get_json()
    obj = favoriteListing(**js, user_id=user.id)
    obj.save()
    return (jsonify(obj.to_dict()), 201)

@user_views.route('/user/<string:user_id>/favorites',
                 methods=['GET'], strict_slashes=False)
@swag_from('documentation/favorites/get.yml', methods=['GET'])
@require_user_or_admin_auth
def get_all_user_favorites(user_id):
    """ user favorite listings """
    user = storage.get(User, user_id)
    if user is None:
        return make_response(jsonify({"error": "User not found"}), 404)
    favorites = [obj.to_dict() for obj in user.favorite_listing]
    return jsonify(favorites)


@user_views.route('/user/<string:user_id>/rating/', methods=['POST'],
                 strict_slashes=False)
@swag_from('documentation/ratings/post.yml', methods=['POST'])
@require_agent_or_admin_or_user_auth
def create_obj_user_ratings(user_id):
    """ create new instance of user ratings"""
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)

    user = storage.get(User, user_id)
    if not user:
        return make_response(jsonify({"error": "User not found"}), 404)
    
    if 'agent_id' not in request.get_json():
        return make_response(jsonify({"error": "No agent id"}), 400)
    if 'score' not in request.get_json():
        return make_response(jsonify({"error": "No score added"}), 400)

    js = request.get_json()
    obj = userRating(**js, user_id=user.id)
    obj.save()
    return (jsonify(obj.to_dict()), 201)



@user_views.route('/user/<string:user_id>/ratings',
                 methods=['GET'], strict_slashes=False)
@swag_from('documentation/ratings/get.yml', methods=['GET'])
@require_agent_or_admin_or_user_auth
def get_all_user_ratings(user_id):
    """ user rating """
    user = storage.get(User, user_id)
    if user is None:
        return make_response(jsonify({"error": "User not found"}), 404)
    ratings = [obj.to_dict() for obj in user.ratings]
    return jsonify(ratings)


@user_views.route('/user/<string:user_id>/leases',
                 methods=['GET'], strict_slashes=False)
@swag_from('documentation/leases/get.yml', methods=['GET'])
@require_user_or_admin_auth
def get_all_user_leases(user_id):
    """ user leases """
    user = storage.get(User, user_id)
    if user is None:
        return make_response(jsonify({"error": "User not found"}), 404)
    leases = [obj.to_dict() for obj in user.leases]
    return jsonify(leases)



@user_views.route('/user/<string:user_id>/reviews',
                 methods=['GET'], strict_slashes=False)
@swag_from('documentation/reviews/get.yml', methods=['GET'])
@require_agent_or_admin_or_user_auth
def get_all_user_reviews(user_id):
    """ user reviews """
    user = storage.get(User, user_id)
    if user is None:
        return make_response(jsonify({"error": "User not found"}), 404)
    reviews = [obj.to_dict() for obj in user.reviews]
    return jsonify(reviews)


@user_views.route('/user/<string:user_id>/tickets',
                 methods=['GET'], strict_slashes=False)
@swag_from('documentation/tickets/get.yml', methods=['GET'])
@require_support_agent_or_admin_or_user_auth
def get_all_user_tickets(user_id):
    """ user tickets """
    user = storage.get(User, user_id)
    if user is None:
        return make_response(jsonify({"error": "User not found"}), 404)
    tickets = [obj.to_dict() for obj in user.tickets]
    return jsonify(tickets)


