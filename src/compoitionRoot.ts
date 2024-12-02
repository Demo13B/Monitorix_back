import { AuthRouter } from "./routers/auth";
import { App } from "./app"
import { AuthService } from "./service/auth";
import { AuthValidation } from "./middleware/auth";
import { AuthRepo } from "./repository/auth";
import { PasswordHasher } from "./passwordHasher";
import { UserRepository } from "./repository/users";
import { UserService } from "./service/users";
import { UserRouter } from "./routers/users";
import { DataRepository } from "./repository/data";
import { DataService } from "./service/data";
import { DataRouter } from "./routers/data";
import { DataValidator } from "./middleware/dataChecker";
import { AlertsRepository } from "./repository/alerts";
import { AlertsService } from "./service/alerts";
import { AlertsRouter } from "./routers/alerts";

export class CompositionRoot {
    private readonly _app: App;

    constructor() {
        const hasher = new PasswordHasher;
        const dataValid = new DataValidator;

        const authRepo = new AuthRepo;
        const authService = new AuthService(authRepo, hasher);
        const authValid = new AuthValidation(authService);
        const authRouter = new AuthRouter(authService, authValid);

        const userRepo = new UserRepository;
        const userService = new UserService(userRepo);
        const userRouter = new UserRouter(userService, authValid);

        const dataRepo = new DataRepository;
        const dataService = new DataService(dataRepo);
        const dataRouter = new DataRouter(dataService, authValid, dataValid);

        const alertsRepo = new AlertsRepository;
        const alertsService = new AlertsService(alertsRepo);
        const alertsRouter = new AlertsRouter(alertsService, alertsRepo, authValid);

        this._app = new App(authRouter, userRouter, dataRouter, alertsRouter);
    }

    app = () => {
        return this._app;
    }
};