"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrigadeRepository = void 0;
const db_1 = require("../db");
class BrigadeRepository {
    readAll = async () => {
        let brigades;
        try {
            const client = await db_1.dbPool.connect();
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
                        r.access_rights = 2 or
                        r.access_rights is NULL
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
        return brigades;
    };
    readByName = async (name) => {
        let brig;
        try {
            const client = await db_1.dbPool.connect();
            try {
                brig = (await client.query(`
                    SELECT brigade_id
                    FROM brigades
                    WHERE name = $1
                    `, [name])).rows[0];
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
        if (brig === undefined) {
            return undefined;
        }
        return brig.brigade_id;
    };
    writeBrigade = async (brig) => {
        try {
            const client = await db_1.dbPool.connect();
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
}
exports.BrigadeRepository = BrigadeRepository;
;
