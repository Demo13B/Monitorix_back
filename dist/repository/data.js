"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataRepository = void 0;
const db_1 = require("../db");
class DataRepository {
    readByID = async (user_id) => {
        let data;
        try {
            const client = await db_1.dbPool.connect();
            try {
                data = (await client.query(`
                    SELECT
                        d.time,
                    	login,
	                    t.mac_address as tracker,
                        t.description,
                        d.air_pressure,
                        d.temperature,
                        d.humidity,
                        d.pulse,
                        d.latitude,
                        d.longitude,
                        d.activity,
                        d.fall,
                        d.analyzer_alarm,
                        d.charge
                    FROM users
                        JOIN trackers t
                        USING (tracker_id)
                        JOIN tracker_data d
                        USING (tracker_id)
                    WHERE user_id = $1
                    ORDER BY 
                        time desc,
                        user_id
                    `, [user_id])).rows;
            }
            catch (queryError) {
                throw queryError;
            }
            finally {
                client.release();
            }
        }
        catch (connError) {
            throw connError;
        }
        return data;
    };
    readByBrigade = async (brigade_id) => {
        let data;
        try {
            const client = await db_1.dbPool.connect();
            try {
                data = (await client.query(`
                    SELECT
                        d.time,
                    	login,
	                    t.mac_address as tracker,
                        t.description,
                        d.air_pressure,
                        d.temperature,
                        d.humidity,
                        d.pulse,
                        d.latitude,
                        d.longitude,
                        d.activity,
                        d.fall,
                        d.analyzer_alarm,
                        d.charge
                    FROM users
                        JOIN trackers t
                        USING (tracker_id)
                        JOIN tracker_data d
                        USING (tracker_id)
                    WHERE brigade_id = $1
                    ORDER BY 
                        time desc,
                        user_id
                    `, [brigade_id])).rows;
            }
            catch (queryError) {
                throw queryError;
            }
            finally {
                client.release();
            }
        }
        catch (connError) {
            throw connError;
        }
        return data;
    };
    readAll = async () => {
        let data;
        try {
            const client = await db_1.dbPool.connect();
            try {
                data = (await client.query(`
                    SELECT
                        d.time,
                    	login,
	                    t.mac_address as tracker,
                        t.description,
                        d.air_pressure,
                        d.temperature,
                        d.humidity,
                        d.pulse,
                        d.latitude,
                        d.longitude,
                        d.activity,
                        d.fall,
                        d.analyzer_alarm,
                        d.charge
                    FROM users
                        JOIN trackers t
                        USING (tracker_id)
                        JOIN tracker_data d
                        USING (tracker_id)
                    ORDER BY 
                        time desc,
                        user_id
                    `)).rows;
            }
            catch (queryError) {
                throw queryError;
            }
            finally {
                client.release();
            }
        }
        catch (connError) {
            throw connError;
        }
        return data;
    };
    readLastData = async (user_id) => {
        let data;
        try {
            const client = await db_1.dbPool.connect();
            try {
                data = (await client.query(`
                    SELECT
                        d.time,
                    	login,
	                    t.mac_address as tracker,
                        t.description,
                        d.air_pressure,
                        d.temperature,
                        d.humidity,
                        d.pulse,
                        d.latitude,
                        d.longitude,
                        d.activity,
                        d.fall,
                        d.analyzer_alarm,
                        d.charge
                    FROM users
                        JOIN trackers t
                        USING (tracker_id)
                        JOIN tracker_data d
                        USING (tracker_id)
                    WHERE user_id = $1
                    ORDER BY 
                        d.time desc
                    LIMIT 1
                    `, [user_id])).rows;
            }
            catch (queryError) {
                throw queryError;
            }
            finally {
                client.release();
            }
        }
        catch (connError) {
            throw connError;
        }
        return data;
    };
    writeData = async (data) => {
        try {
            const client = await db_1.dbPool.connect();
            try {
                await client.query(`
                    INSERT INTO "tracker_data" (
                        "tracker_id",
                        "air_pressure",
                        "pulse",
                        "latitude",
                        "longitude",
                        "temperature",
                        "humidity",
                        "charge",
                        "activity",
                        "fall",
                        "analyzer_alarm",
                        "time"
                    )
                    VALUES (
                        $1,
                        $2,
                        $3,
                        $4,
                        $5,
                        $6,
                        $7,
                        $8,
                        $9,
                        $10,
                        $11,
                        $12
                    )
                    `, [
                    data.tracker_id,
                    data.air_pressure,
                    data.pulse,
                    data.latitude,
                    data.longitude,
                    data.temperature,
                    data.humidity,
                    data.charge,
                    data.activity,
                    data.fall,
                    data.analyzer_alarm,
                    data.time
                ]);
            }
            catch (queryError) {
                throw queryError;
            }
            finally {
                client.release();
            }
        }
        catch (connError) {
            throw connError;
        }
    };
}
exports.DataRepository = DataRepository;
;
