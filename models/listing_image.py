from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

class listingImage(BaseModel, Base):
    __tablename__ = 'listing_images'

    listing_id = Column(String(60), ForeignKey('listings.id'), nullable=False)
    file_path = Column(String(255), nullable=False)
    listing = relationship("Listing", back_populates="images")

