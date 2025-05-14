#!/bin/usr/python3
"""
A script for agent rating
"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, Float, Integer, ForeignKey, DateTime, String
from datetime import datetime
import models

class supportAgentRating(BaseModel, Base):
    if models.storage_type == 'db':
        __tablename__ = 'support_agent_ratings'
        agent_id = Column(String(64), ForeignKey('agents.id'), nullable=True)
        user_id = Column(String(64), ForeignKey('users.id'), nullable=True)
        satisfaction = Column(Float, nullable=False, default=0.0)
        comment = Column(String(1024), nullable=True)

    else:
        agent_id = ""
        user_id = ""
        score = 0
        comment = ""

    def __init__(self, *args, **kwargs):
        """Initializes suppertAgentRating"""
        super().__init__(*args, **kwargs)
