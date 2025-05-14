#!/usr/bin/python3
""" holds class agents"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, Boolean
from sqlalchemy.orm import relationship


class supportAgent(BaseModel, Base):
    """Representation of support agent"""
    if models.storage_type == 'db':
        __tablename__ = 'support_agents'
        email = Column(String(128), nullable=False)
        password = Column(String(128), nullable=False)
        first_name = Column(String(128), nullable=True)
        last_name = Column(String(128), nullable=True)
        telephone_no = Column(String(64), nullable=False)
        tickets = relationship("Ticket", backref="support_agents")
    else:
        email = ""
        password = ""
        first_name = ""
        last_name = ""
        telephone_no = ""
    def __init__(self, *args, **kwargs):
        """initializes support agent"""
        super().__init__(*args, **kwargs)
