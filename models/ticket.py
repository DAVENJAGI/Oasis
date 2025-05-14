#!usr/bin/python3
"""This is a class containing the appointment details"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.types import Enum

ticket_category = Enum("App & Account Support", "Lease & Rent", "Move-In & Move-Out",
                       "Complains", "Emergencies", "Property Issues", 
                       "Maintenance & Repairs", name="ticket_category")

ticket_processing_status = Enum("Open", "Closed", "Pending", "On-hold",
                                "Solved", name="ticket_processing_status")
ticket_priority = Enum("Low", "Medium", "High", name="ticket_priority")

class Ticket(BaseModel, Base):
    """Represents tickets details"""
    if models.storage_type == "db":
        __tablename__ = 'tickets'
        title = Column(String(128), nullable=False)
        description = Column(String(1024), nullable=False)
        category = Column(ticket_category, default="App & Account Support")
        admin_id = Column(String(64), ForeignKey('admins.id', ondelete="SET NULL"), nullable=True)
        user_id = Column(String(64), ForeignKey('users.id', ondelete="CASCADE"), nullable=True)
        agent_id = Column(String(64), ForeignKey('agents.id', ondelete="CASCADE"), nullable=True)
        support_agent = Column(String(64), ForeignKey('support_agents.id', ondelete="SET NULL"), nullable=True)
        ticket_status = Column(ticket_processing_status, default="Open") 
        priority = Column(ticket_priority, default="Low")

