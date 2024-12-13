import { dbPool } from "../db";
import { tracker, trackerID, trackerMac } from "models/objects";

export class TrackerRepository {
    public readByName = async (mac_address: string) => {
        let tracker: trackerID;

        try {
            const client = await dbPool.connect();
            try {
                tracker = (await client.query(`
                    SELECT tracker_id
                    FROM trackers
                    WHERE mac_address = $1
                    `, [mac_address])).rows[0];
            } catch (queryError) {
                throw queryError;
            } finally {
                client.release();
            }
        } catch (connError) {
            throw connError;
        }

        if (tracker === undefined) {
            return undefined;
        }

        return tracker.tracker_id;
    };

    public readTrackerNames = async () => {
        let res: trackerMac[];

        try {
            const client = await dbPool.connect();
            try {
                res = (await client.query(`
                    SELECT mac_address
                    FROM trackers
                    `)).rows;
            } catch (queryError) {
                throw queryError;
            } finally {
                client.release();
            }
        } catch (connError) {
            throw connError;
        }

        return res;
    }

    public writeTracker = async (tracker: tracker) => {
        try {
            const client = await dbPool.connect();
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
            } catch (queryError) {
                throw queryError;
            } finally {
                client.release();
            }
        } catch (connError) {
            throw connError;
        }
    };

    public deleteTracker = async (mac: string) => {
        let deleted: number | null;

        try {
            const client = await dbPool.connect();
            try {
                deleted = (await client.query(`
                    DELETE FROM trackers
                    WHERE mac_address = $1
                    `, [mac])).rowCount;
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