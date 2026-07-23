CREATE TABLE plants (
    
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    species TEXT NOT NULL,
    watering_interval_days INTEGER NOT NULL,
    last_watered_date DATE

);