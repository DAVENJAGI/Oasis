#!/usr/bin/python3
""" A model that handles bookings """
from sqlalchemy import Column, Integer, Date, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .base_model import BaseModel, Base
import models 
from sqlalchemy.types import Enum

booking_status_enum = Enum("Available", "Occupied", "Pending", name="booking_status_enum")

class Booking(BaseModel, Base):
    if models.storage_type == "db":
        __tablename__ = 'bookings'
        user_id = Column(String(64), ForeignKey('users.id'), nullable=False)
        listing_id = Column(String(64), ForeignKey('listings.id'), nullable=False)
        start_date = Column(Date, nullable=False)
        end_date = Column(Date, nullable=False)
        status = Column(booking_status_enum, default='pending') 
        user = relationship('User', back_populates='bookings')
        listing = relationship('Listing', back_populates='bookings')
