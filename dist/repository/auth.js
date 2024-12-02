"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepo = void 0;
const db_1 = require("../db");
class AuthRepo {
    readCredentials = async (login) => {
        let credentials;
        try {
            const client = await db_1.dbPool.connect();
            try {
                credentials = (await client.query(`
                SELECT
                    user_id,
                    login,
                    first_name,
                    brigade_id,
                    password_hash,
                    access_rights
                FROM users
                    JOIN roles
                    USING (role_id)
                WHERE login = $1
                `, [login])).rows[0];
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
        return credentials;
    };
}
exports.AuthRepo = AuthRepo;
