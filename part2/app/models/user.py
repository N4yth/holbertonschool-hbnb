#!/usr/bin/python3

import re
from .base_model import BaseModel

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')

class User(BaseModel):
    __slots__ = ('_first_name', '_last_name', '_email', '_is_admin', '_password')

    def __init__(self, first_name: str, last_name: str, email: str, password: str, is_admin: bool = False):
        super().__init__()
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password
        self.is_admin = is_admin

    def _validate_name(self, value: str, field: str):
        if not isinstance(value, str) or not value or len(value) > 50:
            raise ValueError(f'{field} must be a non-empty string with 50 characters or less')

    @property
    def first_name(self):
        return self._first_name

    @first_name.setter
    def first_name(self, value):
        self._validate_name(value, 'first_name')
        self._first_name = value

    @property
    def last_name(self):
        return self._last_name

    @last_name.setter
    def last_name(self, value):
        self._validate_name(value, 'last_name')
        self._last_name = value

    @property
    def email(self):
        return self._email

    @email.setter
    def email(self, value):
        if not isinstance(value, str) or not EMAIL_REGEX.fullmatch(value):
            raise ValueError('please enter a valid email address')
        self._email = value
        
    @property
    def password(self):
        return self._password

    @password.setter
    def password(self, value):
        """Set the password with basic validation."""
        if not isinstance(value, str) or not value:
            raise TypeError("Password must be a non-empty string.")
        if len(value) < 8:
            raise ValueError("Password must be at least 8 characters long.")
        
        self._password = value


    @property
    def is_admin(self):
        return self._is_admin

    @is_admin.setter
    def is_admin(self, value):
        if not isinstance(value, bool):
            raise TypeError('is_admin must be a boolean')
        self._is_admin = value

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'is_admin': self.is_admin
        }
