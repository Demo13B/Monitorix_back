import express, { Express } from "express"
import { Request, Response } from "express";

export class App {
    private _app: Express;

    constructor() {
        this._app = express();

        this._app.get('/', async (req: Request, res: Response) => {
            try {
                res.status(200).send("OK");
            } catch (error) {
                console.log("Something went wrong");
                res.send(400);
            }
        });
    };

    public express_app = () => {
        return this._app;
    };
};