"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbPool = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.dbPool = new pg_1.Pool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    port: Number(process.env.DBPORT),
    password: process.env.DBPASSWD,
    database: process.env.DBNAME,
    max: 20,
    idleTimeoutMillis: 3000,
    connectionTimeoutMillis: 3000
});
