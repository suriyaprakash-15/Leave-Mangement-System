-- Create the database
CREATE DATABASE leavemanagement;

-- Connect to the database
\c leavemanagement;

-- Create the role enum type
CREATE TYPE role_enum AS ENUM ('employee', 'manager', 'hr', 'ceo', 'consultant');

-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    google_id VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(500),
    role role_enum DEFAULT 'employee',
    manager_id INTEGER REFERENCES users(id),
    join_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Grant permissions (if using a specific user)
-- GRANT ALL PRIVILEGES ON DATABASE leavemanagement TO your_username;
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_username; 