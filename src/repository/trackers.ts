import { dbPool } from "../db";
import { tracker, trackerID } from "models/objects";

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
};