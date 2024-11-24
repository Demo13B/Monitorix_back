import { dbPool } from "../db";
import { credentials } from "../models/auth";

export class AuthRepo {
    public readCredentials = async (login: string) => {
        let credentials: credentials;
        try {
            const client = await dbPool.connect();
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
            } catch (queryError) {
                throw queryError;
            } finally {
                client.release();
            }
        } catch (connError) {
            throw connError;
        }
        return credentials;
    };
}