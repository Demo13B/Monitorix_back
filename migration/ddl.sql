CREATE TABLE "users"(
    "user_id" SERIAL NOT NULL,
    "login" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "gender" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL,
    "profession" VARCHAR(255) NOT NULL,
    "role_id" INTEGER NOT NULL,
    "brigade_id" INTEGER NULL,
    "tracker_id" INTEGER NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("user_id");
CREATE TABLE "roles"(
    "role_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "access_rights" SMALLINT NOT NULL
);
ALTER TABLE
    "roles" ADD PRIMARY KEY("role_id");
CREATE TABLE "facilities"(
    "facility_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "latitude" DECIMAL(10, 7) NOT NULL,
    "longitude" DECIMAL(10, 7) NOT NULL
);
ALTER TABLE
    "facilities" ADD PRIMARY KEY("facility_id");
CREATE TABLE "brigades"(
    "brigade_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "facility_id" INTEGER NULL
);
ALTER TABLE
    "brigades" ADD PRIMARY KEY("brigade_id");
CREATE TABLE "trackers"(
    "tracker_id" SERIAL NOT NULL,
    "mac_address" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "trackers" ADD PRIMARY KEY("tracker_id");
CREATE TABLE "tracker_data"(
    "data_id" SERIAL NOT NULL,
    "tracker_id" INTEGER NOT NULL,
    "air_pressure" DECIMAL(8, 2) NOT NULL,
    "pulse" SMALLINT NOT NULL,
    "latitude" DECIMAL(10, 7) NOT NULL,
    "longitude" DECIMAL(10, 7) NOT NULL,
    "activity" BOOLEAN NOT NULL,
    "fall" BOOLEAN NOT NULL,
    "temperature" SMALLINT NOT NULL,
    "humidity" SMALLINT NOT NULL,
    "charge" SMALLINT NOT NULL,
    "analyzer_alarm" BOOLEAN NOT NULL,
    "time" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "tracker_data" ADD PRIMARY KEY("data_id");
CREATE TABLE "alerts"(
    "alert_id" SERIAL NOT NULL,
    "tracker_id" INTEGER NOT NULL,
    "type" SMALLINT NOT NULL,
    "message" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "alerts" ADD PRIMARY KEY("alert_id");
ALTER TABLE
    "brigades" ADD CONSTRAINT "brigade_facility_id_foreign" FOREIGN KEY("facility_id") REFERENCES "facilities"("facility_id");
ALTER TABLE
    "tracker_data" ADD CONSTRAINT "tracker_data_tracker_id_foreign" FOREIGN KEY("tracker_id") REFERENCES "trackers"("tracker_id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_brigade_id_foreign" FOREIGN KEY("brigade_id") REFERENCES "brigades"("brigade_id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_role_id_foreign" FOREIGN KEY("role_id") REFERENCES "roles"("role_id");
ALTER TABLE
    "alerts" ADD CONSTRAINT "alerts_tracker_id_foreign" FOREIGN KEY("tracker_id") REFERENCES "trackers"("tracker_id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_tracker_id_foreign" FOREIGN KEY("tracker_id") REFERENCES "trackers"("tracker_id");