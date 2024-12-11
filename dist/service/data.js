"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataService = void 0;
class DataService {
    _repo;
    _trackerRepo;
    constructor(repo, trackerRepo) {
        this._repo = repo;
        this._trackerRepo = trackerRepo;
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
    insertData = async (data) => {
        let tracker;
        try {
            tracker = await this._trackerRepo.readByName(data.mac_address);
        }
        catch (error) {
            throw error;
        }
        if (tracker === undefined) {
            return false;
        }
        const dataDB = {
            tracker_id: tracker,
            air_pressure: data.air_pressure,
            pulse: data.pulse,
            latitude: data.latitude,
            longitude: data.longitude,
            temperature: data.temperature,
            humidity: data.humidity,
            charge: data.charge,
            activity: data.activity,
            fall: data.fall,
            analyzer_alarm: data.analyzer_alarm,
            time: data.time
        };
        try {
            await this._repo.writeData(dataDB);
        }
        catch (error) {
            throw error;
        }
        return true;
    };
}
exports.DataService = DataService;
;
