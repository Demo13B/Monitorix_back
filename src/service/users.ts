import { user } from "models/objects";
import { UserRepository } from "repository/users";

export class UserService {
    private readonly _repo: UserRepository;

    constructor(repo: UserRepository) {
        this._repo = repo;
    }

    public findUsers = async (user_id: string, brigade_id: string, access_rights: number) => {
        let res: user[];

        if (access_rights === 1) {
            try {
                res = await this._repo.readByID(user_id);
            } catch (error) {
                throw error;
            }
            return res;
        }

        if (access_rights === 2) {
            try {
                res = await this._repo.readByBrigade(brigade_id);
            } catch (error) {
                throw error;
            }
            return res;
        }

        if (access_rights === 3) {
            try {
                res = await this._repo.readAll();
            } catch (error) {
                throw error;
            }
            return res;
        }

        return null;
    };
};