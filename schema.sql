CREATE SCHEMA cobry;

CREATE TABLE cobry.users (
    id SERIAL primary key,
    cognito VARCHAR(255) unique,
    business_name VARCHAR(50),
    email VARCHAR(50) unique,
    phone VARCHAR(50),
    ruc VARCHAR(50),
    logo_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE cobry.clients (
    id SERIAL primary key,
    user_id INTEGER references cobry.users(id),
    name TEXT,
    email TEXT,
    phone VARCHAR(50),
    ruc VARCHAR(50),
    logo_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
    deleted_at TIMESTAMP
);