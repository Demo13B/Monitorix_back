"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilitiesService = void 0;
class FacilitiesService {
    _repo;
    constructor(repo) {
        this._repo = repo;
    }
    ;
    findAll = async () => {
        let res;
        try {
            res = await this._repo.readAll();
        }
        catch (error) {
            throw error;
        }
        return res;
    };
    insert = async (fac) => {
        try {
            await this._repo.writeFacility(fac);
        }
        catch (error) {
            throw error;
        }
    };
    remove = async (name) => {
        let status;
        try {
            status = await this._repo.deleteFacility(name);
        }
        catch (error) {
            throw error;
        }
        return status;
    };
}
exports.FacilitiesService = FacilitiesService;
;
