#!/usr/bin/python3
"""
This file contains the Admin module
"""
from api.v1.views import admin_views
from flask import jsonify, abort, request, make_response
from models import storage
from models.admin import Admin
from flasgger.utils import swag_from
from werkzeug.security import generate_password_hash


@admin_views.route('/admins', methods=['GET'], strict_slashes=False)
@swag_from('documentation/admin/get.yml', methods=['GET'])
def get_all_admins():
    """ get admins by id"""
    all_list = [obj.to_dict() for obj in storage.all(Admin).values()]
    return jsonify(all_list)


@admin_views.route('/admins/<string:admin_id>', methods=['GET'],
                 strict_slashes=False)
@swag_from('documentation/admin/get_id.yml', methods=['GET'])
def get_admin(admin_id):
    """ get admin by id"""
    admin = storage.get(Admin, admin_id)
    if admin is None:
        message = f"admin with id {admin_id} not found"
        return make_response(jsonify({"Message": message}), 404)
    return jsonify(admin.to_dict())


@admin_views.route('/admins/<string:admin_id>', methods=['DELETE'],
                 strict_slashes=False)
@swag_from('documentation/admin/delete.yml', methods=['DELETE'])
def del_admin(admin_id):
    """ delete admin by id"""
    admin = storage.get(Admin, admin_id)
    if admin is None:
        return make_response(jsonify({"error": "Admin not found"}), 404) 
    admin.delete()
    storage.save()
    message = f"Admin with adminId: {admin.id} deleted successfully"
    return jsonify({"Message": message})


@admin_views.route('/admins/', methods=['POST'],
                 strict_slashes=False)
@swag_from('documentation/admin/post.yml', methods=['POST'])
def create_obj_admin():
    """ create new instance """
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    
    data = request.get_json()

    if 'email' not in request.get_json():
        return make_response(jsonify({"error": "Missing email"}), 400)
    if 'password'not in request.get_json():
        return make_response(jsonify({"error": "Missing password"}), 400)
    if 'first_name' not in request.get_json():
        return make_response(jsonify({"error": "Missing admin first name"}), 400)
    if 'last_name' not in request.get_json():
        return make_response(jsonify({"error": "Missing admin last name"}), 400)
    
    js = request.get_json()

    hashed_password = generate_password_hash(js['password'])
    js['password'] = hashed_password

    obj = Admin(**js)
    obj.save()
    return (jsonify(obj.to_dict()), 201)


@admin_views.route('/admins/<string:admin_id>', methods=['PUT'],
                 strict_slashes=False)
@swag_from('documentation/admin/put.yml', methods=['PUT'])
def post_admin(admin_id):
    """  """
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    obj = storage.get(Admin, admin_id)
    if obj is None:
        abort(404)
    for key, value in request.get_json().items():
        if key not in ['id', 'email', 'created_at', 'updated']:
            setattr(obj, key, value)
    storage.save()
    return jsonify(obj.to_dict())
