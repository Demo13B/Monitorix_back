-- Insert into roles
INSERT INTO "roles" ("name", "access_rights")
VALUES
    ('Admin', 3),
    ('Brigadier', 2),
    ('Worker', 1);

-- Insert into facilities
INSERT INTO "facilities" ("name", "latitude", "longitude")
VALUES
    ('Facility A', 40.712776, -74.005974),
    ('Facility B', 34.052235, -118.243683);

-- Insert into brigade
INSERT INTO "brigade" ("name", "facility_id")
VALUES
    ('Brigade Alpha', 1),
    ('Brigade Beta', 2);

-- Insert into trackers
INSERT INTO "trackers" ("mac_address", "description")
VALUES
    ('00:1A:2B:3C:4D:5E', 'Tracker 1'),
    ('00:1A:2B:3C:4D:5F', 'Tracker 2'),
    ('00:1A:2B:3C:4D:60', 'Tracker 3'),
    ('00:1A:2B:3C:4D:61', 'Tracker 4'),
    ('00:1A:2B:3C:4D:62', 'Tracker 5'),
    ('00:1A:2B:3C:4D:63', 'Tracker 6');

-- Insert into users
-- Passwords
-- Ca4Pj
-- N4AAw
-- VKj9J
-- Wh0gZ
-- HgJ88
-- v9rC0
-- F4HNd
INSERT INTO "users" ("login", "password_hash", "gender", "first_name", "last_name", "phone_number", "profession", "role_id", "brigade_id", "tracker_id")
VALUES
    ('admin', '$2b$10$GTz/2xxRFYylk5Gt5SmgOOn4r85XhIX/s2.voqN2RbSYNNSAMAEcC', 'male', 'John', 'Doe', '123-456-7890', 'Administrator', 1, NULL, NULL),
    ('aalpha', '$2b$10$4mr5TGhd7kFsppRApJYs7uN7l8EySgxZpMctEismXOmspgpB0RAOC', 'female', 'Alice', 'Alpha', '321-654-0987', 'Brigadier', 2, 1, 1),
    ('bbeta', '$2b$10$puR1QJCo1IJq3HS69o6GOuSWcDeyF4.mX5hQhl4PzqBEN36X13U6m', 'male', 'Bob', 'Beta', '654-321-8765', 'Brigadier', 2, 2, 2),
    ('cwhiting', '$2b$10$2uBQuD/d4WuSqp5VidbLtedGX9UFYzOQW5BVELwgv99MmXdi6O5sq', 'male', 'Charlie', 'Whiting', '111-222-3333', 'Technician', 3, 1, 3),
    ('dallers', '$2b$10$qiz.Wd6ELUloJNKerI9OO.Fl7hve3OAQvHW6jd7ogf6IGvU6p640W', 'female', 'Diana', 'Allers', '444-555-6666', 'Assembler', 3, 1, 4),
    ('ehunt', '$2b$10$6epd6Or9SMljeMbYs3nvbup.wkcFKaTFmeRuTg3zSd6e66ZCr4EEi', 'male', 'Ethan', 'Hunt', '777-888-9999', 'Assembler', 3, 2, 5),
    ('fnorris', '$2b$10$06phc1.tKoCB8BtxAMQcZ.DG82Jc1iHxHfM4Me/u3QuA3zScBSehC', 'female', 'Fiona', 'Norris', '000-111-2222', 'Mechanic', 3, 2, 6);


INSERT INTO "tracker_data" ("tracker_id", "air_pressure", "pulse", "latitude", "longitude", "activity", "fall", "temperature", "humidity", "charge", "analyzer_alarm", "time")
VALUES
    -- Tracker 1 Data
    (1, 1013.25, 72, 37.7749, -122.4194, TRUE, FALSE, 36, 50, 85, FALSE, '2024-11-24 10:00:00'),
    (1, 950.00, 120, 37.7749, -122.4194, TRUE, FALSE, 42, 30, 20, TRUE, '2024-11-24 11:00:00'),

    -- Tracker 2 Data
    (2, 1013.25, 65, 40.7128, -74.0060, TRUE, FALSE, 37, 55, 90, FALSE, '2024-11-24 10:00:00'),
    (2, 1025.00, 45, 40.7128, -74.0060, TRUE, TRUE, 20, 15, 10, TRUE, '2024-11-24 11:30:00'),

    -- Tracker 3 Data
    (3, 1015.00, 78, 51.5074, -0.1278, TRUE, FALSE, 35, 60, 95, FALSE, '2024-11-24 10:15:00'),
    (3, 800.00, 30, 51.5074, -0.1278, TRUE, FALSE, 10, 10, 5, TRUE, '2024-11-24 12:00:00'),

    -- Tracker 4 Data
    (4, 1013.25, 80, 48.8566, 2.3522, TRUE, FALSE, 37, 45, 80, FALSE, '2024-11-24 09:30:00'),
    (4, 900.00, 110, 48.8566, 2.3522, TRUE, TRUE, 40, 20, 15, TRUE, '2024-11-24 11:15:00'),

    -- Tracker 5 Data
    (5, 1010.00, 70, 35.6895, 139.6917, TRUE, FALSE, 36, 55, 75, FALSE, '2024-11-24 08:45:00'),
    (5, 1020.00, 150, 35.6895, 139.6917, TRUE, FALSE, 41, 10, 10, TRUE, '2024-11-24 10:45:00'),

    -- Tracker 6 Data
    (6, 1013.00, 68, 34.0522, -118.2437, TRUE, FALSE, 36, 50, 85, FALSE, '2024-11-24 09:00:00'),
    (6, 920.00, 40, 34.0522, -118.2437, FALSE, TRUE, 15, 5, 3, TRUE, '2024-11-24 10:30:00');

INSERT INTO "alerts" ("tracker_id", "type", "message")
VALUES
    -- Tracker 1 Alerts
    (1, 1, 'Low air pressure detected'),
    (1, 1, 'High pulse detected'),
    (1, 1, 'High temperature detected'),
    (1, 2, 'Low battery'),

    -- Tracker 2 Alerts
    (2, 2, 'Detected a fall'),
    (2, 1, 'Abnormally low temperature detected'),

    -- Tracker 3 Alerts
    (3, 1, 'Extremely low air pressure'),
    (3, 2, 'Low battery'),

    -- Tracker 4 Alerts
    (4, 1, 'High pulse detected'),
    (4, 2, 'Detected a fall'),

    -- Tracker 5 Alerts
    (5, 1, 'High pulse detected'),
    (5, 1, 'High temperature detected'),

    -- Tracker 6 Alerts
    (6, 1, 'Low air pressure detected'),
    (6, 2, 'Low battery'),
    (6, 2, 'No activity');

