"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertsRouter = void 0;
const express_1 = require("express");
class AlertsRouter {
    _router;
    constructor(service, repo, auth) {
        this._router = (0, express_1.Router)();
        this._router.get('/', auth.userPassCheck, auth.authValid, async (req, res) => {
            const user_id = req.body.user_id;
            const brigade_id = req.body.brigade_id;
            const ar = req.body.access_rights;
            let result;
            try {
                result = await service.findAlerts(user_id, brigade_id, ar);
            }
            catch (error) {
                res.sendStatus(503);
                console.error(error);
                return;
            }
            res.status(200).json(result);
        });
    }
    ;
    get_internal = () => {
        return this._router;
    };
}
exports.AlertsRouter = AlertsRouter;
;
