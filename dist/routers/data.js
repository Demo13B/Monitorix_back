"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataRouter = void 0;
const express_1 = require("express");
class DataRouter {
    _router;
    constructor(service, auth, data) {
        this._router = (0, express_1.Router)();
        this._router.get('/', auth.userPassCheck, auth.authValid, async (req, res) => {
            const user_id = req.body.user_id;
            const ar = req.body.access_rights;
            const brigade_id = req.body.brigade_id;
            let result = null;
            try {
                result = await service.findData(user_id, brigade_id, ar);
            }
            catch (error) {
                res.sendStatus(503);
                console.log(error);
                return;
            }
            res.status(200).json(result);
        });
        this._router.get('/:id', auth.userPassCheck, auth.authValid, data.idCheck, async (req, res) => {
            const user_id = req.body.user_id;
            const ar = req.body.access_rights;
            const brigade_id = req.body.brigade_id;
            const query_id = req.params.id;
            let result = null;
            try {
                result = await service.findLastData(query_id);
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
exports.DataRouter = DataRouter;
;
