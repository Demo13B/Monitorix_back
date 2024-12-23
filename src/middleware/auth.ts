import { Request, Response, NextFunction } from "express";
import { credentials } from "models/auth";
import { AuthService } from "service/auth";

export class AuthValidation {
    private readonly _authService: AuthService;

    constructor(service: AuthService) {
        this._authService = service;
    };

    public userPassCheck = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.username || !req.body.password) {
            res.sendStatus(400);
            return;
        }
        next();
    };

    public adminCheck = async (req: Request, res: Response, next: NextFunction) => {
        if (req.body.access_rights != 3) {
            res.sendStatus(401);
            return;
        }

        next();
    };

    public authValid = async (req: Request, res: Response, next: NextFunction) => {
        const user: string = req.body.username;
        const password: string = req.body.password;

        let cred: credentials | null = null;
        try {
            cred = await this._authService.authenticate(user, password)
        } catch (error) {
            res.sendStatus(503);
            console.error(error);
            return;
        }

        if (!cred) {
            res.sendStatus(401);
            return;
        }

        req.body.user_id = cred.user_id;
        req.body.access_rights = cred.access_rights;
        req.body.brigade_id = cred.brigade_id;

        next();
    };
};