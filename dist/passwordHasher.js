"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordHasher = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class PasswordHasher {
    saltKey = 10;
    generateHash = async (password) => {
        const salt = await bcrypt_1.default.genSalt(this.saltKey);
        return bcrypt_1.default.hash(password, salt);
    };
    checkPassword = async (password, hash) => {
        return bcrypt_1.default.compare(password, hash);
    };
}
exports.PasswordHasher = PasswordHasher;
;
