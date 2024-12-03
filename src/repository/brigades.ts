import { dbPool } from "../db";
import { brigade } from "models/objects";

export class BrigadeRepository {
    public readAll = async () => {
        let brigades: brigade[];
        try {
            const client = await dbPool.connect();
            try {
                brigades = (await client.query(`
                    SELECT
                        b.name,
                        u.first_name as brigadier_name,
                        u.last_name as brigadier_surname,
                        f.name as facility_name,
                        f.latitude as latitude,
                        f.longitude as longitude
                    FROM brigades b
                        JOIN users u
                        USING (brigade_id)
                        JOIN roles r
                        USING (role_id)
                        JOIN facilities f
                        USING (facility_id)
                    WHERE r.access_rights = 2
                    `)).rows;
            } catch (queryError) {
                throw queryError;
            } finally {
                client.release;
            }
        } catch (connError) {
            throw connError;
        }

        return brigades;
    };
};