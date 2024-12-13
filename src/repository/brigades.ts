import { dbPool } from "../db";
import { brigade, brigadeDB, brigadeID, brigadeName } from "models/objects";

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
                        LEFT JOIN users u
                        USING (brigade_id)
                        LEFT JOIN roles r
                        USING (role_id)
                        LEFT JOIN facilities f
                        USING (facility_id)
                    WHERE 
                        r.access_rights = 2
                    `)).rows;
            } catch (queryError) {
                throw queryError;
            } finally {
                client.release();
            }
        } catch (connError) {
            throw connError;
        }

        return brigades;
    };

    public readByName = async (name: string) => {
        let brig: brigadeID;

        try {
            const client = await dbPool.connect();
            try {
                brig = (await client.query(`
                    SELECT brigade_id
                    FROM brigades
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

        if (brig === undefined) {
            return undefined;
        }

        return brig.brigade_id;
    };

    public readNames = async () => {
        let result: brigadeName[];

        try {
            const client = await dbPool.connect();
            try {
                result = (await client.query(`
                    SELECT name
                    FROM brigades
                    `)).rows;
            } catch (queryError) {
                throw queryError;
            } finally {
                client.release();
            }
        } catch (connError) {
            throw connError;
        }

        return result;
    };

    public writeBrigade = async (brig: brigadeDB) => {
        try {
            const client = await dbPool.connect();
            try {
                await client.query(`
                    INSERT INTO "brigades" (
                        "name",
                        "facility_id"
                    )
                    VALUES (
                        $1,
                        $2
                    )
                    `, [
                    brig.name,
                    brig.facility_id
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

    public deleteBrigade = async (name: string) => {
        let deleted: number | null;

        try {
            const client = await dbPool.connect();
            try {
                deleted = (await client.query(`
                    DELETE FROM brigades
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