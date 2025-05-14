#!/usr/bin/python3
"""
This file contains the supportAgent module
"""
from api.v1.views import support_agent_views
from flask import jsonify, abort, request, make_response
from models import storage
from models.support_agent import supportAgent
from models.user import User
from models.agent import Agent
from models.support_agent_rating import supportAgentRating
from flasgger.utils import swag_from
from werkzeug.security import generate_password_hash


@support_agent_views.route('/support_agents', methods=['GET'], strict_slashes=False)
@swag_from('documentation/support_agent/get.yml', methods=['GET'])
def get_all_support_agents():
    """ get support_agents by id"""
    all_list = [obj.to_dict() for obj in storage.all(supportAgent).values()]
    return jsonify(all_list)


@support_agent_views.route('/support_agents/<string:support_agent_id>', methods=['GET'],
                 strict_slashes=False)
@swag_from('documentation/support_agent/get_id.yml', methods=['GET'])
def get_support_agent(support_agent_id):
    """ get support_agent by id"""
    support_agent = storage.get(supportAgent, support_agent_id)
    if support_agent is None:
        message = f"support_agent with id {support_agent_id} not found"
        return make_response(jsonify({"Message": message}), 404)
    return jsonify(support_agent.to_dict())


@support_agent_views.route('/support_agents/<string:support_agent_id>', methods=['DELETE'],
                 strict_slashes=False)
@swag_from('documentation/support_agent/delete.yml', methods=['DELETE'])
def del_support_agent(support_agent_id):
    """ delete support_agent by id"""
    support_agent = storage.get(supportAgent, support_agent_id)
    if support_agent is None:
        abort(404)
    support_agent.delete()
    storage.save()
    return jsonify({})


@support_agent_views.route('/support_agents/', methods=['POST'],
                 strict_slashes=False)
@swag_from('documentation/support_agent/post.yml', methods=['POST'])
def create_obj_support_agent():
    """ create new instance """
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    
    data = request.get_json()

    if 'email' not in request.get_json():
        return make_response(jsonify({"error": "Missing email"}), 400)
    if 'first_name' not in request.get_json():
        return make_response(jsonify({"error": "Missing first name"}), 400)
    if 'last_name' not in request.get_json():
        return make_response(jsonify({"error": "Missing last name"}), 400)
    if 'password'not in request.get_json():
        return make_response(jsonify({"error": "Missing password"}), 400)
    if 'telephone_no' not in request.get_json():
        return make_response(jsonify({"error": "Missing telephone_No"}), 400)
   
    js = request.get_json()

    hashed_password = generate_password_hash(js['password'])
    js['password'] = hashed_password

    obj = supportAgent(**js)
    obj.save()
    return (jsonify(obj.to_dict()), 201)


@support_agent_views.route('/support_agents/<string:support_agent_id>', methods=['PUT'],
                 strict_slashes=False)
@swag_from('documentation/support_agent/put.yml', methods=['PUT'])
def post_support_agent(support_agent_id):
    """  """
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    obj = storage.get(supportAgent, support_agent_id)
    if obj is None:
        return make_response(jsonify({"error": "Support agent not found"}), 404)
    
    for key, value in request.get_json().items():
        if key == 'password':
            hashed_password = generate_password_hash(value)
            setattr(obj, key, hashed_password)
        elif key not in ['id', 'email', 'created_at', 'updated']:
            setattr(obj, key, value)

    storage.save()
    return jsonify(obj.to_dict())


@support_agent_views.route('/support_agents/<string:support_agent_id>/rating/', methods=['POST'],
                 strict_slashes=False)
@swag_from('documentation/ratings/post.yml', methods=['POST'])
def create_obj_support_agent_ratings(support_agent_id):
    """ create new instance of support_agent ratings"""
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)

    js = request.get_json()
    support_agent = storage.get(supportAgent, support_agent_id)
    if not support_agent:
        return make_response(jsonify({"error": "supportAgent not found"}), 404)

    if 'user_id' in request.get_json():
        user = storage.get(User, js['user_id'])
        if not user:
            return make_response(jsonify({"error": "User not found"}), 404)
    if 'agent_id' in request.get_json():
        agent = storage.get(Agent, js['agent_id'])
        if not agent:
            return make_response(jsonify({"error": "Agent not found"}), 404)

    if 'satisfaction' not in request.get_json():
        return make_response(jsonify({"error": "No score added for satisfaction"}), 400)

    obj = supportAgentRating(**js, support_agent_id=support_agent.id)
    obj.save()
    return (jsonify(obj.to_dict()), 201)



@support_agent_views.route('/support_agent/<string:support_agent_id>/ratings',
                 methods=['GET'], strict_slashes=False)
@swag_from('documentation/ratings/get.yml', methods=['GET'])
def get_all_support_agent_ratings(support_agent_id):
    """ support_agent rating """
    support_agent = storage.get(supportAgent, support_agent_id)
    if support_agent is None:
        return make_response(jsonify({"error": "supportAgent not found"}), 404)
    ratings = [obj.to_dict() for obj in support_agent.ratings]
    return jsonify(ratings)


@support_agent_views.route('/support_agent/<string:support_agent_id>/tickets',
                 methods=['GET'], strict_slashes=False)
@swag_from('documentation/tickets/get.yml', methods=['GET'])
def get_all_support_agent_tickets(support_agent_id):
    """ support_agent tickets """
    support_agent = storage.get(supportAgent, support_agent_id)
    if support_agent is None:
        return make_response(jsonify({"error": "supportAgent not found"}), 404)
    tickets = [obj.to_dict() for obj in support_agent.tickets]
    return jsonify(tickets)

