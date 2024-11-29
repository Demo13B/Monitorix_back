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
        const userService = new UserService(userRepo, hasher);
        const userRouter = new UserRouter(userService, authValid);

        const dataRepo = new DataRepository;
        const dataService = new DataService(dataRepo, hasher);
        const dataRouter = new DataRouter(dataService, authValid, dataValid);

        this._app = new App(authRouter, userRouter, dataRouter);
    }

    app = () => {
        return this._app;
    }
};