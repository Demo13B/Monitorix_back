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
import { BrigadeRepository } from "./repository/brigades";
import { BrigadesService } from "./service/brigades";
import { BrigadesRouter } from "./routers/brigades";
import { FacilitiesRepository } from "./repository/facilities";
import { FacilitiesService } from "./service/facilities";
import { FacilitiesRouter } from "./routers/facilities";
import { TrackerRepository } from "./repository/trackers";
import { TrackerService } from "./service/trackers";
import { TrackerRouter } from "./routers/trackers";

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
        const dataRepo = new DataRepository;
        const alertsRepo = new AlertsRepository;
        const brigadesRepo = new BrigadeRepository;
        const facilitiesRepo = new FacilitiesRepository;
        const trackerRepo = new TrackerRepository;


        const userService = new UserService(userRepo, brigadesRepo, authRepo, trackerRepo, hasher);
        const dataService = new DataService(dataRepo, trackerRepo);
        const alertsService = new AlertsService(alertsRepo);
        const brigadesService = new BrigadesService(brigadesRepo, facilitiesRepo);
        const facilitiesService = new FacilitiesService(facilitiesRepo);
        const trackerService = new TrackerService(trackerRepo);


        const userRouter = new UserRouter(userService, authValid, dataValid);
        const dataRouter = new DataRouter(dataService, authValid, dataValid, dataValid);
        const alertsRouter = new AlertsRouter(alertsService, alertsRepo, authValid, dataValid);
        const brigadesRouter = new BrigadesRouter(brigadesService, authValid, dataValid);
        const facilitiesRouter = new FacilitiesRouter(facilitiesService, authValid, dataValid);
        const trackerRouter = new TrackerRouter(trackerService, authValid, dataValid);


        this._app = new App(
            authRouter, userRouter, dataRouter,
            alertsRouter, brigadesRouter, facilitiesRouter,
            trackerRouter
        );
    }

    app = () => {
        return this._app;
    }
};