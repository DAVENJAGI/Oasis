#!/usr/bin/python3

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
import models

class apiKey(BaseModel, Base):
    if models.storage_type == "db":
        __tablename__ = 'api_keys'
        api_key = Column(String(256), nullable=True)
        description = Column(String(256), nullable=False)
