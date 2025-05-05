#!usr/bin/python3
"""This is a class containing the appointment details"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Table
from sqlalchemy.orm import relationship

class Ticket(BaseModel, Base):
    """Represents tickets details"""
    if models.storage_type == "db":
        __tablename__ = 'tickets'
        title = Column(String(128), nullable=False)
        description = Column(String(1024), nullable=False)
        category = Column(String(64), nullable=False)
        admin_id = Column(String(64), ForeignKey('admins.id', ondelete="SET NULL"), nullable=True)
        user_id = Column(String(64), ForeignKey('users.id', ondelete="CASCADE"), nullable=True)
        agent_id = Column(String(64), ForeignKey('agents.id', ondelete="CASCADE"), nullable=True)
        ticket_status = Column(String(64), default="Open") 
        priority = Column(String(64), default="Low")

