#!/usr/bin/python3
"""listings_amenities.py"""
import os
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from models import storage
from models.amenity import Amenity
from models.listing import Listing
from flasgger.utils import swag_from
from auth.authorization import require_admin_auth, require_agent_or_admin_auth, require_agent_or_admin_or_user_auth, require_support_agent_or_admin_or_user_auth


@app_views.route('/listings/<string:listing_id>/amenities', methods=['GET'],
                 strict_slashes=False)
@swag_from('documentation/listing_amenity/get_id.yml', methods=['GET'])
@require_agent_or_admin_or_user_auth
def get_amenities(listing_id):
    """ retrieves all amenities from a listing """
    listing = storage.get(Listing, listing_id)
    if listing is None:
        abort(404)
    amenities = [obj.to_dict() for obj in listing.amenities]
    return jsonify(amenities)


@app_views.route('/listings/<string:listing_id>/amenities/<string:amenity_id>',
                 methods=['DELETE'], strict_slashes=False)
@swag_from('documentation/listing_amenity/delete.yml', methods=['DELETE'])
@require_agent_or_admin_or_user_auth
def delete_amenity(listing_id, amenity_id):
    """ delete amenity from listing """
    listing = storage.get(Listing, listing_id)
    if listing is None:
        abort(404)
    amenity = storage.get(Amenity, amenity_id)
    if amenity is None:
        abort(404)
    if amenity not in listing.amenities:
        abort(404)
    listing.amenities.remove(amenity)
    storage.save()
    return jsonify({})


@app_views.route('/listings/<string:listing_id>/amenities/<string:amenity_id>',
                 methods=['POST'], strict_slashes=False)
@swag_from('documentation/listing_amenity/post.yml', methods=['POST'])
@require_agent_or_admin_auth
def post_amenity2(listing_id, amenity_id):
    """ post amenity by id """
    listing = storage.get(Listing, listing_id)
    if listing is None:
        abort(404)
    amenity = storage.get(Amenity, amenity_id)
    if amenity is None:
        abort(404)
    if amenity in listing.amenities:
        return (jsonify(amenity.to_dict()), 200)
    listing.amenities.append(obj)
    storage.save()
    return (jsonify(amenity.to_dict(), 201))
