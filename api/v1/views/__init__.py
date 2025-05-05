#!/usr/bin/python3
"""Init file for views module"""
from flask import Blueprint


app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')
city_views = Blueprint('city_views', __name__, url_prefix='/api/v1')
state_views = Blueprint('state_views', __name__, url_prefix='/api/v1')
ward_views = Blueprint('ward_views', __name__, url_prefix='/api/v1')
listing_views = Blueprint('listing_views', __name__, url_prefix='/api/v1')
user_views = Blueprint('user_views', __name__, url_prefix='/api/v1')
agent_views = Blueprint('agent_views', __name__, url_prefix='/api/v1')
agent_views = Blueprint('agent_views', __name__, url_prefix='/api/v1')
favorite_views = Blueprint('favorite_views', __name__, url_prefix='/api/v1')
amenity_views = Blueprint('amenity_views', __name__, url_prefix='/api/v1')



from api.v1.views.index import *
from api.v1.views.states import *
from api.v1.views.cities import *
from api.v1.views.amenities import *
from api.v1.views.users import *
from api.v1.views.agents import *
from api.v1.views.places import *
from api.v1.views.places_reviews import *
from api.v1.views.places_amenities import *
