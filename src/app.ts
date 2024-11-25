import express, { Express } from "express"
import { Request, Response } from "express";
import { AuthRouter } from "routers/auth";
import { UserRouter } from "routers/users";

export class App {
    private readonly _app: Express;

    constructor(authRouter: AuthRouter, userRouter: UserRouter) {
        this._app = express();

        const bodyParser = express.json();

        this._app.use(bodyParser);

        this._app.use('/api/auth', authRouter.get_internal());
        this._app.use('/api/users', userRouter.get_internal());
    };

    public express_app = () => {
        return this._app;
    };
};