import { Request, Response, NextFunction } from "express";
import { brigadeInput, facility } from "models/objects";

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
};