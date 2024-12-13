"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrigadesService = void 0;
class BrigadesService {
    _repo;
    _facRepo;
    constructor(repo, facRepo) {
        this._repo = repo;
        this._facRepo = facRepo;
    }
    findBrigades = async () => {
        let brigades;
        try {
            brigades = await this._repo.readAll();
        }
        catch (error) {
            throw error;
        }
        return brigades;
    };
    insert = async (brig) => {
        let id;
        try {
            id = await this._facRepo.readByName(brig.facility_name);
        }
        catch (error) {
            throw error;
        }
        if (id === null) {
            return false;
        }
        let brigDB = {
            name: brig.name,
            facility_id: id
        };
        try {
            await this._repo.writeBrigade(brigDB);
        }
        catch (error) {
            throw error;
        }
        return true;
    };
    removeBrigade = async (name) => {
        let result;
        try {
            result = await this._repo.deleteBrigade(name);
        }
        catch (error) {
            throw error;
        }
        return result;
    };
}
exports.BrigadesService = BrigadesService;
;
