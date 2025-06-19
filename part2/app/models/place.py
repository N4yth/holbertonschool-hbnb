#!/usr/bin/python3

from app.models.base_model import BaseModel
from .user import User


class Place(BaseModel):
    def __init__(self, title, description, price, latitude, longitude, owner_id):
        """Initialize a new Place instance with proper validation."""
        super().__init__()
        self.title = title
        self.description = description
        self.price = price
        self.latitude = latitude
        self.longitude = longitude
        self.owner_id = owner_id
        self._reviews = []
        self._amenities = []

    @property
    def title(self):
        return self._title

    @title.setter
    def title(self, value):
        if not isinstance(value, str) or not value.strip():
            raise TypeError("title must be a non-empty string")
        if len(value) > 100:
            raise ValueError("title must be 100 characters or less")
        self._title = value.strip()

    @property
    def description(self):
        return self._description

    @description.setter
    def description(self, value):
        if not isinstance(value, str):
            raise TypeError("description must be a string")
        self._description = value.strip()

    @property
    def price(self):
        return self._price

    @price.setter
    def price(self, value):
        if not isinstance(value, float):
            raise TypeError("price must be a float")
        if value < 0:
            raise ValueError("price must be a positive float")
        self._price = value

    @property
    def latitude(self):
        return self._latitude

    @latitude.setter
    def latitude(self, value):
        if not isinstance(value, float):
            raise TypeError("latitude must be a float")
        if not -90.0 <= value <= 90.0:
            raise ValueError("latitude must be between -90 and 90")
        self._latitude = value

    @property
    def longitude(self):
        return self._longitude

    @longitude.setter
    def longitude(self, value):
        if not isinstance(value, float):
            raise TypeError("longitude must be a float")
        if not -180.0 <= value <= 180.0:
            raise ValueError("longitude must be between -180 and 180")
        self._longitude = value

    @property
    def owner_id(self):
        return self._owner_id

    @owner_id.setter
    def owner_id(self, value):
        if not isinstance(value, str) or not value.strip():
            raise TypeError("owner_id must be a non-empty string")
        self._owner_id = value.strip()

    def add_review(self, review):
        """Attach a review to the place."""
        if review:
            self._reviews.append(review)
            self.save()

    def add_amenity(self, amenity):
        """Attach an amenity to the place."""
        if amenity:
            self._amenities.append(amenity)
            self.save()
            
    def validate(self):
        if self._latitude is None or not isinstance(self._latitude, float):
            raise TypeError('latitude must be a float')
        if self._latitude < -90.0 or self._latitude > 90.0:
            raise ValueError('latitude must be between -90 and 90')
        
        if self._longitude is None or not isinstance(self._longitude, float):
            raise TypeError('longitude must be a float')
        if self._longitude < -180.0 or self._longitude > 180.0:
            raise ValueError('longitude must be between -180 and 180')
        
        if self._owner_id == "" or not isinstance(self._owner_id, str):
            raise TypeError('owner must be a string')
        
        if self._price is None or not isinstance(self._price, float):
            raise TypeError('price must be a float')
        if self._price < 0:
            raise ValueError('price must be a positive float')
        
        if self._description is None or not isinstance(self._description, str):
            raise TypeError('description must be a non-empty string')
        
        if self._title is None or not isinstance(self._title, str):
            raise TypeError('title must be a non-empty string')
        if not self._title or len(self._title) > 100:
            raise ValueError('title must 100 characters or less')
        return
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'owner_id': self.owner_id,
            "description": self.description,
            'price': self.price,
            'latitude': self.latitude,
            "longitude": self.longitude,
            "_reviews": self._reviews,
            "_amenities": self._amenities
        }
