"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
class AuthValidation {
    _authService;
    constructor(service) {
        this._authService = service;
    }
    ;
    userPassCheck = async (req, res, next) => {
        if (!req.body.username || !req.body.password) {
            res.sendStatus(400);
            return;
        }
        next();
    };
    adminCheck = async (req, res, next) => {
        if (req.body.access_rights != 3) {
            res.sendStatus(401);
            return;
        }
        next();
    };
    authValid = async (req, res, next) => {
        const user = req.body.username;
        const password = req.body.password;
        let cred = null;
        try {
            cred = await this._authService.authenticate(user, password);
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
        req.body.user_id = cred.user_id;
        req.body.access_rights = cred.access_rights;
        req.body.brigade_id = cred.brigade_id;
        next();
    };
}
exports.AuthValidation = AuthValidation;
;
