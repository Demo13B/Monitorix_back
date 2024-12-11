"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
    _repo;
    constructor(repo) {
        this._repo = repo;
    }
    findUsers = async (user_id, brigade_id, access_rights) => {
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
}
exports.UserService = UserService;
;
