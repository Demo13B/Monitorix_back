"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackerService = void 0;
class TrackerService {
    _repo;
    constructor(repo) {
        this._repo = repo;
    }
    ;
    readNames = async () => {
        let queryRes;
        try {
            queryRes = await this._repo.readTrackerNames();
        }
        catch (error) {
            throw error;
        }
        let res = [];
        for (let mac of queryRes) {
            res.push(mac.mac_address);
        }
        return res;
    };
    insert = async (tracker) => {
        try {
            await this._repo.writeTracker(tracker);
        }
        catch (error) {
            throw error;
        }
    };
    remove = async (mac) => {
        let status;
        try {
            status = await this._repo.deleteTracker(mac);
        }
        catch (error) {
            throw error;
        }
        return status;
    };
}
exports.TrackerService = TrackerService;
;
