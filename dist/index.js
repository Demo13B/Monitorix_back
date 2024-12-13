"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compoitionRoot_1 = require("./compoitionRoot");
const https_1 = __importDefault(require("https"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
async function main() {
    const cr = new compoitionRoot_1.CompositionRoot;
    const app = cr.app().express_app();
    dotenv_1.default.config();
    if (!process.env.FULLCHAIN_PATH || !process.env.KEY_PATH) {
        console.log("No certificate");
        return;
    }
    const credentials = {
        cert: fs_1.default.readFileSync(process.env.FULLCHAIN_PATH),
        key: fs_1.default.readFileSync(process.env.KEY_PATH)
    };
    let server = https_1.default.createServer(credentials, app);
    server.listen(process.env.PORT);
    console.log('App started on port: ', process.env.PORT);
}
;
main();
