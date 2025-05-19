#!/usr/bin/python3
"""imports app_views and creates a route /status"""

from flask import jsonify
from api.v1.views import app_views
from models import storage
from models.amenity import Amenity
from models.city import City
from models.listing import Listing
from models.review import Review
from models.state import State
from models.town import Town
from models.user import User
from models.agent import Agent
from models.support_agent import supportAgent
from models.tag import Tag
from models.country import Country
from models.lease import Lease
from models.ticket import Ticket
from models.user_session import userSession
from models.admin_session import adminSession
from models.agent_session import agentSession
from models.support_agent_session import supportAgentSession
from models.booking import Booking
import json
from auth.authorization import require_admin_auth

@app_views.route("/status", methods=['GET'], strict_slashes=False)
def status_returns():
    """returns a json file"""
    return jsonify({"status": "OK"})


@app_views.route("/stats", methods=['GET'], strict_slashes=False)
# @require_admin_auth
def no_of_objects():
    """returns the number of objects"""
    data = {
            "amenities": storage.count(Amenity),
            "tags": storage.count(Tag),
            "cities": storage.count(City),
            "countries": storage.count(Country),
            "towns": storage.count(Town),
            "agents": storage.count(Agent),
            "support_agents": storage.count(supportAgent),
            "tickets": storage.count(Ticket),
            "listings": storage.count(Listing),
            "reviews": storage.count(Review),
            "states": storage.count(State),
            "users": storage.count(User),
            "bookings": storage.count(Booking),
            "support_agent_sessions": storage.count(supportAgentSession),
            "user_sessions": storage.count(userSession),
            "agent_sessions": storage.count(agentSession),
            "admin_sessions": storage.count(adminSession)
            }
    return jsonify(data)
