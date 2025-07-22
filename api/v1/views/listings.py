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
from models.city import City
from models.review import Review
from models.booking import Booking
from models.report import Report
from models.tag import Tag
from models.listing_image import listingImage
from flasgger.utils import swag_from
from utils.file_utils import save_image, save_cover_image
from auth.authorization import require_admin_auth, require_agent_or_admin_auth, require_agent_or_admin_or_user_auth, require_support_agent_or_admin_or_user_auth, require_user_or_admin_auth


@listing_views.route('/town/<string:town_id>/listings',
                 methods=['GET'], strict_slashes=False)
@swag_from('documentation/listings/get.yml', methods=['GET'])
@require_admin_auth
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
@require_agent_or_admin_auth
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
@require_agent_or_admin_auth
def create_obj_listing(town_id):
    """ create new instance """
    town = storage.get(Town, town_id)
    if town is None:
        return make_response(jsonify({"error": "Town not found"}), 404)
    if not request.form.to_dict():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    if 'agent_id' not in request.form.to_dict():
        return make_response(jsonify({"error": "Missing agent_id"}), 400)
    if 'property_name' not in request.form.to_dict():
        return make_response(jsonify({"error": "Missing property name"}), 400)

    kwargs = request.form.to_dict()
    kwargs['town_id'] = town_id
    agent = storage.get(Agent, kwargs['agent_id'])
    if agent is None:
        return make_respomse(jsonify({"error": "Agent not found."}), 404)

    obj = Listing(**kwargs)
    obj.save()

    if "cover_image" in request.files:
        file = request.files['cover_image']
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

    try:
        file_url = save_cover_image(file, str(obj.id))
    except Exception as e:
        return jsonify({"error": "Failed to upload image", "details": str(e)}), 500
    
    obj.cover_image = file_url
    obj.save()

    return (jsonify(obj.to_dict()), 201)


@listing_views.route('/listings/<string:listing_id>', methods=['PUT'],
                 strict_slashes=False)
@swag_from('documentation/listings/put.yml', methods=['PUT'])
@require_agent_or_admin_auth
def post_listing(listing_id):
    """ update by id """
    if not request.form and 'cover_image' not in request.files:
        return make_response(jsonify({"error": "Missing form data or file"}), 400)
    obj = storage.get(Listing, listing_id)
    if obj is None:
        return make_response(jsonify({"error": "Listing not found"}), 404)
    for key, value in request.form.to_dict().items():
        if key not in ['id', 'user_id', 'town_id', 'created_at', 'updated']:
            setattr(obj, key, value)
        
    if "cover_image" in request.files:
        file = request.files['cover_image']
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400
        filepath = save_cover_image(file, obj.id)
        obj.cover_image = filepath
    
    obj.save()
    storage.save()
    return jsonify(obj.to_dict())

@listing_views.route('/listings_search', methods=['POST'],
                 strict_slashes=False)
@swag_from('documentation/listings/search.yml', methods=['POST'])
def search_listings_by_id():
    """ search listings by country, location, and property type """
    if request.get_json() is None:
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    
    data = request.get_json()
    
    country = data.get('country', None)
    location = data.get('location', None)
    property_type = data.get('property_type', None)
    
    all_listings = list(storage.all(Listing).values())
    filtered_listings = all_listings
    
    if country and country.lower() != 'kenya':
        country_listings = []
        for listing in filtered_listings:
            town = storage.get(Town, listing.town_id)
            if town:
                city = storage.get(City, town.city_id)
                if city:
                    state = storage.get(State, city.state_id)
                    if state and state.name.lower() == country.lower():
                        country_listings.append(listing)
        filtered_listings = country_listings
    
    if location and location.strip():
        location_lower = location.lower().strip()
        location_listings = []
        
        for listing in filtered_listings:
            if listing.address and location_lower in listing.address.lower():
                location_listings.append(listing)
                continue
            
            if listing.property_name and location_lower in listing.property_name.lower():
                location_listings.append(listing)
                continue
            
            town = storage.get(Town, listing.town_id)
            if town and town.name and location_lower in town.name.lower():
                location_listings.append(listing)
                continue
        
        filtered_listings = location_listings
    
    if property_type and property_type.lower() != 'property type':
        property_type_listings = [
            listing for listing in filtered_listings
            if listing.property_type and listing.property_type.lower() == property_type.lower()
        ]
        filtered_listings = property_type_listings
    
    listings = []
    for listing in filtered_listings:
        d = listing.to_dict()
        d.pop('amenities', None)
        listings.append(d)
    
    return jsonify(listings)

