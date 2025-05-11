#!/usr/bin/python3
"""
This file contains the Agent module
"""
from api.v1.views import agent_views
from flask import jsonify, abort, request, make_response
from models import storage
from models.agent import Agent
from models.agent_rating import agentRating
from flasgger.utils import swag_from
from werkzeug.security import generate_password_hash


@agent_views.route('/agents', methods=['GET'], strict_slashes=False)
@swag_from('documentation/agent/get.yml', methods=['GET'])
def get_all_agents():
    """ get agents by id"""
    all_list = [obj.to_dict() for obj in storage.all(Agent).values()]
    return jsonify(all_list)


@agent_views.route('/agents/<string:agent_id>', methods=['GET'],
                 strict_slashes=False)
@swag_from('documentation/agent/get_id.yml', methods=['GET'])
def get_agent(agent_id):
    """ get agent by id"""
    agent = storage.get(Agent, agent_id)
    if agent is None:
        message = f"agent with id {agent_id} not found"
        return make_response(jsonify({"Message": message}), 404)
    return jsonify(agent.to_dict())


@agent_views.route('/agents/<string:agent_id>', methods=['DELETE'],
                 strict_slashes=False)
@swag_from('documentation/agent/delete.yml', methods=['DELETE'])
def del_agent(agent_id):
    """ delete agent by id"""
    agent = storage.get(Agent, agent_id)
    if agent is None:
        abort(404)
    agent.delete()
    storage.save()
    return jsonify({})


@agent_views.route('/agents/', methods=['POST'],
                 strict_slashes=False)
@swag_from('documentation/agent/post.yml', methods=['POST'])
def create_obj_agent():
    """ create new instance """
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    
    data = request.get_json()

    if 'email' not in request.get_json():
        return make_response(jsonify({"error": "Missing email"}), 400)
    if 'password'not in request.get_json():
        return make_response(jsonify({"error": "Missing password"}), 400)
    if 'telephone_no' not in request.get_json():
        return make_response(jsonify({"error": "Missing telephone_No"}), 400)
    if 'sex' not in request.get_json():
        return make_response(jsonify({"error": "Missing agent sex"}), 400)
    
    js = request.get_json()

    hashed_password = generate_password_hash(js['password'])
    js['password'] = hashed_password

    obj = Agent(**js)
    obj.save()
    return (jsonify(obj.to_dict()), 201)


@agent_views.route('/agents/<string:agent_id>', methods=['PUT'],
                 strict_slashes=False)
@swag_from('documentation/agent/put.yml', methods=['PUT'])
def post_agent(agent_id):
    """  """
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    obj = storage.get(Agent, agent_id)
    if obj is None:
        abort(404)
    for key, value in request.get_json().items():
        if key not in ['id', 'email', 'created_at', 'updated']:
            setattr(obj, key, value)
    storage.save()
    return jsonify(obj.to_dict())


@agent_views.route('/agents/<string:agent_id>/rating/', methods=['POST'],
                 strict_slashes=False)
@swag_from('documentation/ratings/post.yml', methods=['POST'])
def create_obj_agent_ratings(agent_id):
    """ create new instance of agent ratings"""
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)

    agent = storage.get(Agent, agent_id)
    if not agent:
        return make_response(jsonify({"error": "Agent not found"}), 404)

    if 'user_id' not in request.get_json():
        return make_response(jsonify({"error": "No user id"}), 400)
    if 'score' not in request.get_json():
        return make_response(jsonify({"error": "No score added"}), 400)

    js = request.get_json()
    obj = agentRating(**js, agent_id=agent.id)
    obj.save()
    return (jsonify(obj.to_dict()), 201)



@agent_views.route('/agent/<string:agent_id>/ratings',
                 methods=['GET'], strict_slashes=False)
@swag_from('documentation/ratings/get.yml', methods=['GET'])
def get_all_agent_ratings(agent_id):
    """ agent rating """
    agent = storage.get(Agent, agent_id)
    if agent is None:
        return make_response(jsonify({"error": "Agent not found"}), 404)
    ratings = [obj.to_dict() for obj in agent.ratings]
    return jsonify(ratings)


@agent_views.route('/agent/<string:agent_id>/listings',
                 methods=['GET'], strict_slashes=False)
@swag_from('documentation/listings/get.yml', methods=['GET'])
def get_all_agent_listings(agent_id):
    """ agent listing """
    agent = storage.get(Agent, agent_id)
    if agent is None:
        return make_response(jsonify({"error": "Agent not found"}), 404)
    listings = [obj.to_dict() for obj in agent.listings]
    return jsonify(listings)

@agent_views.route('/agent/<string:agent_id>/leases',
                 methods=['GET'], strict_slashes=False)
@swag_from('documentation/leases/get.yml', methods=['GET'])
def get_all_agent_leases(agent_id):
    """ agent leases """
    agent = storage.get(Agent, agent_id)
    if agent is None:
        return make_response(jsonify({"error": "Agent not found"}), 404)
    leases = [obj.to_dict() for obj in agent.leases]
    return jsonify(leases)

@agent_views.route('/agent/<string:agent_id>/tickets',
                 methods=['GET'], strict_slashes=False)
@swag_from('documentation/tickets/get.yml', methods=['GET'])
def get_all_agent_tickets(agent_id):
    """ agent tickets """
    agent = storage.get(Agent, agent_id)
    if agent is None:
        return make_response(jsonify({"error": "Agent not found"}), 404)
    tickets = [obj.to_dict() for obj in agent.tickets]
    return jsonify(tickets)

