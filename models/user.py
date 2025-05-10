#!/usr/bin/python3
""" holds class User"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, Boolean
from sqlalchemy.orm import relationship


class User(BaseModel, Base):
    """Representation of a user """
    if models.storage_type == 'db':
        __tablename__ = 'users'
        email = Column(String(128), nullable=False)
        password = Column(String(128), nullable=False)
        first_name = Column(String(128), nullable=True)
        last_name = Column(String(128), nullable=True)
        telephone_no = Column(String(64), nullable=False)
        sex = Column(String(64), nullable=False)
        is_verified = Column(Boolean, default=False, nullable=False) 
        reviews = relationship("Review", backref="user")
        ratings = relationship("userRating", backref="user")
        tickets = relationship("Ticket", backref="user")
        favorite_listing = relationship("favoriteListing", backref="user")
        leases = relationship("Lease", backref="user")
    else:
        email = ""
        password = ""
        first_name = ""
        last_name = ""
        telephone_no = ""
        sex = ""
        is_verified = False

    def __init__(self, *args, **kwargs):
        """initializes user"""
        super().__init__(*args, **kwargs)
