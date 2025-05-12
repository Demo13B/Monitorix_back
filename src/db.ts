import { Pool } from "pg";

export const dbPool = new Pool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    port: Number(process.env.DBPORT),
    password: process.env.DBPASSWD,
    database: process.env.DBNAME,
    max: 20,
    idleTimeoutMillis: 3000,
    connectionTimeoutMillis: 3000
});