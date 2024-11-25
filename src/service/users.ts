import { PasswordHasher } from "passwordHasher";
import { UserRepository } from "repository/users";

export class UserService {
    private readonly _repo: UserRepository;
    private readonly _hasher: PasswordHasher;

    constructor(repo: UserRepository, hasher: PasswordHasher) {
        this._repo = repo;
        this._hasher = hasher;
    }

    public findUsers = async (user_id: string, access_rights: number) => {
        if (access_rights === 1) {
            return (await this._repo.readByID(user_id))
        }
        return null;
    };
};