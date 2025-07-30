from app import db
from app.models.base_model import BaseModel
from sqlalchemy.orm import validates

class Review(BaseModel):
    __tablename__ = 'review'

    title =  db.Column(db.String(255), nullable=False)
    text = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False)
    place_id = db.Column(db.String(36), db.ForeignKey('place.id'), nullable=False)

    __table_args__ = (
        db.UniqueConstraint('user_id', 'place_id', name='uq_user_place_review'),
    )

    @validates("rating")
    def validate_rating(self, key, rating):
        if (int(rating) > 0 and int(rating) < 6):
            return rating
        else:
            raise ValueError ("rating must be between 1 and 5")
        
    @validates("title")
    def validate_title(self, key, title):
        title = str(title)
        if(len(title) < 51 and title != ""):
            return title
        else:
            raise ValueError ("Title is not conforme to standar")

    @validates("text")
    def validate_text(self, key, text):
        if (len(text) > 0 and text != ""):       
            return text
        else:
            raise ValueError ("the text must not be empty")

    def to_dict(self):
        return {
            'id': self.id,
            'place': self.place_id,
            'user': self.user_id,
            'title': self.title,
            'rating': self.rating,
            'text': self.text
        }
