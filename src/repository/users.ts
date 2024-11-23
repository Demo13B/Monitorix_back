import { user } from "models/objects";
import { dbPool } from "../db";

export class UserRepository {
    public async readAll(accessRights: number, user_id: number) {
        const client = await dbPool.connect();
        let users: user[];
        switch (accessRights) {
            case 3:
                users = (await client.query('SELECT * FROM users')).rows;
                break;
            case 2:
                const user: user = (await client.query(`
                    SELECT brigade_id 
                    FROM users 
                    WHERE user_id = $1`,
                    [user_id])).rows[0];
                users = (await client.query(`
                    SELECT * 
                    FROM users 
                    WHERE brigade_id = $1`,
                    [user.brigade_id])).rows;
                break;
            case 1:
                users = (await client.query(`
                    SELECT * 
                    FROM users 
                    WHERE user_id = $1`,
                    [user_id])).rows;
                break;
            default:
                users = [];
        }
        client.release();
        return users;
    };
};