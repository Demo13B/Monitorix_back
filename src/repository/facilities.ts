import { dbPool } from "../db";
import { facility, facilityID } from "models/objects"

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

    public readByName = async (name: string) => {
        let id: facilityID;

        try {
            const client = await dbPool.connect();
            try {
                id = (await client.query(`
                    SELECT facility_id
                    FROM facilities
                    WHERE name = $1
                    `, [name])).rows[0];
            } catch (queryError) {
                throw queryError;
            } finally {
                client.release();
            }
        } catch (connError) {
            throw connError;
        }

        if (id === undefined) {
            return null;
        } else {
            return id.facility_id;
        }
    }

    public writeFacility = async (facility: facility) => {
        try {
            const client = await dbPool.connect();
            try {
                await client.query(`
                    INSERT INTO "facilities" (
                        "name",
                        "latitude",
                        "longitude"
                    )
                    VALUES (
                        $1,
                        $2,
                        $3
                    )
                    `, [
                    facility.name,
                    facility.latitude,
                    facility.longitude
                ]);
            } catch (queryError) {
                throw queryError;
            } finally {
                client.release();
            }
        } catch (connError) {
            throw connError;
        }
    };

    public deleteFacility = async (name: string) => {
        let deleted: number | null;
        try {
            const client = await dbPool.connect();
            try {
                deleted = (await client.query(`
                    DELETE FROM facilities
                    WHERE name = $1
                    `, [name])).rowCount;
            } catch (queryError) {
                throw queryError;
            } finally {
                client.release();
            }
        } catch (connError) {
            throw connError;
        }

        if (!deleted) {
            return false;
        }

        return true;
    };
};