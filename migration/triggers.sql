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
    IF new.air_pressure <= 50 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 2, 'The pulse is dangerously low!', new.time);
    ELSIF new.air_pressure <= 60 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 1, 'The pulse is below normal limit', new.time);
    END IF;

    IF new.air_pressure >= 150 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 2, 'The pulse is dangerously high!', new.time);
    ELSIF new.air_pressure >= 120 THEN
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
    IF new.air_pressure <= -10 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 2, 'The temperature is dangerously low!', new.time);
    ELSIF new.air_pressure <= 0 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 1, 'The temperature is below normal limit', new.time);
    END IF;

    IF new.air_pressure >= 25 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 2, 'The ambient temperature is dangerously high!', new.time);
    ELSIF new.air_pressure >= 35 THEN
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
    IF new.air_pressure <= 30 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 2, 'The humidity is dangerously low!', new.time);
    ELSIF new.air_pressure <= 40 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 1, 'The humidity is below normal limit', new.time);
    END IF;

    IF new.air_pressure >= 80 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "time")
        VALUES (new.tracker_id, 2, 'The humidity is dangerously high!', new.time);
    ELSIF new.air_pressure >= 70 THEN
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