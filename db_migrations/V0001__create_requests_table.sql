CREATE TABLE IF NOT EXISTS t_p31715485_siemens_repair_websi.requests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    appliance VARCHAR(200),
    message TEXT,
    consent BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);