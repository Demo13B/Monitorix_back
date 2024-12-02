import { Router, Request, Response } from "express";
import { AuthValidation } from "middleware/auth";
import { alert } from "models/objects";
import { AlertsRepository } from "repository/alerts";
import { AlertsService } from "service/alerts";

export class AlertsRouter {
    private readonly _router: Router;

    constructor(service: AlertsService, repo: AlertsRepository, auth: AuthValidation) {
        this._router = Router();

        this._router.get('/', auth.userPassCheck, auth.authValid, async (req: Request, res: Response) => {
            const user_id = req.body.user_id;
            const brigade_id = req.body.brigade_id;
            const ar = req.body.access_rights;
            let result: alert[] | null

            try {
                result = await service.findAlerts(user_id, brigade_id, ar);
            } catch (error) {
                res.sendStatus(503);
                console.error(error);
                return;
            }

            res.status(200).json(result);
        });
    };

    public get_internal = () => {
        return this._router;
    };
};