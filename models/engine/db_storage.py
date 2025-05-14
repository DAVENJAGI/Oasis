#!/usr/bin/python3
"""
Contains the class DBStorage
"""

import models
from models.amenity import Amenity
from models.base_model import BaseModel, Base
from models.city import City
from models.listing import Listing
from models.review import Review
from models.state import State
from models.user import User
from models.town import Town
from models.agent import Agent
from models.country import Country
from models.favorite_listing import favoriteListing
from models.user_rating import userRating
from models.agent_rating import agentRating
from models.lease import Lease
from models.listing_image import listingImage
from models.support_agent import supportAgent
from models.support_agent_rating import supportAgentRating
from models.support_agent_session import supportAgentSession
from models.user_session import userSession
from models.agent_session import agentSession
from models.admin_session import adminSession
from models.ticket import Ticket
from models.booking import Booking
from models.admin import Admin
from models.report import Report
from models.tag import Tag
from os import getenv
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

classes = {"Amenity": Amenity, "City": City, "supportAgent": supportAgent, "supportAgentRating": supportAgentRating, "supportAgentSession": supportAgentSession, "userSession": userSession, "agentSession": agentSession, "adminSession": adminSession, "agentRating": agentRating, "listingImage": listingImage, "Tag": Tag, "Lease": Lease, "Report": Report, "Town": Town, "Country": Country, "Listing": Listing, "favoriteListing": favoriteListing, "Agent": Agent, "userRating": userRating, "Ticket": Ticket, "Review": Review, "Booking": Booking,  "State": State, "Admin": Admin, "User": User}


class DBStorage:
    """interaacts with the MySQL database"""
    __engine = None
    __session = None

    def __init__(self):
        """Instantiate a DBStorage object"""
        HBNB_MYSQL_USER = getenv('HBNB_MYSQL_USER')
        HBNB_MYSQL_PWD = getenv('HBNB_MYSQL_PWD')
        HBNB_MYSQL_HOST = getenv('HBNB_MYSQL_HOST')
        HBNB_MYSQL_DB = getenv('HBNB_MYSQL_DB')
        HBNB_ENV = getenv('HBNB_ENV')
        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'.
                                      format(HBNB_MYSQL_USER,
                                             HBNB_MYSQL_PWD,
                                             HBNB_MYSQL_HOST,
                                             HBNB_MYSQL_DB))
        if HBNB_ENV == "test":
            Base.metadata.drop_all(self.__engine)

    def all(self, cls=None):
        """query on the current database session"""
        new_dict = {}
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                objs = self.__session.query(classes[clss]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    new_dict[key] = obj
        return (new_dict)

    def new(self, obj):
        """add the object to the current database session"""
        self.__session.add(obj)

    def save(self):
        """commit all changes of the current database session"""
        self.__session.commit()

    def delete(self, obj=None):
        """delete from the current database session obj if not None"""
        if obj is not None:
            self.__session.delete(obj)

    def reload(self):
        """reloads data from the database"""
        Base.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session

    def close(self):
        """call remove() method on the private session attribute"""
        self.__session.remove()

    def get(self, cls, id):
        """A method to retrieve one object"""
        query = self.__session.query(cls).filter(cls.id == id)
        return query.first()

    def count(self, cls=None):
        """counts the number of object in storage"""
        obj = self.all(cls)
        return len(obj)
