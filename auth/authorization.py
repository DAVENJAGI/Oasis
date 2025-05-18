#!/usr/bin/python3
"""Creates the authentication functions.
They act as authenticatiors for the function. They incude cookie session token and authorization token. Cookie session token expires after one hour. The hashlib hashes the session token to store it in the server"""

from api.v1.views import app_views
from flask import jsonify, Blueprint, abort, request, make_response, session
from models import storage
from models.user import User
from models.user_session import userSession
from models.admin_session import adminSession
from models.agent_session import agentSession
from models.support_agent_session import supportAgentSession
import json
from datetime import datetime

from functools import wraps
import secrets
import hashlib


def require_user_auth(f):
    '''ensure's the endpoint  is authorized by auth_header for the user and has a valid session_id'''
    @wraps(f)
    def dec_func(*args, **kwargs):
        '''auth header checking'''
        auth_token = request.headers.get('X-Custom-Token')
        if not auth_token or len(auth_token) != 48:
            return make_response(jsonify({"Message": "Sorry, you do not have the valid authorization to perform the operation"}), 403)


        hashed_auth_token = hashlib.sha256(auth_token.encode()).hexdigest()
        user_session = storage.get_session(userSession, hashed_auth_token)
        if not user_session:
            return make_response(jsonify({"Message": "Invalid session"}), 401)
        if user_session.expires_at <= datetime.utcnow():
            return make_response(jsonify({"Message": "Expired session. Log in to continue"}), 401)
        if user_session.authorization_token != hashed_auth_token:
            return make_response(jsonify({"Message": "The Authentication token doesn't match the one generated for the session"}), 401) 

        return f(*args, **kwargs)
    return dec_func


def require_admin_auth(f):
    '''ensure's the endpoint  is authorized by auth_header for the admin and has a valid session_id'''
    @wraps(f)
    def dec_func(*args, **kwargs):
        '''auth header checking'''
        auth_token = request.headers.get('X-Custom-Token')
        print(f"received admin auth_token: {auth_token}")
        if not auth_token or len(auth_token) != 64:
            return make_response(jsonify({"Message": "Sorry, you do not have the valid authorization to perform the operation"}), 403)
        
        hashed_auth_token = hashlib.sha256(auth_token.encode()).hexdigest()

        admin_session = storage.get_session(adminSession, hashed_auth_token)
        if not admin_session:
            return make_response(jsonify({"Message": "Invalid session"}), 401)
#       print(user_session)
        if admin_session.expires_at <= datetime.utcnow():
            return make_response(jsonify({"Message": "Expired session. Log in to continue"}), 401)
        if admin_session.authorization_token != hashed_auth_token:
            return make_response(jsonify({"Message": "The Authentication token doesn't match the one generated for the session"}), 401)

        return f(*args, **kwargs)
    return dec_func

def require_agent_auth(f):
    '''ensure's the endpoint  is authorized by auth_header for the agent and has a valid session_id'''
    @wraps(f)
    def dec_func(*args, **kwargs):
        '''auth header checking'''
        auth_token = request.headers.get('X-Custom-Token')
        print(f"received auth_token: {auth_token}")
        if not auth_token or len(auth_token) != 48:
            return make_response(jsonify({"Message": "Sorry, you do not have the valid authorization to perform the operation"}), 403)

        hashed_auth_token = hashlib.sha256(auth_token.encode()).hexdigest()
        dkt_session = storage.get_session(agentSession, hashed_auth_token)
        if not dkt_session:
            return make_response(jsonify({"Message": "Invalid session"}), 401)
#       print(user_session)
        if dkt.authorization_token != hashed_auth_token:
            return make_response(jsonify({"Message": "The authorization token does not match"}), 401)
        if dkt_session.expires_at <= datetime.utcnow():
            return make_response(jsonify({"Message": "Expired session. Log in to continue"}), 401)
        
        return f(*args, **kwargs)
    return dec_func


def require_support_agent_auth(f):
    '''ensure's the endpoint  is authorized by auth_header for the support_agent and has a valid session_id'''
    @wraps(f)
    def dec_func(*args, **kwargs):
        '''auth header checking'''
        auth_token = request.headers.get('X-Custom-Token')
        if not auth_token or len(auth_token) != 48:
            return make_response(jsonify({"Message": "Sorry, you do not have the valid authorization to perform the operation"}), 403)


        hashed_auth_token = hashlib.sha256(auth_token.encode()).hexdigest()
        support_agent_session = storage.get_session(supportAgentSession, hashed_auth_token)
        if not support_agent_session:
            return make_response(jsonify({"Message": "Invalid session"}), 401)
        if support_agent_session.expires_at <= datetime.utcnow():
            return make_response(jsonify({"Message": "Expired session. Log in to continue"}), 401)
        if support_agent_session.authorization_token != hashed_auth_token:
            return make_response(jsonify({"Message": "The Authentication token doesn't match the one generated for the session"}), 401)

        return f(*args, **kwargs)
    return dec_func


