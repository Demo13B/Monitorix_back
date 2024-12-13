"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilitiesRouter = void 0;
const express_1 = require("express");
class FacilitiesRouter {
    _router;
    constructor(service, auth, check) {
        this._router = (0, express_1.Router)();
        this._router.get('/', auth.userPassCheck, auth.authValid, auth.adminCheck, async (req, res) => {
            let result;
            try {
                result = await service.findAll();
            }
            catch (error) {
                res.sendStatus(503);
                console.error(error);
                return;
            }
            res.status(200).json(result);
        });
        this._router.post('/', auth.userPassCheck, auth.authValid, auth.adminCheck, check.facilityCheck, async (req, res) => {
            try {
                await service.insert(req.body.facility);
            }
            catch (error) {
                res.sendStatus(503);
                console.error(error);
                return;
            }
            res.sendStatus(201);
        });
        this._router.delete('/', auth.userPassCheck, auth.authValid, auth.adminCheck, check.deleteNameCheck, async (req, res) => {
            let status;
            try {
                status = await service.remove(req.body.name);
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
exports.FacilitiesRouter = FacilitiesRouter;
;
