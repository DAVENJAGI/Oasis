#!/bin/usr/python3
"""
A script for listing rating
"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey, DateTime, Float
from datetime import datetime
import models

class listingRating(BaseModel, Base):
    if models.storage_type == "db":
        __tablename__ = 'listing_ratings'
        listing_id = Column(String(60), ForeignKey('listings.id'), nullable=False)
        user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
        score = Column(Float, nullable=False, default=0.0)
        description = Column(String(512), nullable=True)

    else:
        agent_id = ""
        user_id = ""
        score = 0.0
        description = ""

    def __init__(self, *args, **kwargs):
        """Initializes listingRating"""
        super().__init__(*args, **kwargs)

