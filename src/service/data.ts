import { data } from "models/objects";
import { DataRepository } from "repository/data";

export class DataService {
    private readonly _repo: DataRepository;

    constructor(repo: DataRepository) {
        this._repo = repo;
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
};