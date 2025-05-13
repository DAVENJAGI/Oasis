#!/usr/bin/python3
"""
Contains class BaseModel
"""

from datetime import datetime
import models
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
import uuid

time = "%Y-%m-%dT%H:%M:%S.%f"

if models.storage_type == "db":
    Base = declarative_base()
else:
    Base = object


class BaseModel:
    """The BaseModel class from which future classes will be derived"""
    if models.storage_type == "db":
        id = Column(String(60), primary_key=True)
        created_at = Column(DateTime, default=datetime.utcnow)
        updated_at = Column(DateTime, default=datetime.utcnow)

    def __init__(self, *args, **kwargs):
        """Initialization of the base model"""
        if kwargs:
            for key, value in kwargs.items():
                if key != "__class__":
                    setattr(self, key, value)
            if kwargs.get("created_at", None) and type(self.created_at) is str:
                self.created_at = datetime.strptime(kwargs["created_at"], time)
            else:
                self.created_at = datetime.utcnow()
            if kwargs.get("updated_at", None) and type(self.updated_at) is str:
                self.updated_at = datetime.strptime(kwargs["updated_at"], time)
            else:
                self.updated_at = datetime.utcnow()
            if kwargs.get("id", None) is None:
#                self.id = str(uuid.uuid4())
                uid = str(uuid.uuid4())
                if self.__class__.__name__ == "User":
                    self.id = f"usr_{uid}"
                elif self.__class__.__name__ == "State":
                    self.id = f"stat_{uid}"
                elif self.__class__.__name__ == "City":
                    self.id = f"cty_{uid}"
                elif self.__class__.__name__ == "Agent":
                    self.id = f"agt_{uid}"
                elif self.__class__.__name__ == "Listing":
                    self.id = f"lst_{uid}"
                elif self.__class__.__name__ == "Amenity":
                    self.id = f"amn_{uid}"
                elif self.__class__.__name__ == "Lease":
                    self.id = f"lea_{uid}"
                elif self.__class__.__name__ == "Comment":
                    self.id = f"com_{uid}"
                elif self.__class__.__name__ == "Ticket":
                    self.id = f"tic_{uid}"
                elif self.__class__.__name__ == "userRating":
                    self.id = f"usr_rat_{uid}"
                elif self.__class__.__name__ == "agentRating":
                    self.id = f"agt_rat_{uid}"
                elif self.__class__.__name__ == "Country":
                    self.id = f"ctry_{uid}"
                elif self.__class__.__name__ == "listingImage":
                    self.id = f"img_{uid}"
                elif self.__class__.__name__ == "Admin":
                    self.id = f"adm_{uid}"
                elif self.__class__.__name__ == "Tag":
                    self.id = f"tag_{uid}"
                elif self.__class__.__name__ == "Booking":
                    self.id = f"book_{uid}"
                else:
                    self.id = uid
        else:
            self.id = str(uuid.uuid4())
            self.created_at = datetime.utcnow()
            self.updated_at = self.created_at

    def __str__(self):
        """String representation of the BaseModel class"""
        return "[{:s}] ({:s}) {}".format(self.__class__.__name__, self.id,
                                         self.__dict__)

    def save(self):
        """updates the attribute 'updated_at' with the current datetime"""
        self.updated_at = datetime.utcnow()
        models.storage.new(self)
        models.storage.save()

    def to_dict(self):
        """returns a dictionary containing all keys/values of the instance"""
        new_dict = self.__dict__.copy()
        if "created_at" in new_dict:
            new_dict["created_at"] = new_dict["created_at"].strftime(time)
        if "updated_at" in new_dict:
            new_dict["updated_at"] = new_dict["updated_at"].strftime(time)
        new_dict["__class__"] = self.__class__.__name__
        if "_sa_instance_state" in new_dict:
            del new_dict["_sa_instance_state"]
        if "password" in new_dict:
            del new_dict["password"]
        return new_dict

    def delete(self):
        """delete the current instance from the storage"""
        models.storage.delete(self)
