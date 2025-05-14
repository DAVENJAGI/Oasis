#!/usr/bin/python3
"""This is a route to handle the login request"""

from api.v1.views import login_views
from flask import jsonify, Blueprint, abort, request, make_response, session, Flask
from models import storage
from models.admin import Admin
from models.user import User
from models.agent import Agent
from models.support_agent import supportAgent
from models.user_session import userSession
from models.agent_session import agentSession
from models.admin_session import adminSession
from models.support_agent_session import supportAgentSession
import json
import secrets
import hashlib
from werkzeug.security import check_password_hash

# app = Flask(__name__)
#login_views.secret_key = secrets.token_hex(32)

@login_views.route("/admin/login", strict_slashes=False, methods=["POST"])
def admin_login():
    """A post request sent with email and password from the login page
        Handles login for the app
    """
    data = request.get_json() # the request sent from the login page

    if not data or 'email' not in data or 'password' not in data:
        return make_response(jsonify({"error": "Missing data in request"}), 400)  

    email = data['email']
    password = data.get('password')

    admin = storage.getLogin(Admin, email)
    if not admin:
        return make_response(jsonify({"Message": "Login failed: Admin not found"}), 401)

    if not check_password_hash(admin.password, password):
        return make_response(jsonify({"Message": "Login failed: Incorrect password"}), 401)
    """Cookie"""
    session_id = secrets.token_hex(32)
    hashed_session_id = hashlib.sha256(session_id.encode()).hexdigest()
    session[hashed_session_id] = admin.id

    response = make_response(jsonify({"Message": "Login sucessful", "admin": admin.to_dict()}), 200)
    response.set_cookie('session_id', session_id, httponly=True, max_age=3600)

    custom_token = secrets.token_hex(32)
    hashed_custom_token = hashlib.sha256(custom_token.encode()).hexdigest()
    response.headers['X-Custom-Token'] = custom_token

    new_session = adminSession(admin_id=admin.id)
    new_session.session_token = hashed_session_id #secrets.token_hex(32)
    new_session.authorization_token = hashed_custom_token
    storage.new(new_session)
    storage.save()


    return response

"""USER"""

@login_views.route("/user/login", strict_slashes=False, methods=["POST"])
def user_login():
    """A post request sent with email and password from the login page
        Handles login for the app
    """
    data = request.get_json() # the request sent from the login page

    if not data or 'email' not in data or 'password' not in data:
        return make_response(jsonify({"error": "Missing data in request"}), 400)

    email = data['email']
    password = data.get('password')

# The data is sorted in the database, using the email and checks the password.
    user = storage.getLogin(User, email)
    if not user:
        return make_response(jsonify({"Message": "Login failed: User not found"}), 401)

    if not check_password_hash(user.password, password):
        return make_response(jsonify({"Message": "Login failed: Incorrect password"}), 401)


    session_id = secrets.token_hex(32)
    hashed_session_id = hashlib.sha256(session_id.encode()).hexdigest()
    session[hashed_session_id] = user.id


    response = make_response(jsonify({"Message": "Login sucessful", "user": user.to_dict()}), 200)
    response.set_cookie('session_id', session_id, httponly=True, max_age=3600)


    custom_token = secrets.token_hex(24)
    hashed_custom_token = hashlib.sha256(custom_token.encode()).hexdigest()
    response.headers['X-Custom-Token'] = custom_token

    new_session = userSession(user_id=user.id)
    new_session.session_token = hashed_session_id #secrets.token_hex(32)
    new_session.authorization_token = hashed_custom_token
    storage.new(new_session)
    storage.save()


    return response

"""AGENT"""

@login_views.route("/agent/login", strict_slashes=False, methods=["POST"])
def agent_login():
    """A post request sent with email and password from the login page
        Handles login for the app
    """
    data = request.get_json() # the request sent from the login page

    if not data or 'email' not in data or 'password' not in data:
        return make_response(jsonify({"error": "Missing data in request"}), 400)

    email = data['email']
    password = data.get('password')


    agt = storage.getLogin(Agent, email)
    if not agt:
        return make_response(jsonify({"Message": "Login failed: Agent not found"}), 401)

    if not check_password_hash(agt.password, password):
        return make_response(jsonify({"Message": "Login failed: Incorrect password"}), 401)


    session_id = secrets.token_hex(32)
    hashed_session_id = hashlib.sha256(session_id.encode()).hexdigest()
    session[hashed_session_id] = agt.id


    response = make_response(jsonify({"Message": "Login sucessful", "agt": agt.to_dict()}), 200)
    response.set_cookie('session_id', session_id, httponly=True, max_age=3600)


    custom_token = secrets.token_hex(24)
    hashed_custom_token = hashlib.sha256(custom_token.encode()).hexdigest()
    response.headers['X-Custom-Token'] = custom_token


    new_session = agentSession(agent_id=agt.id)
    new_session.session_token = hashed_session_id #secrets.token_hex(32)
    new_session.authorization_token = hashed_custom_token
    storage.new(new_session)
    storage.save()

    return response

"""SUPPORT AGENT"""

@login_views.route("/support_agent/login", strict_slashes=False, methods=["POST"])
def support_agent_login():
    """A post request sent with email and password from the login page
        Handles login for the app
    """
    data = request.get_json() # the request sent from the login page

    if not data or 'email' not in data or 'password' not in data:
        return make_response(jsonify({"error": "Missing data in request"}), 400)

    email = data['email']
    password = data.get('password')


    agt = storage.getLogin(supportAgent, email)
    if not agt:
        return make_response(jsonify({"Message": "Login failed: Agent not found"}), 401)

    if not check_password_hash(agt.password, password):
        return make_response(jsonify({"Message": "Login failed: Incorrect password"}), 401)

    session_id = secrets.token_hex(32)
    hashed_session_id = hashlib.sha256(session_id.encode()).hexdigest()
    session[hashed_session_id] = agt.id

    response = make_response(jsonify({"Message": "Login sucessful", "agt": agt.to_dict()}), 200)
    response.set_cookie('session_id', session_id, httponly=True, max_age=3600)

    custom_token = secrets.token_hex(24)
    hashed_custom_token = hashlib.sha256(custom_token.encode()).hexdigest()
    response.headers['X-Custom-Token'] = custom_token

    new_session = Session(support_agent_id=agt.id)
    new_session.session_token = hashed_session_id #secrets.token_hex(32)
    new_session.authorization_token = hashed_custom_token
    storage.new(new_session)
    storage.save()

    return response

