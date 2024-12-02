"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
class App {
    _app;
    constructor(authRouter, userRouter, dataRouter, alertsRouter) {
        this._app = (0, express_1.default)();
        const bodyParser = express_1.default.json();
        this._app.use(bodyParser);
        this._app.use('/api/auth', authRouter.get_internal());
        this._app.use('/api/users', userRouter.get_internal());
        this._app.use('/api/data', dataRouter.get_internal());
        this._app.use('/api/alerts', alertsRouter.get_internal());
    }
    ;
    express_app = () => {
        return this._app;
    };
}
exports.App = App;
;
