"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertsRepository = void 0;
const db_1 = require("../db");
class AlertsRepository {
    readByID = async (user_id) => {
        let alerts;
        try {
            const client = await db_1.dbPool.connect();
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
        return alerts;
    };
    readByBrigade = async (brigade_id) => {
        let alerts;
        try {
            const client = await db_1.dbPool.connect();
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
        return alerts;
    };
    readAll = async () => {
        let alerts;
        try {
            const client = await db_1.dbPool.connect();
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
        return alerts;
    };
}
exports.AlertsRepository = AlertsRepository;
;
