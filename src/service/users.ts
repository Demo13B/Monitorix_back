import { user, userInput, userDB } from "models/objects";
import { PasswordHasher } from "passwordHasher";
import { AuthRepo } from "repository/auth";
import { BrigadeRepository } from "repository/brigades";
import { TrackerRepository } from "repository/trackers";
import { UserRepository } from "repository/users";

export class UserService {
    private readonly _repo: UserRepository;
    private readonly _brigRepo: BrigadeRepository;
    private readonly _authRepo: AuthRepo;
    private readonly _trackerRepo: TrackerRepository;
    private readonly _hasher: PasswordHasher

    constructor(
        repo: UserRepository,
        brigRepo: BrigadeRepository,
        authRepo: AuthRepo,
        trackerRepo: TrackerRepository,
        hasher: PasswordHasher
    ) {
        this._repo = repo;
        this._brigRepo = brigRepo;
        this._authRepo = authRepo;
        this._trackerRepo = trackerRepo;
        this._hasher = hasher;
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

    public insert = async (user: userInput) => {
        let role_id: number | null;
        let brigade_id: number | undefined;
        let tracker_id: number | undefined;

        try {
            role_id = await this._authRepo.readRoleByName(user.role);
        } catch (error) {
            throw error;
        }


        if (role_id === null) {
            return false;
        }

        if (user.brigade !== null) {
            try {
                brigade_id = await this._brigRepo.readByName(user.brigade);
            } catch (error) {
                throw error;
            }

            if (brigade_id === undefined) {
                return false;
            }
        } else {
            brigade_id = undefined;
        }

        if (user.tracker !== null) {
            try {
                tracker_id = await this._trackerRepo.readByName(user.tracker);
            } catch (error) {
                throw error;
            }

            if (tracker_id === undefined) {
                return false;
            }
        } else {
            tracker_id = undefined;
        }

        const userDB: userDB = {
            login: user.login,
            password_hash: await this._hasher.generateHash(user.password),
            gender: user.gender,
            first_name: user.first_name,
            last_name: user.last_name,
            phone_number: user.phone_number,
            profession: user.profession,
            role_id: role_id,
            brigade_id: brigade_id,
            tracker_id: tracker_id
        }

        try {
            await this._repo.writeUser(userDB);
        } catch (error) {
            throw error;
        }

        return true;
    };


    public remove = async (login: string) => {
        let result: boolean;
        try {
            result = await this._repo.deleteUserByLogin(login);
        } catch (error) {
            throw error;
        }

        return result;
    }
};