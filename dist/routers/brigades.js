"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrigadesRouter = void 0;
const express_1 = require("express");
class BrigadesRouter {
    _router;
    constructor(service, auth, check) {
        this._router = (0, express_1.Router)();
        this._router.get('/', auth.userPassCheck, auth.authValid, auth.adminCheck, async (req, res) => {
            let result;
            try {
                result = await service.findBrigades();
            }
            catch (error) {
                res.sendStatus(503);
                console.error(error);
                return;
            }
            res.status(200).json(result);
        });
        this._router.post('/', auth.userPassCheck, auth.authValid, auth.adminCheck, check.brigadeCheck, async (req, res) => {
            const brig = req.body.brigade;
            let status;
            try {
                status = await service.insert(brig);
            }
            catch (error) {
                res.sendStatus(503);
                console.error(error);
                return;
            }
            if (status) {
                res.sendStatus(201);
                return;
            }
            res.sendStatus(400);
        });
    }
    ;
    get_internal = () => {
        return this._router;
    };
}
exports.BrigadesRouter = BrigadesRouter;
;
