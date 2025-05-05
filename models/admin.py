#!usr/bin/python3
"""This is a class containing the admin details"""
from models.base_model import BaseModel, Base
import models
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Table
from sqlalchemy.orm import relationship


class Admin(BaseModel, Base):
    """Represents admin details"""
    if models.storage_type == 'db':
        __tablename__ = 'admins'
        email = Column(String(128), unique=True, nullable=False)
        password = Column(String(128), nullable=False)
        first_name = Column(String(128), nullable=False)
        last_name = Column(String(128), nullable=False)

    else:
        email = ""
        password = ""
        first_name = ""
        last_name = ""
