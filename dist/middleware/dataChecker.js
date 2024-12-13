"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataValidator = void 0;
const db_1 = require("../db");
class DataValidator {
    idCheck = async (req, res, next) => {
        if (!req.params.id) {
            res.sendStatus(400);
            return;
        }
        next();
    };
    facilityCheck = async (req, res, next) => {
        if (!req.body.facility) {
            res.sendStatus(400);
            return;
        }
        let fac = req.body.facility;
        if (!fac.name ||
            !fac.latitude ||
            !fac.longitude) {
            res.sendStatus(400);
            return;
        }
        next();
    };
    brigadeCheck = async (req, res, next) => {
        if (!req.body.brigade) {
            res.sendStatus(400);
            return;
        }
        let brig = req.body.brigade;
        if (!brig.name ||
            !brig.facility_name) {
            res.sendStatus(400);
            return;
        }
        next();
    };
    trackerCheck = async (req, res, next) => {
        if (!req.body.tracker) {
            res.sendStatus(400);
            return;
        }
        let tracker = req.body.tracker;
        if (!tracker.mac_address ||
            !tracker.description) {
            res.sendStatus(400);
            return;
        }
        next();
    };
    userCheck = async (req, res, next) => {
        if (!req.body.user) {
            res.sendStatus(400);
            return;
        }
        let user = req.body.user;
        if (!user.login ||
            !user.password ||
            !user.gender ||
            !user.first_name ||
            !user.last_name ||
            !user.phone_number ||
            !user.profession ||
            !user.role) {
            res.sendStatus(400);
            return;
        }
        if (!user.brigade) {
            req.body.user.brigade = null;
        }
        if (!user.tracker) {
            req.body.user.tracker = null;
        }
        next();
    };
    loginCheck = async (req, res, next) => {
        const login = req.body.user.login;
        let count = 0;
        try {
            const client = await db_1.dbPool.connect();
            try {
                count = (await client.query(`
                    SELECT user_id
                    FROM users
                    WHERE login = $1
                    `, [login])).rowCount;
            }
            catch (queryError) {
                res.sendStatus(503);
                console.error(queryError);
                return;
            }
            finally {
                client.release();
            }
        }
        catch (connError) {
            res.sendStatus(503);
            console.error(connError);
            return;
        }
        if (count != 0) {
            res.sendStatus(400);
            return;
        }
        next();
    };
    dataCheck = async (req, res, next) => {
        if (!req.body.data) {
            res.sendStatus(400);
            return;
        }
        const data = req.body.data;
        if (!data.mac_address ||
            !data.air_pressure ||
            !data.analyzer_alarm ||
            !data.charge ||
            !data.fall ||
            !data.humidity ||
            !data.latitude ||
            !data.longitude ||
            !data.activity ||
            !data.pulse ||
            !data.temperature ||
            !data.time) {
            res.sendStatus(400);
            return;
        }
        next();
    };
    deleteLoginCheck = async (req, res, next) => {
        if (!req.body.login) {
            res.sendStatus(400);
            return;
        }
        next();
    };
    deleteNameCheck = async (req, res, next) => {
        if (!req.body.name) {
            res.sendStatus(400);
            return;
        }
        next();
    };
    deleteMacCheck = async (req, res, next) => {
        if (!req.body.mac) {
            res.sendStatus(400);
            return;
        }
        next();
    };
}
exports.DataValidator = DataValidator;
;
