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

leave_types = ('casual', 'medical', 'permission')
leave_statuses = ('pending', 'approved', 'rejected')

class LeaveRequest(db.Model):
    __tablename__ = 'leave_requests'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    leave_type = db.Column(ENUM(*leave_types, name='leave_type_enum'))
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    permission_hours = db.Column(db.Numeric(4,2))
    total_days = db.Column(db.Numeric(4,2))
    reason = db.Column(db.Text, nullable=False)
    medical_certificate = db.Column(db.String(500))
    status = db.Column(ENUM(*leave_statuses, name='leave_status_enum'), default='pending')
    manager_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    manager_comments = db.Column(db.Text)
    approved_at = db.Column(db.DateTime)
    applied_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

class LeavePolicy(db.Model):
    __tablename__ = 'leave_policies'
    id = db.Column(db.Integer, primary_key=True)
    policy_year = db.Column(db.Integer, nullable=False)
    casual_leave_days = db.Column(db.Integer, default=15)
    medical_leave_days = db.Column(db.Integer, default=15)
    casual_carryforward_limit = db.Column(db.Integer, default=7)
    permission_requests_per_month = db.Column(db.Integer, default=1)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class DataMigration(db.Model):
    __tablename__ = 'data_migration'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    casual_used_imported = db.Column(db.Integer, default=0)
    medical_used_imported = db.Column(db.Integer, default=0)
    permissions_used_imported = db.Column(db.Integer, default=0)
    migration_date = db.Column(db.DateTime, default=datetime.utcnow)
    migrated_by = db.Column(db.Integer, db.ForeignKey('users.id')) 