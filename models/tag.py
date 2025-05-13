#!/usr/bin/python3

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
import models 

class Tag(BaseModel, Base):
    """ A listing tags model """
    if models.storage_type == "db":
        __tablename__ = 'tags'
        name = Column(String(128), nullable=False, unique=True)
        listings = relationship('Listing', secondary='listing_tags', back_populates='tags')

