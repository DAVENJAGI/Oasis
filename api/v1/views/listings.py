#!/usr/bin/python3
"""
This file contains the Listing module
"""
from api.v1.views import listing_views
from flask import jsonify, abort, request, make_response
from models import storage
from models.listing import Listing
from models.town import Town
from models.agent import Agent
from models.user import User
from models.amenity import Amenity
from models.state import State
from models.review import Review
from models.booking import Booking
from models.report import Report
from models.listing_image import listingImage
from flasgger.utils import swag_from
from utils.file_utils import save_image

@listing_views.route('/town/<string:town_id>/listings',
                 methods=['GET'], strict_slashes=False)
@swag_from('documentation/listings/get.yml', methods=['GET'])
def get_all_listings(town_id):
    """ list towns by id """
    town = storage.get(Town, town_id)
    if town is None:
        return make_response(jsonify({"error": "Town not found"}), 404)
    listings = [obj.to_dict() for obj in town.listings]
    return jsonify(listings)


@listing_views.route('/listings/<string:listing_id>', methods=['GET'],
                 strict_slashes=False)
@swag_from('documentation/listings/get_id.yml', methods=['GET'])
def get_listing(listing_id):
    """ get listing by id """
    listing = storage.get(Listing, listing_id)
    if listing is None:
        abort(404)
    return jsonify(listing.to_dict())


