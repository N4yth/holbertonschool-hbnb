#!/usr/bin/python3

from datetime import datetime
from app.models.base_model import BaseModel

class Amenity(BaseModel):
    __slots__ = ('_name', '_description', '_created_at', '_updated_at')

    def __init__(self, name: str, description: str):
        """Initialize a new Amenity instance."""
        super().__init__()
        self.name = name
        self.description = description
        self._created_at: datetime = datetime.utcnow()
        self._updated_at: datetime = self._created_at

    def _validate_str(self, value: str, field: str, max_length: int = None):
        """Validate that value is a non-empty string with an optional max length."""
        if not isinstance(value, str) or not value.strip():
            raise TypeError(f"{field} must be a non-empty string.")
        if max_length and len(value) > max_length:
            raise ValueError(f"{field} must be {max_length} characters or less.")

    @property
    def name(self) -> str:
        return self._name

    @name.setter
    def name(self, value: str):
        self._validate_str(value, "Amenity name", max_length=50)
        self._name = value.strip()
        self._updated_at = datetime.utcnow()

    @property
    def description(self) -> str:
        return self._description

    @description.setter
    def description(self, value: str):
        self._validate_str(value, "Amenity description", max_length=255)
        self._description = value.strip()
        self._updated_at = datetime.utcnow()

    def create_amenity(self) -> None:
        """Create a new amenity (logic to persist in DB can be added)."""
        self._created_at = datetime.utcnow()
        self._updated_at = self._created_at
        self.save()

    def update_amenity(self, **kwargs) -> None:
        """Update amenity attributes dynamically."""
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)
        self._updated_at = datetime.utcnow()
        self.save()

    def delete_amenity(self) -> None:
        """Delete the amenity (logic to remove from DB can be added)."""
        del self