@listing_views.route('/listings/<string:listing_id>/images', methods=['POST'])
@require_agent_or_admin_auth
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

    try:
        file_url = save_image(file, listing_id)

        listing_image = listingImage(listing_id=listing_id, file_path=file_url)
        storage.new(listing_image)
        storage.save()

        return jsonify({
            "message": "Image uploaded successfully",
            "file_path": file_url,
            "listing_id": listing_id
        }), 201
    except Exception as e:
        return jsonify({"error": "Failed to upload image",  "details": str(e)}), 500

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
@require_user_or_admin_auth
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
@require_user_or_admin_auth
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
@require_admin_auth
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
@require_agent_or_admin_auth
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
@require_user_or_admin_auth
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
@require_agent_or_admin_or_user_auth
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
@require_agent_or_admin_or_user_auth
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


@listing_views.route('/listing/<string:listing_id>/tags/', methods=['POST'],
                 strict_slashes=False)
@swag_from('documentation/tags/post.yml', methods=['POST'])
@require_agent_or_admin_auth
def create_obj_tags(listing_id):
    """ create new listing tag instance """
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)

    data = request.get_json()
    listing = storage.get(Listing, listing_id)
    if not listing:
        return make_response(jsonify({"error": "Listing not found"}), 404)

    if 'tag_id' not in request.get_json():
        return make_response(jsonify({"error": "Missing tag id."}), 400)

    tag = storage.get(Tag, data['tag_id'])
    if not tag:
        return make_response(jsonify({"error": "Tag not found"}), 404)

    listing.tags.append(tag)
    storage.save()
    return (jsonify(tag.to_dict()), 201)

@listing_views.route('/listing/<string:listing_id>/tags',
                 methods=['GET'], strict_slashes=False)
@swag_from('documentation/listings/get.yml', methods=['GET'])
def get_all_listing_tags(listing_id):
    """ listing tags """
    listing = storage.get(Listing, listing_id)
    if listing is None:
        return make_response(jsonify({"error": "Listing not found"}), 404)
    tags = [obj.to_dict() for obj in listing.tags]
    return jsonify(tags)


@listing_views.route('/listing/<string:listing_id>/tag/<string:tag_id>', methods=['DELETE'], strict_slashes=False)
@require_agent_or_admin_auth
def delete_listing_tag(listing_id, tag_id):
    """Remove a tag from a listing"""
    listing = storage.get(Listing, listing_id)
    if not listing:
        return make_response(jsonify({"error": "Listing not found"}), 404)

    tag = storage.get(Tag, tag_id)
    if not tag:
        return make_response(jsonify({"error": "Tag not found"}), 404)

    if tag not in listing.tags:
        return make_response(jsonify({"error": "Tag not associated with this listing"}), 404)

    listing.tags.remove(tag)
    storage.save()

    message = f"Tag {tag.name} removed from {listing.property_name} successfully."
    return make_response(jsonify({"Message": message}), 202)

@listing_views.route('/listing/<string:listing_id>/ratings/', methods=['POST'],
                 strict_slashes=False)
@swag_from('documentation/ratings/post.yml', methods=['POST'])
@require_user_or_admin_auth
def create_obj_ratings(listing_id):
    """ create new listing rating instance """
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)

    data = request.get_json()
    listing = storage.get(Listing, listing_id)
    if not listing:
        return make_response(jsonify({"error": "Listing not found"}), 404)

    if 'user_id' not in request.get_json():
        return make_response(jsonify({"error": "Missing user."}), 400)

    user = storage.get(User, data['user_id'])
    if not user:
        return make_response(jsonify({"error": "User not found"}), 404)

    if 'score' not in request.get_json():
        return make_response(jsonify({"error": "Missing rating score."}), 400)

    obj = listingRating(**data, listing_id=listing_id)
    obj.save()
    return (jsonify(obj.to_dict()), 201)

@listing_views.route('/listing/<string:listing_id>/ratings',
                 methods=['GET'], strict_slashes=False)
@swag_from('documentation/listings/get.yml', methods=['GET'])
def get_all_listing_ratings(listing_id):
    """ listing ratings """
    listing = storage.get(Listing, listing_id)
    if listing is None:
        return make_response(jsonify({"error": "Listing not found"}), 404)
    ratings = [obj.to_dict() for obj in listing.ratings]
    return jsonify(ratings)
