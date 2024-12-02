"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const db_1 = require("../db");
class UserRepository {
    readByID = async (user_id) => {
        let user;
        try {
            const client = await db_1.dbPool.connect();
            try {
                user = (await client.query(`
                    SELECT
                    	login,
	                    first_name,
	                    last_name,
                    	gender,
	                    phone_number,
	                    profession,
	                    roles.name as role,
	                    brigades.name as brigade,
	                    facilities.name as facility,
	                    trackers.mac_address as tracker
                    FROM users
                        LEFT JOIN roles
                        USING (role_id)
                        LEFT JOIN brigades
                        USING (brigade_id)
                        LEFT JOIN facilities
                        USING (facility_id)
                        LEFT JOIN trackers
                        USING (tracker_id)
                    WHERE user_id = $1
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
        return user;
    };
    readByBrigade = async (brigade_id) => {
        let users;
        try {
            const client = await db_1.dbPool.connect();
            try {
                users = (await client.query(`
                    SELECT
                    	login,
	                    first_name,
	                    last_name,
                    	gender,
	                    phone_number,
	                    profession,
	                    roles.name as role,
	                    brigades.name as brigade,
	                    facilities.name as facility,
	                    trackers.mac_address as tracker
                    FROM users
                        LEFT JOIN roles
                        USING (role_id)
                        LEFT JOIN brigades
                        USING (brigade_id)
                        LEFT JOIN facilities
                        USING (facility_id)
                        LEFT JOIN trackers
                        USING (tracker_id)
                    WHERE brigade_id = $1
                    ORDER BY role_id
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
        return users;
    };
    readAll = async () => {
        let users;
        try {
            const client = await db_1.dbPool.connect();
            try {
                users = (await client.query(`
                    SELECT
                    	login,
	                    first_name,
	                    last_name,
                    	gender,
	                    phone_number,
	                    profession,
	                    roles.name as role,
	                    brigades.name as brigade,
	                    facilities.name as facility,
	                    trackers.mac_address as tracker
                    FROM users
                        LEFT JOIN roles
                        USING (role_id)
                        LEFT JOIN brigades
                        USING (brigade_id)
                        LEFT JOIN facilities
                        USING (facility_id)
                        LEFT JOIN trackers
                        USING (tracker_id)
                    ORDER BY 
                        brigade_id,
                        role_id
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
        return users;
    };
}
exports.UserRepository = UserRepository;
;
