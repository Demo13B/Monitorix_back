-- Create a user
CREATE USER $1 WITH PASSWORD $2;

GRANT CONNECT ON DATABASE $3 TO $1;
GRANT USAGE ON SCHEMA $4 TO $1;

GRANT SELECT, INSERT, DELETE ON ALL TABLES IN SCHEMA $4 TO $1;

GRANT USAGE ON SEQUENCE users_user_id_seq TO backend_api;
GRANT USAGE ON SEQUENCE trackers_tracker_id_seq TO backend_api;
GRANT USAGE ON SEQUENCE tracker_data_data_id_seq TO backend_api;
GRANT USAGE ON SEQUENCE facilities_facility_id_seq TO backend_api;
GRANT USAGE ON SEQUENCE brigades_brigade_id_seq TO backend_api;
GRANT USAGE ON SEQUENCE alerts_alert_id_seq TO backend_api;