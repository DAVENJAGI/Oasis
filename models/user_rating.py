#!/usr/bin/python3
"""
Contains the userRating class
"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey
import models

class userRating(BaseModel, Base):
    """Representation of a user rating"""
    if models.storage_type == 'db':
        __tablename__ = 'user_ratings'
        user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
        score = Column(Integer, nullable=False)
        comment = Column(String(1024), nullable=True)
    else:
        user_id = ""
        score = 0
        comment = ""
    
    def __init__(self, *args, **kwargs):
        """Initializes userRating"""
        super().__init__(*args, **kwargs)

