from app import app, db
from models import User, LeaveRequest, LeavePolicy, DataMigration

def create_tables():
    """Create all database tables"""
    with app.app_context():
        try:
            # Create all tables
            db.create_all()
            print("Database tables created successfully!")
            
            # Verify the users table exists
            from sqlalchemy import inspect
            inspector = inspect(db.engine)
            tables = inspector.get_table_names()
            print(f"Available tables: {tables}")
            
        except Exception as e:
            print(f"Error creating tables: {e}")

if __name__ == "__main__":
    create_tables() 