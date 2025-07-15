#!/usr/bin/python3
""" holds class town"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Town(BaseModel, Base):
    """Representation of town""" 
    if models.storage_type == "db":
        __tablename__ = 'towns'
        state_id = Column(String(60), ForeignKey('states.id', ondelete="CASCADE"), nullable=False)
        city_id = Column(String(60), ForeignKey('cities.id'), nullable=False) 
        town_name = Column(String(128), nullable=False)
        listings = relationship("Listing", backref="town")
    else:
        state_id = ""
        city_id = ""
        town_name = ""

    def __init__(self, *args, **kwargs):
        """initializes city"""
        super().__init__(*args, **kwargs)
