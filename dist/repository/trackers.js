"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackerRepository = void 0;
const db_1 = require("../db");
class TrackerRepository {
    readByName = async (mac_address) => {
        let tracker;
        try {
            const client = await db_1.dbPool.connect();
            try {
                tracker = (await client.query(`
                    SELECT tracker_id
                    FROM trackers
                    WHERE mac_address = $1
                    `, [mac_address])).rows[0];
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
        if (tracker === undefined) {
            return undefined;
        }
        return tracker.tracker_id;
    };
    readTrackerNames = async () => {
        let res;
        try {
            const client = await db_1.dbPool.connect();
            try {
                res = (await client.query(`
                    SELECT mac_address
                    FROM trackers
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
        return res;
    };
    writeTracker = async (tracker) => {
        try {
            const client = await db_1.dbPool.connect();
            try {
                await client.query(`
                    INSERT INTO "trackers" (
                        "mac_address",
                        "description"
                    )
                    VALUES (
                        $1,
                        $2
                    )
                    `, [tracker.mac_address, tracker.description]);
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
    deleteTracker = async (mac) => {
        let deleted;
        try {
            const client = await db_1.dbPool.connect();
            try {
                deleted = (await client.query(`
                    DELETE FROM trackers
                    WHERE mac_address = $1
                    `, [mac])).rowCount;
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
        if (!deleted) {
            return false;
        }
        return true;
    };
}
exports.TrackerRepository = TrackerRepository;
;
