#!/usr/bin/python3
""" holds class agents"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, Boolean
from sqlalchemy.orm import relationship


class Agent(BaseModel, Base):
    """Representation of an agent"""
    if models.storage_type == 'db':
        __tablename__ = 'agents'
        email = Column(String(128), nullable=False)
        password = Column(String(128), nullable=False)
        first_name = Column(String(128), nullable=True)
        last_name = Column(String(128), nullable=True)
        telephone_no = Column(String(64), nullable=False)
        sex = Column(String(64), nullable=False)
        bio = Column(String(1024), nullable=False)
        is_verified = Column(Boolean, default=False, nullable=False)
        listings = relationship("Listing", backref="agent")
        ratings = relationship("agentRating", backref="agent")
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
