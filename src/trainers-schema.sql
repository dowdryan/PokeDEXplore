CREATE TABLE trainer(
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) UNIQUE,
    password TEXT NOT NULL,
    trainer_name VARCHAR(25) NOT NULL,
    email TEXT NOT NULL CHECK (position('@' IN email) > 1),
    favorite TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_admin BOOLEAN
);
