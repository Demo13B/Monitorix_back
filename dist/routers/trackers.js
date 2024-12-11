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
    }
    ;
    get_internal = () => {
        return this._router;
    };
}
exports.TrackerRouter = TrackerRouter;
;
