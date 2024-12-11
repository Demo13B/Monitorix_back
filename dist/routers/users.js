"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
class UserRouter {
    _router;
    constructor(service, auth) {
        this._router = (0, express_1.Router)();
        this._router.get('/', auth.userPassCheck, auth.authValid, async (req, res) => {
            const user_id = req.body.user_id;
            const ar = req.body.access_rights;
            const brigade_id = req.body.brigade_id;
            let result = null;
            try {
                result = await service.findUsers(user_id, brigade_id, ar);
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
exports.UserRouter = UserRouter;
;
