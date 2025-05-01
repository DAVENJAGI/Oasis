#!/usr/bin/python3
""" holds leasing info"""
import models
from models.base_model import BaseModel, Base
from models.city import City
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Integer, Float
from sqlalchemy.orm import relationship


class Lease(BaseModel, Base):
    """Representation property lease"""
    if models.storage_t == "db":
        __tablename__ = 'lease_agreements'
        listing_id = Column(String(64), ForeignKey("listings.id"), nullable=False)
        lessee_id = Column(String(64), ForeignKey("users.id"), nullable=False)
        lessor_id = Column(String(64), ForeignKey("agents.id"), nullable=False)
        start_date = Column(Date, nullable=False)
        stop_date = Column(Date, nullable=False)
        payment_per_night = Column(Float, default=0, nullable=False)
        status = Column(Enum("pending", "active", "terminated", name="lease_status_enum"), default="pending")
    else:
        user_id = ""
        listing_id = ""
        lessee_id = ""
        lessor_id = ""
        start_date = ""
        stop_date = ""
        payment_per_night = 0.0

    def __init__(self, *args, **kwargs):
        """initializes state"""
        super().__init__(*args, **kwargs)
