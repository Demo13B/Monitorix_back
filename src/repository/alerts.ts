import { alert, userStat, brigadeStat, facilityStat } from "models/objects";
import { dbPool } from "../db";

export class AlertsRepository {
    public readByID = async (user_id: string) => {
        let alerts: alert[]
        try {
            const client = await dbPool.connect();
            try {
                alerts = (await client.query(`
                    SELECT
                        a.time,
	                    u.login,
	                    t.mac_address as tracker,
	                    a.type,
	                    a.message
                    FROM users u 
	                    JOIN trackers t 
	                    USING (tracker_id)
	                    JOIN alerts a 
	                    USING (tracker_id)
                    WHERE user_id = $1
                    ORDER BY 
                        user_id, 
                        time
                    `, [user_id])).rows;
            } catch (queryError) {
                throw queryError;
            } finally {
                client.release()
            }
        } catch (connError) {
            throw connError;
        }

        return alerts;
    };

    public readByBrigade = async (brigade_id: string) => {
        let alerts: alert[]
        try {
            const client = await dbPool.connect();
            try {
                alerts = (await client.query(`
                    SELECT
                        a.time,
	                    u.login,
	                    t.mac_address as tracker,
	                    a.type,
	                    a.message
                    FROM users u 
	                    JOIN trackers t 
	                    USING (tracker_id)
	                    JOIN alerts a 
	                    USING (tracker_id)
                    WHERE brigade_id = $1
                    ORDER BY 
                        user_id, 
                        time      
                    `, [brigade_id])).rows;
            } catch (queryError) {
                throw queryError;
            } finally {
                client.release()
            }
        } catch (connError) {
            throw connError;
        }

        return alerts;
    };

    public readAll = async () => {
        let alerts: alert[]
        try {
            const client = await dbPool.connect();
            try {
                alerts = (await client.query(`
                    SELECT
                        a.time,
	                    u.login,
	                    t.mac_address as tracker,
	                    a.type,
	                    a.message
                    FROM users u 
	                    JOIN trackers t 
	                    USING (tracker_id)
	                    JOIN alerts a 
	                    USING (tracker_id)
                    ORDER BY 
                        user_id, 
                        time
                    `)).rows;
            } catch (queryError) {
                throw queryError;
            } finally {
                client.release()
            }
        } catch (connError) {
            throw connError;
        }

        return alerts;
    };

    public readStatsByUser = async () => {
        let stats: userStat[]

        try {
            const client = await dbPool.connect();
            try {
                stats = (await client.query(`
                    SELECT
                        login,
                        count(type) filter (WHERE type = 1) as yellow,
                        count(type) filter (WHERE type = 2) as red
                    FROM users
                        JOIN alerts
                        USING (tracker_id)
                    GROUP BY user_id
                    ORDER BY user_id
                    `)).rows;
            } catch (queryError) {
                throw queryError;
            } finally {
                client.release();
            }
        } catch (connError) {
            throw connError;
        }

        return stats;
    };

    public readStatsByBrigade = async () => {
        let stats: brigadeStat[]

        try {
            const client = await dbPool.connect();
            try {
                stats = (await client.query(`
                    SELECT
                        max(b.name) as name,
                        count(type) filter (WHERE type = 1) as yellow,
                        count(type) filter (WHERE type = 2) as red
                    FROM users
                        JOIN alerts
                        USING (tracker_id)
                        JOIN brigades b 
                        USING (brigade_id)
                    GROUP BY brigade_id
                    ORDER BY brigade_id
                    `)).rows;
            } catch (queryError) {
                throw queryError;
            } finally {
                client.release();
            }
        } catch (connError) {
            throw connError;
        }

        return stats;
    };

    public readStatsByFacility = async () => {
        let stats: facilityStat[]

        try {
            const client = await dbPool.connect();
            try {
                stats = (await client.query(`
                    SELECT
                        max(f.name) as name,
                        count(type) filter (WHERE type = 1) as yellow,
                        count(type) filter (WHERE type = 2) as red
                    FROM users
                        JOIN alerts
                        USING (tracker_id)
                        JOIN brigades b 
                        USING (brigade_id)
                        JOIN facilities f
                        USING (facility_id)
                    GROUP BY facility_id
                    ORDER BY facility_id
                    `)).rows;
            } catch (queryError) {
                throw queryError;
            } finally {
                client.release();
            }
        } catch (connError) {
            throw connError;
        }

        return stats;
    };
};