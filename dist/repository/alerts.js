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
    readStatsByUser = async () => {
        let stats;
        try {
            const client = await db_1.dbPool.connect();
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
        return stats;
    };
    readStatsByBrigade = async () => {
        let stats;
        try {
            const client = await db_1.dbPool.connect();
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
        return stats;
    };
    readStatsByFacility = async () => {
        let stats;
        try {
            const client = await db_1.dbPool.connect();
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
        return stats;
    };
    deleteByLogin = async (login) => {
        let deleted;
        try {
            const client = await db_1.dbPool.connect();
            try {
                deleted = (await client.query(`
                    DELETE FROM alerts 
                    USING users 
                    WHERE 
	                    alerts.tracker_id = users.tracker_id and 
    	                users.login = $1
	
                    `, [login])).rowCount;
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
        if (!deleted) {
            return false;
        }
        return true;
    };
}
exports.AlertsRepository = AlertsRepository;
;
