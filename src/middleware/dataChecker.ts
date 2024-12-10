import { Request, Response, NextFunction } from "express";
import { facility } from "models/objects";

export class DataValidator {
    public idCheck = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.params.id) {
            res.sendStatus(400);
            return;
        }

        next();
    };

    public facilityCheck = async (req: Request, res: Response, next: NextFunction) => {
        let fac = req.body.facility as facility;

        if (!fac.name ||
            !fac.latitude ||
            !fac.longitude
        ) {
            res.sendStatus(400);
            return;
        }

        next();
    }
};