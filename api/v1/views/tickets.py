#!/usr/bin/python3
"""imports app_views and creates a route /status"""

from flask import jsonify, Blueprint, abort, request, make_response
from api.v1.views import ticket_views
from models import storage
from models.base_model import BaseModel
from models.amenity import Amenity
from models.city import City
from models.listing import Listing 
from models.review import Review
from models.ticket import Ticket
from models.user import User
import json

# ticket_views = Blueprint("tickets", __name__)


@ticket_views.route("/tickets", strict_slashes=False, methods=["GET"])
def return_tickets():
    """returns all ticket objects"""
    all_tickets = storage.all(Ticket).values()
    tickets_list = []
    for ticket in all_tickets:
        tickets_list.append(ticket.to_dict())
    return jsonify(tickets_list)


@ticket_views.route("/tickets/<ticket_id>", strict_slashes=False)
def return_ticket(ticket_id):
    """Returns ticket based on ticket_id"""
    if request.method == "GET":
        all_tickets = storage.get(Ticket, ticket_id)
        if not all_tickets:
            abort(404)
        return jsonify(all_tickets.to_dict())


@ticket_views.route("/tickets/<ticket_id>", methods=["DELETE"])
def delete_ticket(ticket_id):
    """deletes ticket"""
    if request.method == "DELETE":
        ticket = storage.get(Ticket, ticket_id)
        if ticket is None:
            abort(404)
        storage.delete(ticket)
        storage.save()
        return jsonify({}), 200


@ticket_views.route("/tickets/", strict_slashes=False, methods=["POST"])
def post_ticket():
    """posts a new ticket"""
    if request.method == "POST":
        if not request.get_json():
            abort(400, description="Not a JSON")
        if 'title' not in request.get_json():
            return make_response(jsonify({"error": "Missing ticket title in data"}), 400)
        if 'description' not in request.get_json():
            return make_response(jsonify({"error": "Missing ticket description in data"}), 400)

    ticket_data = request.get_json()
    instance = Ticket(**ticket_data)
    instance.save()
    return jsonify(instance.to_dict()), 201


@ticket_views.route("/tickets/<ticket_id>", methods=["PUT"])
def update_ticket(ticket_id):
    """updates data on a ticket"""
    if request.method == "PUT":
        all_tickets = storage.get(Ticket, ticket_id)
        if not all_tickets:
            abort(404)
        if not request.get_json():
            abort(400, description="Not a JSON")
        data = request.get_json()
        for key, value in data.items():
            if key not in ["id", "created_at", "updated_at"]:
                setattr(all_tickets, key, value)
        storage.save()
        return jsonify(all_tickets.to_dict()), 200
