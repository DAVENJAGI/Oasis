#!/usr/bin/python3

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
import models

class listingImage(BaseModel, Base):
    if models.storage_type == "db":
        __tablename__ = 'listing_images'
        listing_id = Column(String(64), ForeignKey('listings.id'), nullable=False)
        file_path = Column(String(512), nullable=False)
        caption = Column(String(256), nullable=True)
        listing = relationship("Listing", back_populates="images")

