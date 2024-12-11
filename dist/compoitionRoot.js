"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositionRoot = void 0;
const auth_1 = require("./routers/auth");
const app_1 = require("./app");
const auth_2 = require("./service/auth");
const auth_3 = require("./middleware/auth");
const auth_4 = require("./repository/auth");
const passwordHasher_1 = require("./passwordHasher");
const users_1 = require("./repository/users");
const users_2 = require("./service/users");
const users_3 = require("./routers/users");
const data_1 = require("./repository/data");
const data_2 = require("./service/data");
const data_3 = require("./routers/data");
const dataChecker_1 = require("./middleware/dataChecker");
const alerts_1 = require("./repository/alerts");
const alerts_2 = require("./service/alerts");
const alerts_3 = require("./routers/alerts");
class CompositionRoot {
    _app;
    constructor() {
        const hasher = new passwordHasher_1.PasswordHasher;
        const dataValid = new dataChecker_1.DataValidator;
        const authRepo = new auth_4.AuthRepo;
        const authService = new auth_2.AuthService(authRepo, hasher);
        const authValid = new auth_3.AuthValidation(authService);
        const authRouter = new auth_1.AuthRouter(authService, authValid);
        const userRepo = new users_1.UserRepository;
        const userService = new users_2.UserService(userRepo);
        const userRouter = new users_3.UserRouter(userService, authValid);
        const dataRepo = new data_1.DataRepository;
        const dataService = new data_2.DataService(dataRepo);
        const dataRouter = new data_3.DataRouter(dataService, authValid, dataValid);
        const alertsRepo = new alerts_1.AlertsRepository;
        const alertsService = new alerts_2.AlertsService(alertsRepo);
        const alertsRouter = new alerts_3.AlertsRouter(alertsService, alertsRepo, authValid);
        this._app = new app_1.App(authRouter, userRouter, dataRouter, alertsRouter);
    }
    app = () => {
        return this._app;
    };
}
exports.CompositionRoot = CompositionRoot;
;
