from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import ENUM
from datetime import datetime

db = SQLAlchemy()

roles = ('employee', 'manager', 'hr', 'ceo', 'consultant')

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    google_id = db.Column(db.String(255), unique=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    profile_picture = db.Column(db.String(500))
    role = db.Column(ENUM(*roles, name='role_enum'), default='employee')
    manager_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    join_date = db.Column(db.Date, nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow) 