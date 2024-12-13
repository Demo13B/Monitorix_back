"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
class AuthService {
    repo;
    hasher;
    constructor(authRepo, passHasher) {
        this.repo = authRepo;
        this.hasher = passHasher;
    }
    ;
    authenticate = async (login, password) => {
        let credentials;
        try {
            credentials = await this.repo.readCredentials(login);
        }
        catch (error) {
            throw error;
        }
        if (!credentials) {
            return null;
        }
        if (await this.hasher.checkPassword(password, credentials.password_hash)) {
            return credentials;
        }
        return null;
    };
}
exports.AuthService = AuthService;
;
