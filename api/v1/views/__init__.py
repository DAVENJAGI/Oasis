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
favorite_views = Blueprint('favorite_views', __name__, url_prefix='/api/v1')
amenity_views = Blueprint('amenity_views', __name__, url_prefix='/api/v1')
location_views = Blueprint('location_views', __name__, url_prefix='/api/v1')
ticket_views = Blueprint('ticket_views', __name__, url_prefix='/api/v1')
admin_views = Blueprint('admin_views', __name__, url_prefix='/api/v1')
lease_views = Blueprint('lease_views', __name__, url_prefix='/api/v1')
review_views = Blueprint('review_views', __name__, url_prefix='/api/v1')
report_views = Blueprint('report_views', __name__, url_prefix='/api/v1')
recommendation_views = Blueprint('recommendation_views', __name__, url_prefix='/api/v1')
tag_views = Blueprint('tag_views', __name__, url_prefix='/api/v1')
support_agent_views = Blueprint('support_agent_views', __name__, url_prefix='/api/v1/')
login_views = Blueprint('login_views', __name__, url_prefix='/api/v1/')

from api.v1.views.index import *
from api.v1.views.states import *
from api.v1.views.countries import *
from api.v1.views.reviews import *
from api.v1.views.reports import *
from api.v1.views.admins import *
from api.v1.views.leases import *
from api.v1.views.cities import *
from api.v1.views.amenities import *
from api.v1.views.users import *
from api.v1.views.agents import *
from api.v1.views.listings import *
from api.v1.views.tickets import *
from api.v1.views.places_reviews import *
from api.v1.views.places_amenities import *
from api.v1.views.recommendation import *
from api.v1.views.tags import *
from api.v1.views.support_agents import *
from api.v1.views.login import *
