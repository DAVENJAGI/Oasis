#!/usr/bin/python3
"""
This file contains the Review module
"""
from api.v1.views import review_views
from flask import jsonify, abort, request, make_response
from models import storage
from models.review import Review
from models.favorite_listing import favoriteListing
from models.listing import Listing
from flasgger.utils import swag_from
from werkzeug.security import generate_password_hash


@review_views.route('/reviews', methods=['GET'], strict_slashes=False)
@swag_from('documentation/review/get.yml', methods=['GET'])
def get_all_reviews():
    """ get reviews by id"""
    all_list = [obj.to_dict() for obj in storage.all(Review).values()]
    return jsonify(all_list)


@review_views.route('/reviews/<string:review_id>', methods=['GET'],
                 strict_slashes=False)
@swag_from('documentation/review/get_id.yml', methods=['GET'])
def get_review(review_id):
    """ get review by id"""
    review = storage.get(Review, review_id)
    if review is None:
        message = f"review with id {review_id} not found"
        return make_response(jsonify({"Message": message}), 404)
    return jsonify(review.to_dict())


@review_views.route('/reviews/<string:review_id>', methods=['DELETE'],
                 strict_slashes=False)
@swag_from('documentation/review/delete.yml', methods=['DELETE'])
def del_review(review_id):
    """ delete review by id"""
    review = storage.get(Review, review_id)
    if review is None:
        return make_response(jsonify({"error": "Review not found."}), 404)
    review.delete()
    storage.save()
    return jsonify({})


@review_views.route('/reviews/<string:review_id>', methods=['PUT'],
                 strict_slashes=False)
@swag_from('documentation/review/put.yml', methods=['PUT'])
def post_review(review_id):
    """  """
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    obj = storage.get(Review, review_id)
    if obj is None:
        abort(404)
    for key, value in request.get_json().items():
        if key not in ['id', 'created_at', 'updated']:
            setattr(obj, key, value)
    storage.save()
    return jsonify(obj.to_dict())


