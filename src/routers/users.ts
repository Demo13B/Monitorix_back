import { Router, Request, Response } from "express";
import { AuthValidation } from "middleware/auth";
import { DataValidator } from "middleware/dataChecker";
import { user } from "models/objects";
import { UserService } from "service/users";

export class UserRouter {
    private readonly _router: Router;

    constructor(service: UserService, auth: AuthValidation, check: DataValidator) {
        this._router = Router();

        this._router.get('/', auth.userPassCheck, auth.authValid, async (req: Request, res: Response) => {
            const user_id = req.body.user_id;
            const ar = req.body.access_rights;
            const brigade_id = req.body.brigade_id;
            let result: user[] | null = null;

            try {
                result = await service.findUsers(user_id, brigade_id, ar);
            } catch (error) {
                res.sendStatus(503);
                console.error(error);
                return;
            }

            res.status(200).json(result);
        });


        this._router.post('/',
            auth.userPassCheck,
            auth.authValid,
            auth.adminCheck,
            check.userCheck,
            check.loginCheck,
            async (req: Request, res: Response) => {
                let status: boolean;
                try {
                    status = await service.insert(req.body.user);
                } catch (error) {
                    res.sendStatus(503);
                    console.log(error);
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