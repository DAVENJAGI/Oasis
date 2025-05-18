#!/usr/bin/python3
"""
This file contains the Listing module
"""
from api.v1.views import recommendation_views
from flask import jsonify, abort, request, make_response
from models import storage
from models.listing import Listing
from models.listing import Listing
from models.agent import Agent
from models.user import User
from models.amenity import Amenity
from models.state import State
from models.review import Review
from models.report import Report
from flasgger.utils import swag_from
from utils.file_utils import save_image
from utils.listing_distance import haversine

@recommendation_views.route('/listing/<string:listing_id>/similar',
                     methods=['GET'], strict_slashes=False)
@swag_from('documentation/listings/get_similar.yml', methods=['GET'])
def get_listings_similar_to_viewed(listing_id):
    """ Returns listings with at least 4 amenities in common with the given listing """
    listing = storage.get(Listing, listing_id)
    if listing is None:
        return make_response(jsonify({"error": "Listing not found"}), 404)

    current_amenity_ids = set([amenity.id for amenity in listing.amenities])
    if not current_amenity_ids:
        return jsonify([])

    all_listings = storage.all(Listing).values()
    similar_listings = []

    for other in all_listings:
        if other.id == listing.id:
            continue
    other_amenity_ids = set([a.id for a in other.amenities])
    common = current_amenity_ids & other_amenity_ids
    if len(common) >= 4:
        listing_data = other.to_dict()
        listing_data["amenities"] = [a.to_dict() for a in other.amenities]  # safely serialize
        similar_listings.append(listing_data)

    return(similar_listings)


@recommendation_views.route('/listings/latest', methods=['GET'], strict_slashes=False)
def get_latest_listing():
    """Get the most recently created listing, limiting it to 20 maximum"""
    all_listings = storage.all(Listing).values()
    sorted_listings = sorted(all_listings, key=lambda l: l.created_at, reverse=True)

    latest_listings = sorted_listings[:20]
    return jsonify([listing.to_dict() for listing in latest_listings])



@recommendation_views.route('/user/<string:user_id>/nearby_listings', methods=['GET'], strict_slashes=False)
def get_listings_near_user(user_id):
    """Return listings near the user's provided location"""
    user = storage.get(User, user_id)
    default_distance = 20  # Default distance in km
    
    if not user:
        return make_response(jsonify({"error": "User not found"}), 404)
    
    user_lat = user.user_latitude
    user_lon = user.user_longitude
    
    # Check if 'distance_from_me' is passed as a query parameter
    distance_from_me = request.args.get('distance_from_me', default_distance, type=float)
    
    if not user_lat or not user_lon:
        return make_response(jsonify({"error": "User latitude and longitude cannot be null."}), 400)
    
    all_listings = storage.all(Listing).values()
    recommended = []

    for listing in all_listings:
        if not listing.latitude or not listing.longitude:
            continue

        distance = haversine(user_lat, user_lon, listing.latitude, listing.longitude) 
        if distance <= distance_from_me:
            data = listing.to_dict()
            data['distance_km'] = round(distance, 2)
            recommended.append(data)

    recommended.sort(key=lambda x: x['distance_km'])

    return jsonify(recommended)


