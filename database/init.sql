CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    duration INT NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS masters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialty VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(100) NOT NULL,
    client_phone VARCHAR(20),
    service_id INT REFERENCES services(id),
    master_id INT REFERENCES masters(id),
    appointment_time TIMESTAMP NOT NULL
);

INSERT INTO services (name, duration, price) VALUES
('Стрижка женская', 60, 1500),
('Стрижка мужская', 30, 800),
('Окрашивание', 120, 3500);

INSERT INTO masters (name, specialty) VALUES
('Анна Петрова', 'парикмахер'),
('Елена Сидорова', 'колорист');
