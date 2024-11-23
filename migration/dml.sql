-- Insert Data for facilities
INSERT INTO facilities (facility_id, latitude, name, longitude)
VALUES 
    (1, 40.712776, 'Facility A', -74.005974),
    (2, 34.052235, 'Facility B', -118.243683);

-- Insert Data for brigade
INSERT INTO brigade (facility_id, brigade_id, name)
VALUES 
    (1, 101, 'Brigade Alpha'),
    (2, 102, 'Brigade Beta');

-- Insert Data for roles
INSERT INTO roles (role_id, access_rights, name)
VALUES 
    (1, 10, 'Administrator'),
    (2, 5, 'Technician'),
    (3, 1, 'Viewer');

-- Insert Data for trackers
INSERT INTO trackers (mac_address, description, tracker_id)
VALUES 
    ('00:14:22:01:23:45', 'Tracker A', 201),
    ('00:16:22:11:33:55', 'Tracker B', 202);

-- Insert Data for users
INSERT INTO users (password_hash, profession, tracker_id, last_name, first_name, brigade_id, phone_number, user_id, role_id)
VALUES 
    ('hashed_password1', 'Engineer', 201, 'Doe', 'John', 101, '123-456-7890', 301, 1),
    ('hashed_password2', 'Technician', 202, 'Smith', 'Jane', 102, '987-654-3210', 302, 2);

-- Insert Data for tracker_data
INSERT INTO tracker_data (time, temperature, activity, data_id, humidity, analyzer_alarm, charge, latitude, tracker_id, fall, air_pressure, pulse, longitude)
VALUES 
    ('2024-11-20 08:00:00', 22, TRUE, 401, 50, FALSE, 80, 40.712776, 201, FALSE, 1012.5, 75, -74.005974),
    ('2024-11-20 09:00:00', 25, FALSE, 402, 60, TRUE, 70, 34.052235, 202, TRUE, 1010.3, 80, -118.243683);

-- Insert Data for alerts
INSERT INTO alerts (alert_id, message, type, tracker_id)
VALUES 
    (501, 'Temperature threshold exceeded', 1, 201),
    (502, 'Device battery low', 2, 202);
