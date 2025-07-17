-- Create the database
-- CREATE DATABASE leavemanagement;

-- Connect to the database
-- \c leavemanagement;

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

-- Create the leave_policies table
CREATE TABLE leave_policies (
    id SERIAL PRIMARY KEY,
    policy_year INTEGER NOT NULL,
    casual_leave_days INTEGER DEFAULT 15,
    medical_leave_days INTEGER DEFAULT 15,
    casual_carryforward_limit INTEGER DEFAULT 7,
    permission_requests_per_month INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the leave_type enum type
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'leave_type_enum') THEN
        CREATE TYPE leave_type_enum AS ENUM ('casual', 'medical', 'permission');
    END IF;
END $$;

-- Create the leave_status enum type
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'leave_status_enum') THEN
        CREATE TYPE leave_status_enum AS ENUM ('pending', 'approved', 'rejected');
    END IF;
END $$;

-- Create the leave_requests table
CREATE TABLE leave_requests (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    leave_type leave_type_enum NOT NULL,
    start_date DATE,
    end_date DATE,
    permission_hours DECIMAL(4,2), -- For permission requests
    total_days DECIMAL(4,2),
    reason TEXT NOT NULL,
    medical_certificate VARCHAR(500), -- File path for medical docs
    status leave_status_enum DEFAULT 'pending',
    manager_id INTEGER REFERENCES users(id),
    manager_comments TEXT,
    approved_at TIMESTAMP,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the data_migration table
CREATE TABLE data_migration (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    casual_used_imported INTEGER DEFAULT 0,
    medical_used_imported INTEGER DEFAULT 0,
    permissions_used_imported INTEGER DEFAULT 0,
    migration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    migrated_by INTEGER REFERENCES users(id)
);

-- Grant permissions (if using a specific user)
-- GRANT ALL PRIVILEGES ON DATABASE leavemanagement TO your_username;
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_username; 