#!/usr/bin/python3
"""
Contains the report class
"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey
import models
from sqlalchemy.orm import relationship
from sqlalchemy.types import Enum


report_category = Enum("Inappropriate Content", "Fake or Misleading", "Safety Concerns",
                       "Discrimination", "Pricing Issues", "Other",
                    name="report_category")
urgency = Enum("Minor issue", "Moderate concern", "Immediate attention",
                    name="urgency")


class Report(BaseModel, Base):
    """Representation of a report listing"""
    if models.storage_type == 'db':
        __tablename__ = 'reports'
        user_id = Column(String(64), ForeignKey('users.id'), nullable=True)
        agent_id = Column(String(64), ForeignKey('agents.id'), nullable=True)
        listing_id = Column(String(64), ForeignKey('listings.id'), nullable=False)
        reason = Column(String(1024), nullable=False)
        report_category = Column(report_category)
        urgency = Column(urgency)
        evidence = Column(String(256))
        description = Column(String(1024))
        listing = relationship("Listing", back_populates="reports")
    else:
        user_id = ""
        agent_id = ""
        listing_id = ""
        reason = ""
    
    def __init__(self, *args, **kwargs):
        """Initializes listing report"""
        super().__init__(*args, **kwargs)

