#!/usr/bin/python3
"""
This file contains the Listing module
"""
from api.v1.views import app_views
from flask import jsonify, abort, request, make_response
from models import storage
from models.listing import Listing
from models.city import City
from models.user import User
from models.amenity import Amenity
from models.state import State
from flasgger.utils import swag_from


@app_views.route('/cities/<string:city_id>/listings',
                 methods=['GET'], strict_slashes=False)
@swag_from('documentation/listings/get.yml', methods=['GET'])
def get_all_listings(city_id):
    """ list cities by id """
    city = storage.get(City, city_id)
    if city is None:
        abort(404)
    listings = [obj.to_dict() for obj in city.listings]
    return jsonify(listings)


@app_views.route('/listings/<string:listing_id>', methods=['GET'],
                 strict_slashes=False)
@swag_from('documentation/listings/get_id.yml', methods=['GET'])
def get_listing(listing_id):
    """ get listing by id """
    listing = storage.get(Listing, listing_id)
    if listing is None:
        abort(404)
    return jsonify(listing.to_dict())


@app_views.route('/listings/<string:listing_id>', methods=['DELETE'],
                 strict_slashes=False)
@swag_from('documentation/listings/delete.yml', methods=['DELETE'])
def del_listing(listing_id):
    """ delete listing by id """
    listing = storage.get(Listing, listing_id)
    if listing is None:
        abort(404)
    listing.delete()
    storage.save()
    return jsonify({})


@app_views.route('/cities/<string:city_id>/listings', methods=['POST'],
                 strict_slashes=False)
@swag_from('documentation/listings/post.yml', methods=['POST'])
def create_obj_listing(city_id):
    """ create new instance """
    city = storage.get(City, city_id)
    if city is None:
        abort(404)
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    if 'user_id' not in request.get_json():
        return make_response(jsonify({"error": "Missing user_id"}), 400)
    if 'name' not in request.get_json():
        return make_response(jsonify({"error": "Missing name"}), 400)
    kwargs = request.get_json()
    kwargs['city_id'] = city_id
    user = storage.get(User, kwargs['user_id'])
    if user is None:
        abort(404)
    obj = Listing(**kwargs)
    obj.save()
    return (jsonify(obj.to_dict()), 201)


@app_views.route('/listings/<string:listing_id>', methods=['PUT'],
                 strict_slashes=False)
@swag_from('documentation/listings/put.yml', methods=['PUT'])
def post_listing(listing_id):
    """ update by id """
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    obj = storage.get(Listing, listing_id)
    if obj is None:
        abort(404)
    for key, value in request.get_json().items():
        if key not in ['id', 'user_id', 'city_id', 'created_at', 'updated']:
            setattr(obj, key, value)
    storage.save()
    return jsonify(obj.to_dict())


@app_views.route('/listings_search', methods=['POST'],
                 strict_slashes=False)
@swag_from('documentation/listings/search.yml', methods=['POST'])
def search_listings_by_id():
    """ search listings by id """
    if request.get_json() is None:
        return make_response(jsonify({"error": "Not a JSON"}), 400)

    data = request.get_json()

    if data and len(data):
        states = data.get('states', None)
        cities = data.get('cities', None)
        amenities = data.get('amenities', None)

    if not data or not len(data) or (
            not states and
            not cities and
            not amenities):
        listings = storage.all(Listing).values()
        list_listings = []
        for listing in listings:
            list_listings.append(listing.to_dict())
        return jsonify(list_listings)

    list_listings = []
    if states:
        states_obj = [storage.get(State, s_id) for s_id in states]
        for state in states_obj:
            if state:
                for city in state.cities:
                    if city:
                        for listing in city.listings:
                            list_listings.append(listing)

    if cities:
        city_obj = [storage.get(City, c_id) for c_id in cities]
        for city in city_obj:
            if city:
                for listing in city.listings:
                    if listing not in list_listings:
                        list_listings.append(listing)

    if amenities:
        if not list_listings:
            list_listings = storage.all(Listing).values()
        amenities_obj = [storage.get(Amenity, a_id) for a_id in amenities]
        list_listings = [listing for listing in list_listings
                       if all([am in listing.amenities
                               for am in amenities_obj])]

    listings = []
    for p in list_listings:
        d = p.to_dict()
        d.pop('amenities', None)
        listings.append(d)

    return jsonify(listings)
