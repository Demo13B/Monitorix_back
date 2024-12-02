"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compoitionRoot_1 = require("./compoitionRoot");
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
async function main() {
    const cr = new compoitionRoot_1.CompositionRoot;
    const app = cr.app().express_app();
    dotenv_1.default.config();
    let server = http_1.default.createServer(app);
    server.listen(process.env.PORT);
    console.log('App started on port: ', process.env.PORT);
}
;
main();
