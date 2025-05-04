#!/usr/bin/python3
""" holds favoriteProperty"""
import models
from models.base_model import BaseModel, Base
from models.city import City
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class favoriteListing(BaseModel, Base):
    """Representation user's favorite properties"""
    if models.storage_type == "db":
        __tablename__ = 'favorite_listings'
        listing_id = Column(String(64), ForeignKey("listings.id"), nullable=False)
        user_id = Column(String(64), ForeignKey("users.id"), nullable=False)
    else:
        user_id = ""
        listing_id = ""

    def __init__(self, *args, **kwargs):
        """initializes state"""
        super().__init__(*args, **kwargs)
