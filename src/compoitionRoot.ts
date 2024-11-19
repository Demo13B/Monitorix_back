import { App } from "./app"

export class CompositionRoot {
    private _app: App;

    constructor() {
        this._app = new App;
    }

    app = () => {
        return this._app;
    }
};