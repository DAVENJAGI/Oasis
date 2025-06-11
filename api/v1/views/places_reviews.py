#!/usr/bin/python3
"""
This file contains the Review module
"""
from api.v1.views import app_views
from flask import jsonify, abort, request, make_response
from models import storage
from models.listing import Listing
from models.review import Review
from models.user import User
from flasgger.utils import swag_from
from auth.authorization import require_admin_auth, require_user_or_admin_auth, require_agent_or_admin_or_user_auth, require_support_agent_or_admin_or_user_auth


@app_views.route('/listings/<string:listing_id>/reviews',
                 methods=['GET'], strict_slashes=False)
@swag_from('documentation/reviews/get.yml', methods=['GET'])
@require_agent_or_admin_or_user_auth
def get_all_reviews(listing_id):
    """ get reviews from a spcific listing """
    listing = storage.get(Listing, listing_id)
    if listing is None:
        abort(404)
    reviews = [obj.to_dict() for obj in listing.reviews]
    return jsonify(reviews)


@app_views.route('/reviews/<string:review_id>', methods=['GET'],
                 strict_slashes=False)
@swag_from('documentation/reviews/get_id.yml', methods=['GET'])
@require_agent_or_admin_or_user_auth
def get_review(review_id):
    """ get review by id"""
    review = storage.get(Review, review_id)
    if review is None:
        abort(404)
    return jsonify(review.to_dict())


@app_views.route('/reviews/<string:review_id>', methods=['DELETE'],
                 strict_slashes=False)
@swag_from('documentation/reviews/delete.yml', methods=['DELETE'])
@require_admin_auth
def del_review(review_id):
    """ delete review by id"""
    review = storage.get(Review, review_id)
    if review is None:
        abort(404)
    review.delete()
    storage.save()
    return jsonify({})


@app_views.route('/listings/<string:listing_id>/reviews', methods=['POST'],
                 strict_slashes=False)
@swag_from('documentation/reviews/post.yml', methods=['POST'])
@require_user_or_admin_auth
def create_obj_review(listing_id):
    """ create new instance """
    listing = storage.get(Listing, listing_id)
    if listing is None:
        abort(404)
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    if 'user_id' not in request.get_json():
        return make_response(jsonify({"error": "Missing user_id"}), 400)
    if 'text' not in request.get_json():
        return make_response(jsonify({"error": "Missing text"}), 400)
    kwargs = request.get_json()
    kwargs['listing_id'] = listing_id
    user = storage.get(User, kwargs['user_id'])
    if user is None:
        abort(404)
    obj = Review(**kwargs)
    obj.save()
    return (jsonify(obj.to_dict()), 201)


@app_views.route('/reviews/<string:review_id>', methods=['PUT'],
                 strict_slashes=False)
@swag_from('documentation/reviews/put.yml', methods=['PUT'])
@require_user_or_admin_auth
def post_review(review_id):
    """ updates by id """
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    obj = storage.get(Review, review_id)
    if obj is None:
        abort(404)
    for key, value in request.get_json().items():
        if key not in ['id', 'user_id', 'listing_id', 'created_at', 'updated']:
            setattr(obj, key, value)
    storage.save()
    return jsonify(obj.to_dict())
