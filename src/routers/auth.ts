import { Router, Request, Response } from "express";
import { AuthValidation } from "../middleware/auth";
import { AuthService } from "../service/auth";
import { credentials } from "models/auth";

export class AuthRouter {
    private readonly _router: Router;

    constructor(service: AuthService, auth: AuthValidation) {
        this._router = Router();

        this._router.get('/', auth.userPassCheck, auth.authValid, async (req: Request, res: Response) => {
            const username = req.body.username;
            const password = req.body.password;

            let cred: credentials | null = null;
            try {
                cred = await service.authenticate(username, password);
            } catch {
                res.sendStatus(502);
                return;
            }

            if (!cred) {
                res.sendStatus(401)
                return;
            };

            res.status(200).json(cred);
        });

    };

    public get_internal = () => {
        return this._router;
    };
}