@listing_views.route('/listings/<string:listing_id>', methods=['DELETE'],
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


@listing_views.route('/town/<string:town_id>/listings', methods=['POST'],
                 strict_slashes=False)
@swag_from('documentation/listings/post.yml', methods=['POST'])
def create_obj_listing(town_id):
    """ create new instance """
    town = storage.get(Town, town_id)
    if Town is None:
        return make_response(jsonify({"error": "Town not found"}), 404)
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    if 'agent_id' not in request.get_json():
        return make_response(jsonify({"error": "Missing agent_id"}), 400)
    if 'property_name' not in request.get_json():
        return make_response(jsonify({"error": "Missing property name"}), 400)
    kwargs = request.get_json()
    kwargs['town_id'] = town_id
    agent = storage.get(Agent, kwargs['agent_id'])
    if agent is None:
        abort(404)
    obj = Listing(**kwargs)
    obj.save()
    return (jsonify(obj.to_dict()), 201)


@listing_views.route('/listings/<string:listing_id>', methods=['PUT'],
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
        if key not in ['id', 'user_id', 'town_id', 'created_at', 'updated']:
            setattr(obj, key, value)
    storage.save()
    return jsonify(obj.to_dict())


@listing_views.route('/listings_search', methods=['POST'],
                 strict_slashes=False)
@swag_from('documentation/listings/search.yml', methods=['POST'])
def search_listings_by_id():
    """ search listings by id """
    if request.get_json() is None:
        return make_response(jsonify({"error": "Not a JSON"}), 400)

    data = request.get_json()

    if data and len(data):
        states = data.get('states', None)
        towns = data.get('towns', None)
        amenities = data.get('amenities', None)

    if not data or not len(data) or (
            not states and
            not towns and
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
                for city in state.towns:
                    if city:
                        for listing in city.listings:
                            list_listings.append(listing)

    if towns:
        city_obj = [storage.get(Town, c_id) for c_id in towns]
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

@listing_views.route('/listings/<string:listing_id>/images', methods=['POST'])
def upload_listing_image(listing_id):
    """Upload an image for a listing"""
    listing = storage.get(Listing, listing_id)
    if not listing:
        return jsonify({"error": "Listing not found"}), 404

    if 'image' not in request.files:
        return jsonify({"error": "No image part in the request"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    filepath = save_image(file, listing_id)  # You must have a defined function to handle saving

    listing_image = listingImage(listing_id=listing_id, file_path=filepath)
    storage.new(listing_image)
    storage.save()

    return jsonify({
        "message": "Image uploaded successfully",
        "file_path": filepath,
        "listing_id": listing_id
    }), 201

@listing_views.route('/listing/<string:listing_id>/images',
                 methods=['GET'], strict_slashes=False)
@swag_from('documentation/listings/get.yml', methods=['GET'])
def get_all_listing_images(listing_id):
    """ listing images """
    listing = storage.get(Listing, listing_id)
    if listing is None:
        return make_response(jsonify({"error": "Listing not found"}), 404)
    images = [obj.to_dict() for obj in listing.images]
    return jsonify(images)
                             

@listing_views.route('/listings/<string:listing_id>/review/', methods=['POST'],
                 strict_slashes=False)
@swag_from('documentation/reviews/post.yml', methods=['POST'])
def create_listing_revire(listing_id):
    """ create new instance of listing reviews"""
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)

    listing = storage.get(Listing, listing_id)
    if not listing:
        return make_response(jsonify({"error": "Listing not found"}), 404)
    data = request.get_json()

    if 'user_id' not in request.get_json():
        return make_response(jsonify({"error": "Missing user id"}), 400)
    
    user = storage.get(User, data['user_id'])
    if not user:
        return make_response(jsonify({"error": "User not found."}), 400)
    
    if 'text' not in request.get_json():
        return make_response(jsonify({"error": "Missing text. Please add some"}), 400)

    js = request.get_json()
    obj = Review(**js, listing_id=listing.id)
    obj.save()
    return (jsonify(obj.to_dict()), 201)


@listing_views.route('/listing/<string:listing_id>/reviews',
                 methods=['GET'], strict_slashes=False)
@swag_from('documentation/listings/get.yml', methods=['GET'])
def get_all_listing_reviews(listing_id):
    """ listing reviews """
    listing = storage.get(Listing, listing_id)
    if listing is None:
        return make_response(jsonify({"error": "Listing not found"}), 404)
    reviews = [obj.to_dict() for obj in listing.reviews]
    return jsonify(reviews)

@listing_views.route('/listings/<string:listing_id>/report/', methods=['POST'],
                 strict_slashes=False)
@swag_from('documentation/report/post.yml', methods=['POST'])
def create_obj_report(listing_id):
    """ create new instance """
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    
    data = request.get_json()
    listing = storage.get(Listing, listing_id)
    if not listing:
        return make_response(jsonify({"error": "Listing not found"}), 404)

    if 'reason' not in request.get_json():
        return make_response(jsonify({"error": "Missing report reason"}), 400)
    
    js = request.get_json()

    obj = Report(**js, listing_id=listing.id)
    obj.save()
    return (jsonify(obj.to_dict()), 201)

@listing_views.route('/listing/<string:listing_id>/reports',
                 methods=['GET'], strict_slashes=False)
@swag_from('documentation/listings/get.yml', methods=['GET'])
def get_all_listing_reports(listing_id):
    """ listing reports """
    listing = storage.get(Listing, listing_id)
    if listing is None:
        return make_response(jsonify({"error": "Listing not found"}), 404)
    reports = [obj.to_dict() for obj in listing.reports]
    return jsonify(reports)

@listing_views.route('/listing/<string:listing_id>/amenities/', methods=['POST'],
                 strict_slashes=False)
@swag_from('documentation/amenities/post.yml', methods=['POST'])
def create_obj_amenities(listing_id):
    """ create new listing amenity instance """
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    
    data = request.get_json()
    listing = storage.get(Listing, listing_id)
    if not listing:
        return make_response(jsonify({"error": "Listing not found"}), 404)

    if 'amenity_id' not in request.get_json():
        return make_response(jsonify({"error": "Missing amenity id."}), 400)

    amenity = storage.get(Amenity, data['amenity_id'])
    if not amenity:
        return make_response(jsonify({"error": "Amenity not found"}), 404)

    listing.amenities.append(amenity)
    storage.save()
    return (jsonify(amenity.to_dict()), 201)

@listing_views.route('/listing/<string:listing_id>/amenities',
                 methods=['GET'], strict_slashes=False)
@swag_from('documentation/listings/get.yml', methods=['GET'])
def get_all_listing_amenities(listing_id):
    """ listing amenities """
    listing = storage.get(Listing, listing_id)
    if listing is None:
        return make_response(jsonify({"error": "Listing not found"}), 404)
    amenities = [obj.to_dict() for obj in listing.amenities]
    return jsonify(amenities)


@listing_views.route('/listing/<string:listing_id>/book/', methods=['POST'],
                 strict_slashes=False)
@swag_from('documentation/bookings/post.yml', methods=['POST'])
def create_obj_bookings(listing_id):
    """ create new listing booking instance """
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)

    js = request.get_json()
    listing = storage.get(Listing, listing_id)
    if not listing:
        return make_response(jsonify({"error": "Listing not found"}), 404)

    if 'user_id' not in request.get_json():
        return make_response(jsonify({"error": "Missing user id."}), 400)
    if 'user_id' not in request.get_json():
        return make_response(jsonify({"error": "Missing user id."}), 400)
    if 'start_date' not in request.get_json():
        return make_response(jsonify({"error": "Missing start date."}), 400)
    if 'end_date' not in request.get_json():
        return make_response(jsonify({"error": "Missing end date."}), 400)


    obj = Booking(**js, listing_id=listing.id)
    obj.save()
    return (jsonify(obj.to_dict()), 201)

@listing_views.route('/listing/<string:listing_id>/bookings',
                 methods=['GET'], strict_slashes=False)
@swag_from('documentation/bookings/get.yml', methods=['GET'])
def get_all_listing_bookings(listing_id):
    """ listing bookings """
    listing = storage.get(Listing, listing_id)
    if listing is None:
        return make_response(jsonify({"error": "Listing not found"}), 404)
    bookings = [obj.to_dict() for obj in listing.bookings]
    return jsonify(bookings)

@listing_views.route('/listing/<string:listing_id>/booking/<string:booking_id>/',
                 methods=['DELETE'], strict_slashes=False)
@swag_from('documentation/bookings/get.yml', methods=['DELETE'])
def get_a_listing_booking(listing_id, booking_id):
    """ delete listing bookings """
    listing = storage.get(Listing, listing_id)
    if listing is None:
        return make_response(jsonify({"error": "Listing not found"}), 404)
    booking = storage.get(Booking, booking_id)
    booking.delete()
    storage.save()
    message = f"Booking with bookingId: {booking.id} deleted successfully."
    return make_response(jsonify({"Message": message}), 200)

