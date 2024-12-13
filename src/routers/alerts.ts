import { Router, Request, Response } from "express";
import { AuthValidation } from "middleware/auth";
import { DataValidator } from "middleware/dataChecker";
import { alert, brigadeStat, facilityStat, userStat } from "models/objects";
import { AlertsRepository } from "repository/alerts";
import { AlertsService } from "service/alerts";

export class AlertsRouter {
    private readonly _router: Router;

    constructor(service: AlertsService, repo: AlertsRepository, auth: AuthValidation, check: DataValidator) {
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

        this._router.get('/stats/users',
            auth.userPassCheck,
            auth.authValid,
            auth.adminCheck,
            async (req: Request, res: Response) => {
                let result: userStat[];
                try {
                    result = await service.findStats(1) as userStat[];
                } catch (error) {
                    res.sendStatus(503);
                    console.error(error);
                    return;
                }

                res.status(200).json(result);
            }
        );

        this._router.get('/stats/brigades',
            auth.userPassCheck,
            auth.authValid,
            auth.adminCheck,
            async (req: Request, res: Response) => {
                let result: brigadeStat[];
                try {
                    result = await service.findStats(2) as brigadeStat[];
                } catch (error) {
                    res.sendStatus(503);
                    console.error(error);
                    return;
                }

                res.status(200).json(result);
            }
        );

        this._router.get('/stats/facilities',
            auth.userPassCheck,
            auth.authValid,
            auth.adminCheck,
            async (req: Request, res: Response) => {
                let result: facilityStat[];
                try {
                    result = await service.findStats(3) as facilityStat[];
                } catch (error) {
                    res.sendStatus(503);
                    console.error(error);
                    return;
                }

                res.status(200).json(result);
            }
        );

        this._router.delete('/',
            auth.userPassCheck,
            auth.authValid,
            auth.adminCheck,
            check.deleteLoginCheck,
            async (req: Request, res: Response) => {
                let status: boolean;

                try {
                    status = await service.remove(req.body.login);
                } catch (error) {
                    res.sendStatus(503);
                    console.error(error);
                    return;
                }

                if (!status) {
                    res.sendStatus(400);
                    return;
                }

                res.sendStatus(200);
            }
        );
    };

    public get_internal = () => {
        return this._router;
    };
};