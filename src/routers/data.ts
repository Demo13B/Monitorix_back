import { Router, Request, Response } from "express";
import { AuthValidation } from "middleware/auth";
import { DataValidator } from "middleware/dataChecker";
import { data } from "models/objects";
import { DataService } from "service/data";

export class DataRouter {
    private readonly _router: Router;

    constructor(service: DataService, auth: AuthValidation, data: DataValidator, check: DataValidator) {
        this._router = Router();

        this._router.get('/', auth.userPassCheck, auth.authValid, async (req: Request, res: Response) => {
            const user_id = req.body.user_id;
            const ar = req.body.access_rights;
            const brigade_id = req.body.brigade_id;

            let result: data[] | null = null;

            try {
                result = await service.findData(user_id, brigade_id, ar);
            } catch (error) {
                res.sendStatus(503);
                console.log(error);
                return;
            }

            res.status(200).json(result);
        });

        this._router.get('/:id',
            auth.userPassCheck,
            auth.authValid,
            data.idCheck,
            async (req: Request, res: Response) => {
                const user_id = req.body.user_id;
                const ar = req.body.access_rights;
                const brigade_id = req.body.brigade_id;
                const query_id = req.params.id;
                let result: data[] | null = null;

                try {
                    result = await service.findLastData(query_id);
                } catch (error) {
                    res.sendStatus(503);
                    console.error(error);
                    return;
                }

                res.status(200).json(result);
            }
        );

        this._router.post('/',
            auth.userPassCheck,
            auth.authValid,
            auth.adminCheck,
            check.dataCheck,
            async (req: Request, res: Response) => {
                let status: boolean;

                try {
                    status = await service.insertData(req.body.data);
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
    };

    public get_internal = () => {
        return this._router;
    };
};