#!/usr/bin/python3
"""
This file contains the Lease module
"""
from api.v1.views import lease_views
from flask import jsonify, abort, request, make_response
from models import storage
from models.lease import Lease
from flasgger.utils import swag_from
from werkzeug.security import generate_password_hash
from auth.authorization import require_admin_auth, require_agent_or_admin_auth, require_agent_or_admin_or_user_auth, require_support_agent_or_admin_or_user_auth


@lease_views.route('/leases', methods=['GET'], strict_slashes=False)
@swag_from('documentation/lease/get.yml', methods=['GET'])
@require_admin_auth
def get_all_leases():
    """ get leases by id"""
    all_list = [obj.to_dict() for obj in storage.all(Lease).values()]
    return jsonify(all_list)


@lease_views.route('/leases/<string:lease_id>', methods=['GET'],
                 strict_slashes=False)
@swag_from('documentation/lease/get_id.yml', methods=['GET'])
@require_agent_or_admin_or_user_auth
def get_lease(lease_id):
    """ get lease by id"""
    lease = storage.get(Lease, lease_id)
    if lease is None:
        message = f"lease with id {lease_id} not found"
        return make_response(jsonify({"Message": message}), 404)
    return jsonify(lease.to_dict())


@lease_views.route('/leases/<string:lease_id>', methods=['DELETE'],
                 strict_slashes=False)
@swag_from('documentation/lease/delete.yml', methods=['DELETE'])
@require_admin_auth
def del_lease(lease_id):
    """ delete lease by id"""
    lease = storage.get(Lease, lease_id)
    if lease is None:
        return make_response(jsonify({"error": "Lease not found"}), 404) 
    lease.delete()
    storage.save()
    message = f"Lease with leaseId: {lease.id} deleted successfully"
    return jsonify({"Message": message})


@lease_views.route('/leases/', methods=['POST'],
                 strict_slashes=False)
@swag_from('documentation/lease/post.yml', methods=['POST'])
@require_agent_or_admin_auth
def create_obj_lease():
    """ create new instance """
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    
    data = request.get_json()

    if 'listing_id' not in request.get_json():
        return make_response(jsonify({"error": "Missing listing. PLease make sure you select."}), 400)
    if 'lessee_id'not in request.get_json():
        return make_response(jsonify({"error": "Missing user. Please make sure you select a user."}), 400)
    if 'lessor_id' not in request.get_json():
        return make_response(jsonify({"error": "Missing agent. Please make sure you select an agent."}), 400)
    if 'start_date' not in request.get_json():
        return make_response(jsonify({"error": "Missing start date. PLease make sure you select the start date."}), 400)
    if 'stop_date' not in request.get_json():
        return make_response(jsonify({"error": "Missing stop date. PLease make sure you select the stop date."}), 400)
    if 'payment_per_night' not in request.get_json():
        return make_response(jsonify({"error": "Missing price. PLease make sure you select the price."}), 400)

    
    js = request.get_json()

    obj = Lease(**js)
    obj.save()
    return (jsonify(obj.to_dict()), 201)


@lease_views.route('/leases/<string:lease_id>', methods=['PUT'],
                 strict_slashes=False)
@swag_from('documentation/lease/put.yml', methods=['PUT'])
@require_agent_or_admin_or_user_auth
def post_lease(lease_id):
    """  """
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    obj = storage.get(Lease, lease_id)
    if obj is None:
        abort(404)
    for key, value in request.get_json().items():
        if key not in ['id', 'email', 'created_at', 'updated']:
            setattr(obj, key, value)
    storage.save()
    return jsonify(obj.to_dict())
