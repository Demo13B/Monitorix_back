import { dbPool } from "../db";
import { Request, Response, NextFunction } from "express";
import { brigadeInput, dataInput, facility, tracker, userInput } from "models/objects";

export class DataValidator {
    public idCheck = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.params.id) {
            res.sendStatus(400);
            return;
        }

        next();
    };

    public facilityCheck = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.facility) {
            res.sendStatus(400);
            return;
        }

        let fac = req.body.facility as facility;

        if (!fac.name ||
            !fac.latitude ||
            !fac.longitude
        ) {
            res.sendStatus(400);
            return;
        }

        next();
    };

    public brigadeCheck = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.brigade) {
            res.sendStatus(400);
            return;
        }

        let brig: brigadeInput = req.body.brigade as brigadeInput;

        if (!brig.name ||
            !brig.facility_name
        ) {
            res.sendStatus(400);
            return;
        }

        next();
    };

    public trackerCheck = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.tracker) {
            res.sendStatus(400);
            return;
        }

        let tracker: tracker = req.body.tracker as tracker;

        if (!tracker.mac_address ||
            !tracker.description
        ) {
            res.sendStatus(400);
            return;
        }

        next();
    };

    public userCheck = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.user) {
            res.sendStatus(400);
            return;
        }

        let user: userInput = req.body.user as userInput;

        if (!user.login ||
            !user.password ||
            !user.gender ||
            !user.first_name ||
            !user.last_name ||
            !user.phone_number ||
            !user.profession ||
            !user.role
        ) {
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

    public loginCheck = async (req: Request, res: Response, next: NextFunction) => {
        const login = req.body.user.login;
        let count: number | null = 0;

        try {
            const client = await dbPool.connect();
            try {
                count = (await client.query(`
                    SELECT user_id
                    FROM users
                    WHERE login = $1
                    `, [login])).rowCount
            } catch (queryError) {
                res.sendStatus(503);
                console.error(queryError);
                return;
            } finally {
                client.release();
            }
        } catch (connError) {
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

    public dataCheck = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.data) {
            res.sendStatus(400);
            return;
        }

        const data = req.body.data as dataInput;

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
            !data.time
        ) {
            res.sendStatus(400);
            return;
        }

        next();
    };

    public deleteLoginCheck = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.login) {
            res.sendStatus(400);
            return;
        }

        next();
    };
};