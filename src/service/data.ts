import { data } from "models/objects";
import { PasswordHasher } from "passwordHasher";
import { DataRepository } from "repository/data";

export class DataService {
    private readonly _repo: DataRepository;
    private readonly _hasher: PasswordHasher;

    constructor(repo: DataRepository, hasher: PasswordHasher) {
        this._repo = repo;
        this._hasher = hasher;
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
};