import { AuthRouter } from "./routers/auth";
import { App } from "./app"
import { AuthService } from "./service/auth";
import { AuthValidation } from "./middleware/auth";
import { AuthRepo } from "./repository/auth";
import { PasswordHasher } from "./passwordHasher";

export class CompositionRoot {
    private readonly _app: App;

    constructor() {
        const hasher = new PasswordHasher;

        const authRepo = new AuthRepo;
        const authService = new AuthService(authRepo, hasher);
        const authValid = new AuthValidation(authService);
        const authRouter = new AuthRouter(authService, authValid);
        this._app = new App(authRouter);
    }

    app = () => {
        return this._app;
    }
};