# HANDLES SECURITY FOR ENDPOINTS THAT ENSURE DATA BETWEEN ADMIN, DOCTOR, USER
def verify_user_session(auth_token):
    hashed_auth_token = hashlib.sha256(auth_token.encode()).hexdigest()
    user_session = storage.get_session(userSession, hashed_auth_token)
    if not user_session or user_session.expires_at <= datetime.utcnow() or user_session.authorization_token != hashed_auth_token:
        return False
    return True

def verify_admin_session(auth_token):
    hashed_auth_token = hashlib.sha256(auth_token.encode()).hexdigest()
    admin_session = storage.get_session(adminSession, hashed_auth_token)
    if not admin_session or admin_session.expires_at <= datetime.utcnow() or admin_session.authorization_token != hashed_auth_token:
        return False
    return True

def verify_agent_session(auth_token):
    hashed_auth_token = hashlib.sha256(auth_token.encode()).hexdigest()
    dkt_session = storage.get_session(agentSession, hashed_auth_token)
    if not dkt_session or dkt_session.expires_at <= datetime.utcnow() or dkt_session.authorization_token != hashed_auth_token:
        return False
    return True

def verify_support_agent_session(auth_token):
    hashed_auth_token = hashlib.sha256(auth_token.encode()).hexdigest()
    support_agent_session = storage.get_session(supportAgentSession, hashed_auth_token)
    if not support_agent_session or support_agent_session.expires_at <= datetime.utcnow() or support_agent_session.authorization_token != hashed_auth_token:
        return False
    return True



def require_user_or_admin_auth(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth_token = request.headers.get('X-Custom-Token')
        session_id = request.cookies.get('session_id')
        hashed_auth_token = hashlib.sha256(auth_token.encode()).hexdigest()

        if not auth_token:
            return make_response(jsonify({"Message": "Missing credentials"}), 403)

        if verify_user_session(auth_token) or verify_admin_session(auth_token):
            return f(*args, **kwargs)

        return make_response(jsonify({"Message": "Sorry, you do not have valid authorization to access this data"}), 401)
    return wrapper


def require_agent_or_admin_auth(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth_token = request.headers.get('X-Custom-Token')
        session_id = request.cookies.get('session_id')

        if not auth_token:
            return make_response(jsonify({"Message": "Sorry, you do not have valid authorization to access this data"}), 403)

        if verify_agent_session(auth_token) or verify_admin_session(auth_token):
            return f(*args, **kwargs)

        return make_response(jsonify({"Message": "Sorry, you do not have valid authorization to access this data"}), 401)
    return wrapper


def require_agent_or_admin_or_user_auth(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth_token = request.headers.get('X-Custom-Token')
#        session_id = request.cookies.get('session_id')

        if not auth_token:
            return make_response(jsonify({"Message": "Sorry, you do not have valid authorization to access this data"}), 403)

        if verify_agent_session(auth_token) or verify_user_session(auth_token) or verify_admin_session(auth_token):
            return f(*args, **kwargs)


        return make_response(jsonify({"Message": "Sorry, you do not have valid authorization to access this data"}), 401)
    return wrapper


def require_support_agent_or_admin_or_user_auth(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth_token = request.headers.get('X-Custom-Token')
#        session_id = request.cookies.get('session_id')

        if not auth_token:
            return make_response(jsonify({"Message": "Sorry, you do not have valid authorization to access this data"}), 403)

        if verify_support_agent_session(auth_token) or verify_user_session(auth_token) or verify_admin_session(auth_token):
            return f(*args, **kwargs)


        return make_response(jsonify({"Message": "Sorry, you do not have valid authorization to access this data"}), 401)
    return wrapper

def require_support_agent_or_admin_or_agent_auth(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth_token = request.headers.get('X-Custom-Token')
#        session_id = request.cookies.get('session_id')

        if not auth_token:
            return make_response(jsonify({"Message": "Sorry, you do not have valid authorization to access this data"}), 403)

        if verify_support_agent_session(auth_token) or verify_agent_session(auth_token) or verify_admin_session(auth_token):
            return f(*args, **kwargs)


        return make_response(jsonify({"Message": "Sorry, you do not have valid authorization to access this data"}), 401)
    return wrapper

def require_support_agent_or_admin_auth(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth_token = request.headers.get('X-Custom-Token')
#        session_id = request.cookies.get('session_id')

        if not auth_token:
            return make_response(jsonify({"Message": "Sorry, you do not have valid authorization to access this data"}), 403)

        if verify_support_agent_session(auth_token) or verify_admin_session(auth_token):
            return f(*args, **kwargs)


        return make_response(jsonify({"Message": "Sorry, you do not have valid authorization to access this data"}), 401)
    return wrapper

