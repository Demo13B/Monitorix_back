import { PasswordHasher } from "passwordHasher";
import { DataRepository } from "repository/data";

export class DataService {
    private readonly _repo: DataRepository;
    private readonly _hasher: PasswordHasher;

    constructor(repo: DataRepository, hasher: PasswordHasher) {
        this._repo = repo;
        this._hasher = hasher;
    }

    public findData = async (user_id: string, access_rights: number) => {
        if (access_rights === 1) {
            return (await this._repo.readByID(user_id))
        }
        return null;
    };
};