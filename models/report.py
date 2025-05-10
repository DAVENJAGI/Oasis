#!/usr/bin/python3
"""
Contains the report class
"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey
import models
from sqlalchemy.orm import relationship

class Report(BaseModel, Base):
    """Representation of a report listing"""
    if models.storage_type == 'db':
        __tablename__ = 'reports'
        user_id = Column(String(64), ForeignKey('users.id'), nullable=True)
        agent_id = Column(String(64), ForeignKey('agents.id'), nullable=True)
        listing_id = Column(String(64), ForeignKey('listings.id'), nullable=False)
        reason = Column(String(1024), nullable=False)
        listing = relationship("Listing", back_populates="reports")
    else:
        user_id = ""
        agent_id = ""
        listing_id = ""
        reason = ""
    
    def __init__(self, *args, **kwargs):
        """Initializes userRating"""
        super().__init__(*args, **kwargs)

