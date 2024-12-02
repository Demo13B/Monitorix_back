"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
class AuthRouter {
    _router;
    constructor(service, auth) {
        this._router = (0, express_1.Router)();
        this._router.get('/', auth.userPassCheck, auth.authValid, async (req, res) => {
            const username = req.body.username;
            const password = req.body.password;
            let cred = null;
            try {
                cred = await service.authenticate(username, password);
            }
            catch (error) {
                res.sendStatus(503);
                console.error(error);
                return;
            }
            if (!cred) {
                res.sendStatus(401);
                return;
            }
            ;
            res.status(200).json(cred);
        });
    }
    ;
    get_internal = () => {
        return this._router;
    };
}
exports.AuthRouter = AuthRouter;
