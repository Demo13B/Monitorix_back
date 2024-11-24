import express, { Express } from "express"
import { Request, Response } from "express";
import { AuthRouter } from "routers/auth";

export class App {
    private readonly _app: Express;

    constructor(router: AuthRouter) {
        this._app = express();

        const bodyParser = express.json();

        this._app.use(bodyParser);

        this._app.use('/api/auth', router.get_internal());
    };

    public express_app = () => {
        return this._app;
    };
};