import { CompositionRoot } from "./compoitionRoot"
import http from "http"
import https from "https"
import dotenv from "dotenv"
import fs from "fs"

async function main() {
    const cr = new CompositionRoot;
    const app = cr.app().express_app();

    dotenv.config();

    // if (!process.env.FULLCHAIN_PATH || !process.env.KEY_PATH) {
    //     console.log("No certificate");
    //     return;
    // }

    // const credentials = {
    //     cert: fs.readFileSync(process.env.FULLCHAIN_PATH),
    //     key: fs.readFileSync(process.env.KEY_PATH)
    // };

    let server = http.createServer(app);
    server.listen(process.env.PORT);
    console.log('App started on port: ', process.env.PORT);
};

main();