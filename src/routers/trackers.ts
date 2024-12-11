import { Router, Request, Response } from "express";
import { AuthValidation } from "middleware/auth";
import { DataValidator } from "middleware/dataChecker";
import { TrackerService } from "service/trackers";

export class TrackerRouter {
    private readonly _router

    constructor(
        service: TrackerService,
        auth: AuthValidation,
        check: DataValidator
    ) {
        this._router = Router();

        this._router.post('/',
            auth.userPassCheck,
            auth.authValid,
            auth.adminCheck,
            check.trackerCheck,
            async (req: Request, res: Response) => {
                try {
                    await service.insert(req.body.tracker);
                } catch (error) {
                    res.sendStatus(503);
                    console.log(error);
                    return;
                }

                res.sendStatus(201);
            }
        );
    };

    public get_internal = () => {
        return this._router;
    }
};