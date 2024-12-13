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
    writeUser = async (user) => {
        try {
            const client = await db_1.dbPool.connect();
            try {
                await client.query(`
                    INSERT INTO "users" (
                        "login",
                        "password_hash",
                        "gender",
                        "first_name",
                        "last_name",
                        "phone_number",
                        "profession",
                        "role_id",
                        "brigade_id",
                        "tracker_id"
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
                        $10
                    )
                    `, [
                    user.login,
                    user.password_hash,
                    user.gender,
                    user.first_name,
                    user.last_name,
                    user.phone_number,
                    user.profession,
                    user.role_id,
                    user.brigade_id,
                    user.tracker_id
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
    deleteUserByLogin = async (login) => {
        let result;
        try {
            const client = await db_1.dbPool.connect();
            try {
                result = (await client.query(`
                    DELETE FROM users
                    WHERE login = $1
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
        if (result == 0) {
            return false;
        }
        else {
            return true;
        }
    };
}
exports.UserRepository = UserRepository;
;
