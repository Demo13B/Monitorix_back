import { Router, Request, Response } from "express";
import { AuthValidation } from "middleware/auth";
import { user } from "models/objects";
import { UserService } from "service/users";

export class UserRouter {
    private readonly _router: Router;

    constructor(service: UserService, auth: AuthValidation) {
        this._router = Router();

        this._router.get('/', auth.userPassCheck, auth.authValid, async (req: Request, res: Response) => {
            const user_id = req.body.user_id;
            const ar = req.body.access_rights;
            let result: user[] | null = null;
            try {
                result = await service.findUsers(user_id, ar);
            } catch {
                res.sendStatus(502);
                return;
            }

            res.status(200).json(result);
        });
    };

    public get_internal = () => {
        return this._router;
    };
};