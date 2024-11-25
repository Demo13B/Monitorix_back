import { AuthRepo } from "../repository/auth";
import { PasswordHasher } from "../passwordHasher"
import { credentials } from "../models/auth";

export class AuthService {
    private readonly repo: AuthRepo;
    private readonly hasher: PasswordHasher;

    constructor(authRepo: AuthRepo, passHasher: PasswordHasher) {
        this.repo = authRepo;
        this.hasher = passHasher;
    };

    public authenticate = async (login: string, password: string) => {
        let credentials: credentials;

        try {
            credentials = await this.repo.readCredentials(login);
        } catch (error) {
            throw error;
        }

        if (!credentials) {
            return null;
        }

        if (await this.hasher.checkPassword(password, credentials.password_hash)) {
            return credentials
        }

        return null;
    };
};