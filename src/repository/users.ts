import { user } from "../models/objects";
import { dbPool } from "../db";

export class UserRepository {
    public readByID = async (user_id: string) => {
        let user: user
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
                    `, [user_id])).rows[0];
            } catch (queryError) {
                throw queryError;
            } finally {
                client.release()
            }
        } catch (connError) {
            throw connError;
        }

        return [user];
    };
};