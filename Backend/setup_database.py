import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from config import Config

def create_database():
    """Create the database if it doesn't exist"""
    try:
        # Connect to PostgreSQL server (not to a specific database)
        conn = psycopg2.connect(
            host="localhost",
            user="postgres",
            password="password",  # Change this to your actual password
            port="5432"
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()
        
        # Check if database exists
        cursor.execute("SELECT 1 FROM pg_catalog.pg_database WHERE datname = 'leavemanagement'")
        exists = cursor.fetchone()
        
        if not exists:
            cursor.execute('CREATE DATABASE leavemanagement')
            print("Database 'leavemanagement' created successfully!")
        else:
            print("Database 'leavemanagement' already exists!")
        
        cursor.close()
        conn.close()
        
    except Exception as e:
        print(f"Error creating database: {e}")
        print("Please make sure PostgreSQL is running and you have the correct credentials.")

if __name__ == "__main__":
    create_database() 