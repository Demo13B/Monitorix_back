-- Create the roles table
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    access_rights SMALLINT NOT NULL
);

-- Create the facilities table
CREATE TABLE facilities (
    facility_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL
);

-- Create the brigades table
CREATE TABLE brigades (
    brigade_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    facility_id INTEGER REFERENCES facilities(facility_id)
        ON DELETE SET NULL
);

-- Create the trackers table
CREATE TABLE trackers (
    tracker_id SERIAL PRIMARY KEY,
    mac_address VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
);

-- Create the users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    login VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    profession VARCHAR(255) NOT NULL,
    role_id INTEGER NOT NULL REFERENCES roles(role_id),
    brigade_id INTEGER REFERENCES brigades(brigade_id) 
        ON DELETE SET NULL,
    tracker_id INTEGER REFERENCES trackers(tracker_id) 
        ON DELETE SET NULL
);

-- Create the tracker_data table
CREATE TABLE tracker_data (
    data_id SERIAL PRIMARY KEY,
    tracker_id INTEGER NOT NULL REFERENCES trackers(tracker_id)
        ON DELETE CASCADE,
    air_pressure DECIMAL(8, 2) NOT NULL,
    pulse SMALLINT NOT NULL,
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,
    activity BOOLEAN NOT NULL,
    fall BOOLEAN NOT NULL,
    temperature SMALLINT NOT NULL,
    humidity SMALLINT NOT NULL,
    charge SMALLINT NOT NULL,
    analyzer_alarm BOOLEAN NOT NULL,
    time TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);

-- Create the alerts table
CREATE TABLE alerts (
    alert_id SERIAL PRIMARY KEY,
    tracker_id INTEGER NOT NULL REFERENCES trackers(tracker_id)
        ON DELETE CASCADE,
    type SMALLINT NOT NULL,
    message VARCHAR(255) NOT NULL,
    time TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);






-- Genereate triggers
CREATE OR REPLACE FUNCTION generate_pressure_alert() 
RETURNS TRIGGER AS $$
BEGIN
    IF new.air_pressure <= 800 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 2, 'The air pressure is dangerously low!', new.time);
    ELSIF new.air_pressure <= 900 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 1, 'The air pressure is below normal limit', new.time);
    END IF;

    IF new.air_pressure >= 1200 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 2, 'The air pressure is dangerously high!', new.time);
    ELSIF new.air_pressure >= 1100 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 1, 'The air pressure is above normal limit', new.time);
    END IF;

    RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_pressure_alert
AFTER INSERT
ON tracker_data
FOR EACH ROW
EXECUTE FUNCTION generate_pressure_alert();



CREATE OR REPLACE FUNCTION generate_pulse_alert() 
RETURNS TRIGGER AS $$
BEGIN
    IF new.pulse <= 50 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 2, 'The pulse is dangerously low!', new.time);
    ELSIF new.pulse <= 60 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 1, 'The pulse is below normal limit', new.time);
    END IF;

    IF new.pulse >= 150 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 2, 'The pulse is dangerously high!', new.time);
    ELSIF new.pulse >= 120 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 1, 'The pulse is above normal limit', new.time);
    END IF;

    RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_pulse_alert
AFTER INSERT
ON tracker_data
FOR EACH ROW
EXECUTE FUNCTION generate_pulse_alert();



CREATE OR REPLACE FUNCTION generate_temperature_alert() 
RETURNS TRIGGER AS $$
BEGIN
    IF new.temperature <= -10 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 2, 'The temperature is dangerously low!', new.time);
    ELSIF new.temperature <= 0 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 1, 'The temperature is below normal limit', new.time);
    END IF;

    IF new.temperature >= 25 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 2, 'The ambient temperature is dangerously high!', new.time);
    ELSIF new.temperature >= 35 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 1, 'The ambient temperature is above normal limit', new.time);
    END IF;

    RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_temperature_alert
AFTER INSERT
ON tracker_data
FOR EACH ROW
EXECUTE FUNCTION generate_temperature_alert();



CREATE OR REPLACE FUNCTION generate_humidity_alert() 
RETURNS TRIGGER AS $$
BEGIN
    IF new.humidity <= 30 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 2, 'The humidity is dangerously low!', new.time);
    ELSIF new.humidity <= 40 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 1, 'The humidity is below normal limit', new.time);
    END IF;

    IF new.humidity >= 80 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 2, 'The humidity is dangerously high!', new.time);
    ELSIF new.humidity >= 70 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 1, 'The humidity is above normal limit', new.time);
    END IF;

    RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_humidity_alert
AFTER INSERT
ON tracker_data
FOR EACH ROW
EXECUTE FUNCTION generate_humidity_alert();



CREATE OR REPLACE FUNCTION generate_charge_alert() 
RETURNS TRIGGER AS $$
BEGIN
    IF new.charge <= 10 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 2, 'The battery is low!', new.time);
    ELSIF new.charge <= 20 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 1, 'The battery is going low', new.time);
    END IF;

    RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_charge_alert
AFTER INSERT
ON tracker_data
FOR EACH ROW
EXECUTE FUNCTION generate_charge_alert();



CREATE OR REPLACE FUNCTION generate_activity_alert() 
RETURNS TRIGGER AS $$
BEGIN
    IF new.activity = FALSE THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 2, 'The worker is not active!', new.time);
    END IF;

    RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_activity_alert
AFTER INSERT
ON tracker_data
FOR EACH ROW
EXECUTE FUNCTION generate_activity_alert();



CREATE OR REPLACE FUNCTION generate_fall_alert() 
RETURNS TRIGGER AS $$
BEGIN
    IF new.fall = TRUE THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 2, 'The worker fell!', new.time);
    END IF;

    RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_fall_alert
AFTER INSERT
ON tracker_data
FOR EACH ROW
EXECUTE FUNCTION generate_fall_alert();



CREATE OR REPLACE FUNCTION generate_analyzer_alert() 
RETURNS TRIGGER AS $$
BEGIN
    IF new.analyzer_alarm = TRUE THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 2, 'The gas analyzer shows high level of dangerous gases!', new.time);
    END IF;

    RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_analyzer_alert
AFTER INSERT
ON tracker_data
FOR EACH ROW
EXECUTE FUNCTION generate_analyzer_alert();