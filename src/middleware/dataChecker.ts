import { Request, Response, NextFunction } from "express";

export class DataValidator {
    public idCheck = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.params.id) {
            res.sendStatus(400);
            return;
        }
        next();
    };
};