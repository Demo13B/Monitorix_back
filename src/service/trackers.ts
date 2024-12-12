import { tracker } from "models/objects";
import { TrackerRepository } from "repository/trackers";

export class TrackerService {
    private readonly _repo: TrackerRepository;

    constructor(repo: TrackerRepository) {
        this._repo = repo;
    };

    public insert = async (tracker: tracker) => {
        try {
            await this._repo.writeTracker(tracker);
        } catch (error) {
            throw error;
        }
    };

    public remove = async (mac: string) => {
        let status: boolean;

        try {
            status = await this._repo.deleteTracker(mac);
        } catch (error) {
            throw error;
        }

        return status;
    };
};