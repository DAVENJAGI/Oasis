#!/bin/usr/python3
"""
A script for agent rating
"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from datetime import datetime
import models

class agentRating(BaseModel, Base):
    if models.storage_type == 'db':
        __tablename__ = 'agent_reviews'
        agent_id = Column(String(64), ForeignKey('agents.id'), nullable=False)
        user_id = Column(String(64), ForeignKey('users.id'), nullable=False)
        score = Column(Integer, nullable=False, default=0)
        comment = Column(String(1024), nullable=True)

    else:
        agent_id = ""
        user_id = ""
        score = 0
        comment = ""

    def __init__(self, *args, **kwargs):
        """Initializes agentRating"""
        super().__init__(*args, **kwargs)
