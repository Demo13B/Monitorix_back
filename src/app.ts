import express, { Express } from "express";
import { AlertsRouter } from "routers/alerts";
import { AuthRouter } from "routers/auth";
import { BrigadesRouter } from "routers/brigades";
import { DataRouter } from "routers/data";
import { FacilitiesRouter } from "routers/facilities";
import { TrackerRouter } from "routers/trackers";
import { UserRouter } from "routers/users";

export class App {
    private readonly _app: Express;

    constructor(
        authRouter: AuthRouter,
        userRouter: UserRouter,
        dataRouter: DataRouter,
        alertsRouter: AlertsRouter,
        brigadesRouter: BrigadesRouter,
        facilitiesRouter: FacilitiesRouter,
        trackersRouter: TrackerRouter
    ) {
        this._app = express();

        const bodyParser = express.json();

        this._app.use(bodyParser);

        this._app.use('/api/auth', authRouter.get_internal());
        this._app.use('/api/users', userRouter.get_internal());
        this._app.use('/api/data', dataRouter.get_internal());
        this._app.use('/api/alerts', alertsRouter.get_internal());
        this._app.use('/api/brigades', brigadesRouter.get_internal());
        this._app.use('/api/facilities', facilitiesRouter.get_internal());
        this._app.use('/api/trackers', trackersRouter.get_internal());
    };

    public express_app = () => {
        return this._app;
    };
};