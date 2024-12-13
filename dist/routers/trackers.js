"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackerRouter = void 0;
const express_1 = require("express");
class TrackerRouter {
    _router;
    constructor(service, auth, check) {
        this._router = (0, express_1.Router)();
        this._router.post('/', auth.userPassCheck, auth.authValid, auth.adminCheck, check.trackerCheck, async (req, res) => {
            try {
                await service.insert(req.body.tracker);
            }
            catch (error) {
                res.sendStatus(503);
                console.log(error);
                return;
            }
            res.sendStatus(201);
        });
        this._router.delete('/', auth.userPassCheck, auth.authValid, auth.adminCheck, check.deleteMacCheck, async (req, res) => {
            let status;
            try {
                status = await service.remove(req.body.mac);
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
exports.TrackerRouter = TrackerRouter;
;
