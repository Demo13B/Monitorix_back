import { Request, Response, Router } from "express";
import { AuthValidation } from "middleware/auth";
import { DataValidator } from "middleware/dataChecker";
import { facility } from "models/objects";
import { FacilitiesService } from "service/facilities";

export class FacilitiesRouter {
    private readonly _router: Router

    constructor(service: FacilitiesService, auth: AuthValidation, check: DataValidator) {
        this._router = Router();

        this._router.get('/',
            auth.userPassCheck,
            auth.authValid,
            auth.adminCheck,
            async (req: Request, res: Response) => {
                let result: facility[];

                try {
                    result = await service.findAll();
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
            check.facilityCheck,
            async (req: Request, res: Response) => {
                try {
                    await service.insert(req.body.facility);
                } catch (error) {
                    res.sendStatus(503);
                    console.error(error);
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