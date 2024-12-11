"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilitiesRepository = void 0;
const db_1 = require("../db");
class FacilitiesRepository {
    readAll = async () => {
        let facilities;
        try {
            const client = await db_1.dbPool.connect();
            try {
                facilities = (await client.query(`
                    SELECT
                        name,
                        latitude,
                        longitude 
                    FROM facilities 
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
        return facilities;
    };
    readByName = async (name) => {
        let id;
        try {
            const client = await db_1.dbPool.connect();
            try {
                id = (await client.query(`
                    SELECT facility_id
                    FROM facilities
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
        if (id === undefined) {
            return null;
        }
        else {
            return id.facility_id;
        }
    };
    writeFacility = async (facility) => {
        try {
            const client = await db_1.dbPool.connect();
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
exports.FacilitiesRepository = FacilitiesRepository;
;
