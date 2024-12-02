"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataValidator = void 0;
class DataValidator {
    idCheck = async (req, res, next) => {
        if (!req.params.id) {
            res.sendStatus(400);
            return;
        }
        next();
    };
}
exports.DataValidator = DataValidator;
;
