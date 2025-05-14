#!usr/bin/python3
"""This is a class containing the agent session details"""
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Table, Integer, DateTime
from sqlalchemy.orm import relationship
import models
from datetime import datetime, timedelta

class agentSession(BaseModel, Base):
    """Represents agent session details"""

    if models.storage_type == 'db':
        __tablename__ = 'agent_sessions'
        agent_id = Column(String(64), ForeignKey('agents.id'), nullable=False)
        session_token = Column(String(128), nullable=False)
        authorization_token = Column(String(128), nullable=False)
        expires_at = Column(DateTime, nullable=False)
        agents = relationship("Agent", backref="agent_sessions")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.expires_at = datetime.utcnow() + timedelta(hours=1)

    @property
    def is_valid(self):
        return self.expires_at > datetime.utcnow()

