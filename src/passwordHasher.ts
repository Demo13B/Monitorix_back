import bcrypt from "bcrypt"

export class PasswordHasher {
    private saltKey = 10;

    public generateHash = async (password: string) => {
        const salt = await bcrypt.genSalt(this.saltKey);
        return bcrypt.hash(password, salt);
    };

    public checkPassword = async (password: string, hash: string) => {
        return bcrypt.compare(password, hash);
    };
};