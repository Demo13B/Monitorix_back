"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertsRouter = void 0;
const express_1 = require("express");
class AlertsRouter {
    _router;
    constructor(service, repo, auth, check) {
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
        this._router.get('/stats/users', auth.userPassCheck, auth.authValid, auth.adminCheck, async (req, res) => {
            let result;
            try {
                result = await service.findStats(1);
            }
            catch (error) {
                res.sendStatus(503);
                console.error(error);
                return;
            }
            res.status(200).json(result);
        });
        this._router.get('/stats/brigades', auth.userPassCheck, auth.authValid, auth.adminCheck, async (req, res) => {
            let result;
            try {
                result = await service.findStats(2);
            }
            catch (error) {
                res.sendStatus(503);
                console.error(error);
                return;
            }
            res.status(200).json(result);
        });
        this._router.get('/stats/facilities', auth.userPassCheck, auth.authValid, auth.adminCheck, async (req, res) => {
            let result;
            try {
                result = await service.findStats(3);
            }
            catch (error) {
                res.sendStatus(503);
                console.error(error);
                return;
            }
            res.status(200).json(result);
        });
        this._router.delete('/', auth.userPassCheck, auth.authValid, auth.adminCheck, check.deleteLoginCheck, async (req, res) => {
            let status;
            try {
                status = await service.remove(req.body.login);
            }
            catch (error) {
                res.sendStatus(503);
                console.error(error);
                return;
            }
            if (!status) {
                res.sendStatus(400);
                return;
            }
            res.sendStatus(200);
        });
    }
    ;
    get_internal = () => {
        return this._router;
    };
}
exports.AlertsRouter = AlertsRouter;
;
