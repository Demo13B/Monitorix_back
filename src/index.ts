import { CompositionRoot } from "./compoitionRoot"
import http from "http"
import dotenv from "dotenv"

async function main() {
    const cr = new CompositionRoot;
    const app = cr.app().express_app();

    dotenv.config();

    let server = http.createServer(app);
    server.listen(process.env.PORT);
    console.log('App started on port: ', process.env.PORT);
};

main();