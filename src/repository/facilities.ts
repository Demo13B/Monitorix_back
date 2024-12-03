import { dbPool } from "../db";
import { facility } from "models/objects"

export class FacilitiesRepository {
    public readAll = async () => {
        let facilities: facility[];

        try {
            const client = await dbPool.connect();
            try {
                facilities = (await client.query(`
                    SELECT
                        name,
                        latitude,
                        longitude 
                    FROM facilities 
                    `)).rows;
            } catch (queryError) {
                throw queryError;
            } finally {
                client.release();
            }
        } catch (connError) {
            throw connError;
        }

        return facilities;
    };
};