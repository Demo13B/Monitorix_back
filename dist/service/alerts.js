"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertsService = void 0;
class AlertsService {
    _repo;
    constructor(repo) {
        this._repo = repo;
    }
    findAlerts = async (user_id, brigade_id, access_rights) => {
        let res;
        if (access_rights === 1) {
            try {
                res = await this._repo.readByID(user_id);
            }
            catch (error) {
                throw error;
            }
            return res;
        }
        if (access_rights === 2) {
            try {
                res = await this._repo.readByBrigade(brigade_id);
            }
            catch (error) {
                throw error;
            }
            return res;
        }
        if (access_rights === 3) {
            try {
                res = await this._repo.readAll();
            }
            catch (error) {
                throw error;
            }
            return res;
        }
        return null;
    };
    findStats = async (code) => {
        try {
            if (code === 1)
                return await this._repo.readStatsByUser();
            if (code === 2)
                return await this._repo.readStatsByBrigade();
            if (code === 3)
                return await this._repo.readStatsByFacility();
        }
        catch (error) {
            throw error;
        }
    };
}
exports.AlertsService = AlertsService;
;
