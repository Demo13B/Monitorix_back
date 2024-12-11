"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
    _repo;
    _brigRepo;
    _authRepo;
    _trackerRepo;
    _hasher;
    constructor(repo, brigRepo, authRepo, trackerRepo, hasher) {
        this._repo = repo;
        this._brigRepo = brigRepo;
        this._authRepo = authRepo;
        this._trackerRepo = trackerRepo;
        this._hasher = hasher;
    }
    findUsers = async (user_id, brigade_id, access_rights) => {
        let res;
        if (access_rights === 1) {
            try {
                res = await this._repo.readByID(user_id);
            }
            catch (error) {
                throw error;
            }
            return res;
        }
        if (access_rights === 2) {
            try {
                res = await this._repo.readByBrigade(brigade_id);
            }
            catch (error) {
                throw error;
            }
            return res;
        }
        if (access_rights === 3) {
            try {
                res = await this._repo.readAll();
            }
            catch (error) {
                throw error;
            }
            return res;
        }
        return null;
    };
    insert = async (user) => {
        let role_id;
        let brigade_id;
        let tracker_id;
        try {
            role_id = await this._authRepo.readRoleByName(user.role);
        }
        catch (error) {
            throw error;
        }
        if (role_id === null) {
            return false;
        }
        if (user.brigade !== null) {
            try {
                brigade_id = await this._brigRepo.readByName(user.brigade);
            }
            catch (error) {
                throw error;
            }
            if (brigade_id === undefined) {
                return false;
            }
        }
        else {
            brigade_id = undefined;
        }
        if (user.tracker !== null) {
            try {
                tracker_id = await this._trackerRepo.readByName(user.tracker);
            }
            catch (error) {
                throw error;
            }
            if (tracker_id === undefined) {
                return false;
            }
        }
        else {
            tracker_id = undefined;
        }
        const userDB = {
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
        };
        try {
            await this._repo.writeUser(userDB);
        }
        catch (error) {
            throw error;
        }
        return true;
    };
}
exports.UserService = UserService;
;
