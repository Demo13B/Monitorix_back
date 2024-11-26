import { Router, Request, Response } from "express";
import { AuthValidation } from "middleware/auth";
import { data } from "models/objects";
import { DataService } from "service/data";

export class DataRouter {
    private readonly _router: Router;

    constructor(service: DataService, auth: AuthValidation) {
        this._router = Router();

        this._router.get('/', auth.userPassCheck, auth.authValid, async (req: Request, res: Response) => {
            const user_id = req.body.user_id;
            const ar = req.body.access_rights;
            const brigade_id = req.body.brigade_id;

            let result: data[] | null = null;

            try {
                result = await service.findData(user_id, brigade_id, ar);
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