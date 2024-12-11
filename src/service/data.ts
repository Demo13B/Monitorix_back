import { data, dataDB, dataInput, trackerID } from "models/objects";
import { DataRepository } from "repository/data";
import { TrackerRepository } from "repository/trackers";

export class DataService {
    private readonly _repo: DataRepository;
    private readonly _trackerRepo: TrackerRepository;

    constructor(repo: DataRepository, trackerRepo) {
        this._repo = repo;
        this._trackerRepo = trackerRepo;
    }

    public findData = async (user_id: string, brigade_id: string, access_rights: number) => {
        let res: data[];
        if (access_rights === 1) {
            try {
                res = await this._repo.readByID(user_id);
            } catch (serviceError) {
                throw serviceError;
            }
            return res;
        }

        if (access_rights === 2) {
            try {
                res = await this._repo.readByBrigade(brigade_id);
            } catch (serviceError) {
                throw serviceError;
            }
            return res;
        }

        if (access_rights === 3) {
            try {
                res = await this._repo.readAll();
            } catch (serviceError) {
                throw serviceError;
            }
            return res;
        }

        return null;
    };

    public findLastData = async (user_id: string) => {
        return await this._repo.readLastData(user_id);
    };

    public insertData = async (data: dataInput) => {
        let tracker: number | undefined;

        try {
            tracker = await this._trackerRepo.readByName(data.mac_address)
        } catch (error) {
            throw error;
        }

        if (tracker === undefined) {
            return false;
        }

        const dataDB: dataDB = {
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
        } catch (error) {
            throw error;
        }

        return true;
    }
};