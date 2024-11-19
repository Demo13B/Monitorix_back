CREATE TABLE "brigade"(
    "facility_id" BIGINT NOT NULL,
    "brigade_id" BIGINT NOT NULL,
    "name" BIGINT NOT NULL,
    "brigadier_id" BIGINT NOT NULL
);
ALTER TABLE
    "brigade" ADD PRIMARY KEY("brigade_id");
CREATE TABLE "trackers"(
    "mac_adress" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "tracker_id" BIGINT NOT NULL
);
ALTER TABLE
    "trackers" ADD PRIMARY KEY("tracker_id");
CREATE TABLE "tracker_data"(
    "time" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "temperature" SMALLINT NOT NULL,
    "activity" BOOLEAN NOT NULL,
    "data_id" BIGINT NOT NULL,
    "humidity" SMALLINT NOT NULL,
    "analyzer_alarm" BOOLEAN NOT NULL,
    "charge" SMALLINT NOT NULL,
    "latitude" DECIMAL(10, 7) NOT NULL,
    "tracker_id" BIGINT NOT NULL,
    "fall" BOOLEAN NOT NULL,
    "air_pressure" DECIMAL(8, 2) NOT NULL,
    "pulse" SMALLINT NOT NULL,
    "longitude" DECIMAL(10, 7) NOT NULL
);
ALTER TABLE
    "tracker_data" ADD PRIMARY KEY("data_id");
CREATE TABLE "roles"(
    "role_id" BIGINT NOT NULL,
    "access_rights" SMALLINT NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "roles" ADD PRIMARY KEY("role_id");
CREATE TABLE "alerts"(
    "alert_id" BIGINT NOT NULL,
    "message" VARCHAR(255) NOT NULL,
    "type" SMALLINT NOT NULL,
    "tracker_id" BIGINT NOT NULL
);
ALTER TABLE
    "alerts" ADD PRIMARY KEY("alert_id");
CREATE TABLE "facilities"(
    "facility_id" BIGINT NOT NULL,
    "latitude" DECIMAL(10, 7) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "longitude" DECIMAL(10, 7) NOT NULL
);
ALTER TABLE
    "facilities" ADD PRIMARY KEY("facility_id");
CREATE TABLE "users"(
    "password_hash" VARCHAR(255) NOT NULL,
    "profession" VARCHAR(255) NOT NULL,
    "tracker_id" BIGINT NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "brigade_id" BIGINT NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL,
    "user_id" BIGINT NOT NULL,
    "role_id" BIGINT NOT NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("user_id");
ALTER TABLE
    "brigade" ADD CONSTRAINT "brigade_brigadier_id_foreign" FOREIGN KEY("brigadier_id") REFERENCES "users"("user_id");
ALTER TABLE
    "brigade" ADD CONSTRAINT "brigade_facility_id_foreign" FOREIGN KEY("facility_id") REFERENCES "facilities"("facility_id");
ALTER TABLE
    "tracker_data" ADD CONSTRAINT "tracker_data_tracker_id_foreign" FOREIGN KEY("tracker_id") REFERENCES "trackers"("tracker_id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_brigade_id_foreign" FOREIGN KEY("brigade_id") REFERENCES "brigade"("brigade_id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_role_id_foreign" FOREIGN KEY("role_id") REFERENCES "roles"("role_id");
ALTER TABLE
    "alerts" ADD CONSTRAINT "alerts_tracker_id_foreign" FOREIGN KEY("tracker_id") REFERENCES "trackers"("tracker_id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_tracker_id_foreign" FOREIGN KEY("tracker_id") REFERENCES "trackers"("tracker_id");