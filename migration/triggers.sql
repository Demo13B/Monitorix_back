CREATE TRIGGER generate_pressure_alert
AFTER INSERT
ON tracker_data
FOR EACH ROW
BEGIN
    IF new.air_pressure <= 800 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "timestamp")
        VALUES (new.tracker_id, 2, "The air pressure is dangerously low!", new.time)
    ELSEIF new.air_pressure <= 900 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "timestamp")
        VALUES (new.tracker_id, 1, "The air pressure is below normal limit", new.time)
    END IF;

    IF new.air_pressure >= 1200 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "timestamp")
        VALUES (new.tracker_id, 2, "The air pressure is dangerously high!", new.time)
    ELSEIF new.air_pressure >= 1100 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "timestamp")
        VALUES (new.tracker_id, 1, "The air pressure is above normal limit", new.time)
    END IF;
END;

CREATE TRIGGER generate_pulse_alert
AFTER INSERT
ON tracker_data
FOR EACH ROW
BEGIN
    IF new.pulse <= 50 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "timestamp")
        VALUES (new.tracker_id, 2, "The pulse is dangerously low!", new.time)
    ELSEIF new.pulse <= 60 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "timestamp")
        VALUES (new.tracker_id, 1, "The pulse is below normal limit", new.time)
    END IF;

    IF new.pulse >= 150 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "timestamp")
        VALUES (new.tracker_id, 2, "The pulse is dangerously high!", new.time)
    ELSEIF new.pulse >= 120 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "timestamp")
        VALUES (new.tracker_id, 1, "The pulse is above normal limit", new.time)
    END IF;
END;

CREATE TRIGGER generate_temperature_alert
AFTER INSERT
ON tracker_data
FOR EACH ROW
BEGIN
    IF new.temperature <= -10 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "timestamp")
        VALUES (new.tracker_id, 2, "The ambient temperature is dangerously low!", new.time)
    ELSEIF new.temperature <= 0 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "timestamp")
        VALUES (new.tracker_id, 1, "The ambient temperature is below normal limit", new.time)
    ENF IF;

    IF new.temperature >= 25 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "timestamp")
        VALUES (new.tracker_id, 2, "The ambient temperature is dangerously high!", new.time)
    ELSEIF new.temperature >= 35 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "timestamp")
        VALUES (new.tracker_id, 1, "The ambient temperature is above normal limit", new.time)
    END IF;
END;

CREATE TRIGGER generate_humidity_alert
AFTER INSERT
ON tracker_data
FOR EACH ROW
BEGIN
    IF new.humidity <= 30 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "timestamp")
        VALUES (new.tracker_id, 2, "The humidity is dangerously low!", new.time)
    ELSEIF new.humidity <= 40 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "timestamp")
        VALUES (new.tracker_id, 1, "The humidity is below normal limit", new.time)   
    END IF;

    IF new.humidity >= 80 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "timestamp")
        VALUES (new.tracker_id, 2, "The humidity is dangerously high!", new.time)
    ELSEIF
        INSERT INTO "alerts" ("tracker_id", "type", "message", "timestamp")
        VALUES (new.tracker_id, 1, "The humidity is above normal limit", new.time)   
    END IF;
END;

CREATE TRIGGER generate_charge_alert
AFTER INSERT
ON tracker_data
FOR EACH ROW
BEGIN
    IF new.charge <= 10 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "timestamp")
        VALUES (new.tracker_id, 2, "The battery is low!", new.time)
    ELSEIF new.charge <= 20 THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "timestamp")
        VALUES (new.tracker_id, 1, "The battery is going low", new.time)
    END IF;
END;

CREATE TRIGGER generate_activity_alert
AFTER INSERT
ON tracker_data
FOR EACH ROW
BEGIN
    IF new.activity = FALSE THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "timestamp")
        VALUES (new.tracker_id, 2, "The worker is not active!", new.time)
    END IF;
END;

CREATE TRIGGER generate_fall_alert
AFTER INSERT
ON tracker_data
FOR EACH ROW
BEGIN
    IF new.fall = TRUE THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "timestamp")
        VALUES (new.tracker_id, 2, "The worker fell!", new.time)
    END IF;
END;

CREATE TRIGGER generate_analyzer_alarm
AFTER INSERT
ON tracker_data
FOR EACH ROW
BEGIN
    IF new.analyzer_alarm = TRUE THEN
        INSERT INTO "alerts" ("tracker_id", "type", "message", "timestamp")
        VALUES (new.tracker_id, 2, "The gas analyzer shows high level of dangerous gases!", new.time)
    END IF;
END;
