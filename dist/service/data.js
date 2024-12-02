"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataService = void 0;
class DataService {
    _repo;
    constructor(repo) {
        this._repo = repo;
    }
    findData = async (user_id, brigade_id, access_rights) => {
        let res;
        if (access_rights === 1) {
            try {
                res = await this._repo.readByID(user_id);
            }
            catch (serviceError) {
                throw serviceError;
            }
            return res;
        }
        if (access_rights === 2) {
            try {
                res = await this._repo.readByBrigade(brigade_id);
            }
            catch (serviceError) {
                throw serviceError;
            }
            return res;
        }
        if (access_rights === 3) {
            try {
                res = await this._repo.readAll();
            }
            catch (serviceError) {
                throw serviceError;
            }
            return res;
        }
        return null;
    };
    findLastData = async (user_id) => {
        return await this._repo.readLastData(user_id);
    };
}
exports.DataService = DataService;
;
