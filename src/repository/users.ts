import { user, userDB } from "../models/objects";
import { dbPool } from "../db";

export class UserRepository {
    public readByID = async (user_id: string) => {
        let user: user[]
        try {
            const client = await dbPool.connect();
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
            } catch (queryError) {
                throw queryError;
            } finally {
                client.release()
            }
        } catch (connError) {
            throw connError;
        }

        return user;
    };

    public readByBrigade = async (brigade_id: string) => {
        let users: user[]
        try {
            const client = await dbPool.connect();
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
            } catch (queryError) {
                throw queryError;
            } finally {
                client.release()
            }
        } catch (connError) {
            throw connError;
        }

        return users;
    };

    public readAll = async () => {
        let users: user[]
        try {
            const client = await dbPool.connect();
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
            } catch (queryError) {
                throw queryError;
            } finally {
                client.release()
            }
        } catch (connError) {
            throw connError;
        }

        return users;
    };

    public writeUser = async (user: userDB) => {
        try {
            const client = await dbPool.connect();
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
                ])
            } catch (queryError) {
                throw queryError;
            }
        } catch (connError) {
            throw connError;
        }
    };
};