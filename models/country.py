#!/usr/bin/python3
""" holds class country"""
import models
from models.base_model import BaseModel, Base
from models.city import City
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Country(BaseModel, Base):
    """Representation of state """
    if models.storage_type == "db":
        __tablename__ = 'countries'
        name = Column(String(128), nullable=False)
        states = relationship("State", backref="country")
    else:
        name = ""

    def __init__(self, *args, **kwargs):
        """initializes state"""
        super().__init__(*args, **kwargs)

    if models.storage_type != "db":
        @property
        def states(self):
            """getter for list of city instances related to the state"""
            state_list = []
            all_states = models.storage.all(State)
            for state in all_states.values():
                if state.country_id == self.id:
                    state_list.append(state)
            return state_list
