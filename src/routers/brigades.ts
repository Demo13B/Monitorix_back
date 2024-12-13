import { Request, Response, Router } from "express";
import { AuthValidation } from "middleware/auth";
import { DataValidator } from "middleware/dataChecker";
import { brigade, brigadeInput } from "models/objects";
import { BrigadesService } from "service/brigades";

export class BrigadesRouter {
    private readonly _router: Router;

    constructor(service: BrigadesService, auth: AuthValidation, check: DataValidator) {
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

        this._router.get('/names',
            auth.userPassCheck,
            auth.authValid,
            auth.adminCheck,
            async (req: Request, res: Response) => {
                let result: string[];

                try {
                    result = await service.readNames();
                } catch (error) {
                    res.sendStatus(503);
                    console.error(error);
                    return;
                }

                res.status(200).send(result);
            }
        );

        this._router.post('/',
            auth.userPassCheck,
            auth.authValid,
            auth.adminCheck,
            check.brigadeCheck,
            async (req: Request, res: Response) => {
                const brig: brigadeInput = req.body.brigade;

                let status: boolean;
                try {
                    status = await service.insert(brig);
                } catch (error) {
                    res.sendStatus(503);
                    console.error(error);
                    return;
                }

                if (status) {
                    res.sendStatus(201);
                    return;
                }

                res.sendStatus(400);
            }
        );

        this._router.delete('/',
            auth.userPassCheck,
            auth.authValid,
            auth.adminCheck,
            check.deleteNameCheck,
            async (req: Request, res: Response) => {
                let status: boolean;

                try {
                    status = await service.removeBrigade(req.body.name);
                } catch (error) {
                    res.sendStatus(503);
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