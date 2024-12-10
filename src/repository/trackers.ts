import { dbPool } from "../db";
import { tracker } from "models/objects";

export class TrackerRepository {
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