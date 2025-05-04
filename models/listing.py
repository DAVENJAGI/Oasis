#!/usr/bin/python
""" holds the class listing"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, Integer, Float, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.types import Enum

if models.storage_type == 'db':
    place_amenity = Table('listing_amenity', Base.metadata,
                          Column('listing_id', String(60),
                                 ForeignKey('listings.id', onupdate='CASCADE',
                                            ondelete='CASCADE'),
                                 primary_key=True),
                          Column('amenity_id', String(60),
                                 ForeignKey('amenities.id', onupdate='CASCADE',
                                            ondelete='CASCADE'),
                                 primary_key=True))


class Listing(BaseModel, Base):
    """Representation of apartments """
    if models.storage_type == 'db':
        __tablename__ = 'listings'
        town_id = Column(String(64), ForeignKey('towns.id'), nullable=False)
        owner_id = Column(String(64), ForeignKey('users.id'), nullable=False)
        property_name = Column(String(128), nullable=False)
        description = Column(String(1024), nullable=True)
        number_rooms = Column(Integer, nullable=False, default=0)
        number_bathrooms = Column(Integer, nullable=False, default=0)
        max_guest = Column(Integer, nullable=False, default=0)
        price_by_night = Column(Integer, nullable=False, default=0)
        address = Column(String(64), nullable=False)
        rental_status = Column(String(64), Enum("Available", "Occupied","Pending", name="rental_status_enum"))
        property_type = Column(String(64), Enum("Condo", "Studio Apartment", "Apartments", "Bungalow", "Maisonette", "Townhouse", "Cottage", "Cabin", "Single Room", name="property_type_enum"), nullable=False)
        latitude = Column(Float, nullable=True)
        longitude = Column(Float, nullable=True)
        cover_image = Column(String(256), nullable=True)
        total_area = Column(String(256), nullable=True)
        favorited_by = relationship("favoriteListing", backref="listing")
        reviews = relationship("Review", backref="listing")
        amenities = relationship("Amenity", secondary="listing_amenity",
                                 backref="listing_amenities",
                                 viewonly=False)
    else:
        city_id = ""
        owner_id = ""
        name = ""
        description = ""
        number_rooms = 0
        number_bathrooms = 0
        max_guest = 0
        property_name = ""
        address = ""
        rental_status = ""
        property_type = ""
        price_by_night = 0
        latitude = 0.0
        longitude = 0.0
        amenity_ids = []

    def __init__(self, *args, **kwargs):
        """initializes Place"""
        super().__init__(*args, **kwargs)

    if models.storage_type != 'db':
        @property
        def reviews(self):
            """getter attribute returns the list of Review instances"""
            from models.review import Review
            review_list = []
            all_reviews = models.storage.all(Review)
            for review in all_reviews.values():
                if review.listing_id == self.id:
                    review_list.append(review)
            return review_list

        @property
        def amenities(self):
            """getter attribute returns the list of Amenity instances"""
            from models.amenity import Amenity
            amenity_list = []
            all_amenities = models.storage.all(Amenity)
            for amenity in all_amenities.values():
                if amenity.place_id == self.id:
                    amenity_list.append(amenity)
            return amenity_list
  
