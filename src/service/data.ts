import { alertDB, data, dataDB, dataInput } from "models/objects";
import { RedisDB } from "rdb";
import { DataRepository } from "repository/data";
import { TrackerRepository } from "repository/trackers";

export class DataService {
    private readonly _repo: DataRepository;
    private readonly _trackerRepo: TrackerRepository;
    private readonly _rdb: RedisDB;

    constructor(repo: DataRepository, trackerRepo: TrackerRepository, rdb: RedisDB) {
        this._repo = repo;
        this._trackerRepo = trackerRepo;
        this._rdb = rdb;
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

        // Constructing basic alert

        let alert: alertDB = {
            tracker_id: dataDB.tracker_id,
            time: dataDB.time,
            type: 0,
            message: ''
        }

        // Generating promises for alerts

        let promises: Array<Promise<number>> = [];

        if (dataDB.air_pressure <= 800) {
            alert.type = 2;
            alert.message = 'The air pressure is dangerously low!';

            promises.push(
                this._rdb.publish('alerts', JSON.stringify(alert))
            );
        } else if (dataDB.air_pressure <= 900) {
            alert.type = 1;
            alert.message = 'The air pressure is below normal limit';

            promises.push(
                this._rdb.publish('alerts', JSON.stringify(alert))
            );
        } else if (dataDB.air_pressure >= 1200) {
            alert.type = 2;
            alert.message = 'The air pressure is dangerously high!';

            promises.push(
                this._rdb.publish('alerts', JSON.stringify(alert))
            );
        } else if (dataDB.air_pressure >= 1100) {
            alert.type = 1;
            alert.message = 'The air pressure is above normal limit';

            promises.push(
                this._rdb.publish('alerts', JSON.stringify(alert))
            );
        }

        if (dataDB.pulse <= 50) {
            alert.type = 2;
            alert.message = 'The pulse is dangerously low!';

            promises.push(
                this._rdb.publish('alerts', JSON.stringify(alert))
            );
        } else if (dataDB.pulse <= 60) {
            alert.type = 1;
            alert.message = 'The pulse is below normal limit';

            promises.push(
                this._rdb.publish('alerts', JSON.stringify(alert))
            );
        } else if (dataDB.pulse >= 150) {
            alert.type = 2;
            alert.message = 'The pulse is dangerously high';

            promises.push(
                this._rdb.publish('alerts', JSON.stringify(alert))
            );
        } else if (dataDB.pulse >= 120) {
            alert.type = 1;
            alert.message = 'The pulse is above normal limit';

            promises.push(
                this._rdb.publish('alerts', JSON.stringify(alert))
            );
        }

        if (dataDB.temperature <= -10) {
            alert.type = 2;
            alert.message = 'The ambient temperature is dangerously low!';

            promises.push(
                this._rdb.publish('alerts', JSON.stringify(alert))
            );
        } else if (dataDB.temperature <= 0) {
            alert.type = 1;
            alert.message = 'The ambient temperature is below normal limit';

            promises.push(
                this._rdb.publish('alerts', JSON.stringify(alert))
            );
        } else if (dataDB.temperature >= 35) {
            alert.type = 2;
            alert.message = 'The ambient temperature is dangerously high!';

            promises.push(
                this._rdb.publish('alerts', JSON.stringify(alert))
            );
        } else if (dataDB.temperature >= 25) {
            alert.type = 1;
            alert.message = 'The ambient temperature is above normal limit';

            promises.push(
                this._rdb.publish('alerts', JSON.stringify(alert))
            );
        }

        if (dataDB.humidity <= 30) {
            alert.type = 2;
            alert.message = 'The humidity is dangerously low!';

            promises.push(
                this._rdb.publish('alerts', JSON.stringify(alert))
            );
        } else if (dataDB.humidity <= 40) {
            alert.type = 1;
            alert.message = 'The humidity is above normal limit';

            promises.push(
                this._rdb.publish('alerts', JSON.stringify(alert))
            );
        } else if (dataDB.humidity >= 80) {
            alert.type = 2;
            alert.message = 'The humidity is dangerously high!';

            promises.push(
                this._rdb.publish('alerts', JSON.stringify(alert))
            );
        } else if (dataDB.humidity >= 70) {
            alert.type = 1;
            alert.message = 'The humidity is above normal limit';

            promises.push(
                this._rdb.publish('alerts', JSON.stringify(alert))
            );
        }

        if (dataDB.charge <= 10) {
            alert.type = 2;
            alert.message = 'The battery is low!';

            promises.push(
                this._rdb.publish('alerts', JSON.stringify(alert))
            );
        } else if (dataDB.charge <= 20) {
            alert.type = 1;
            alert.message = 'The battery is going low';

            promises.push(
                this._rdb.publish('alerts', JSON.stringify(alert))
            );
        }

        if (dataDB.activity === false) {
            alert.type = 2;
            alert.message = 'The worker is inactive!';

            promises.push(
                this._rdb.publish('alerts', JSON.stringify(alert))
            );
        }

        if (dataDB.fall === true) {
            alert.type = 2;
            alert.message = 'The worker fell!';

            promises.push(
                this._rdb.publish('alerts', JSON.stringify(alert))
            );
        }

        if (dataDB.analyzer_alarm === true) {
            alert.type = 2;
            alert.message = 'The gas analyzer shows high level of dangerous gases!';

            promises.push(
                this._rdb.publish('alerts', JSON.stringify(alert))
            );
        }

        // Waiting all promises to wrap up

        for (let promise of promises) {
            await promise;
        }

        return true;
    }
};