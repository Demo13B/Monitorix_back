import { data } from "../models/objects";
import { dbPool } from "../db";

export class DataRepository {
    public readByID = async (user_id: string) => {
        let data: data[]
        try {
            const client = await dbPool.connect();
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
            } catch (queryError) {
                throw queryError;
            } finally {
                client.release()
            }
        } catch (connError) {
            throw connError;
        }

        return data;
    };

    public readByBrigade = async (brigade_id: string) => {
        let data: data[]
        try {
            const client = await dbPool.connect();
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
            } catch (queryError) {
                throw queryError;
            } finally {
                client.release()
            }
        } catch (connError) {
            throw connError;
        }

        return data;
    };

    public readAll = async () => {
        let data: data[]
        try {
            const client = await dbPool.connect();
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
            } catch (queryError) {
                throw queryError;
            } finally {
                client.release()
            }
        } catch (connError) {
            throw connError;
        }

        return data;
    };

    public readLastData = async (user_id: string) => {
        let data: data[]

        try {
            const client = await dbPool.connect();
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
            } catch (queryError) {
                throw queryError;
            } finally {
                client.release();
            }
        } catch (connError) {
            throw connError;
        }

        return data;
    };
};