"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackerService = void 0;
class TrackerService {
    _repo;
    constructor(repo) {
        this._repo = repo;
    }
    ;
    insert = async (tracker) => {
        try {
            await this._repo.writeTracker(tracker);
        }
        catch (error) {
            throw error;
        }
    };
}
exports.TrackerService = TrackerService;
;
