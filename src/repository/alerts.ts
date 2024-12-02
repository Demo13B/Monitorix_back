import { alert } from "models/objects";
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
};