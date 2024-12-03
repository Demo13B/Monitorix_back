import { Request, Response, Router } from "express";
import { AuthValidation } from "middleware/auth";
import { brigade } from "models/objects";
import { BrigadesService } from "service/brigades";

export class BrigadesRouter {
    private readonly _router: Router;

    constructor(service: BrigadesService, auth: AuthValidation) {
        this._router = Router();

        this._router.get('/',
            auth.userPassCheck,
            auth.authValid,
            auth.adminCheck,
            async (req: Request, res: Response) => {
                let result: brigade[];

                try {
                    result = await service.findBrigades();
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