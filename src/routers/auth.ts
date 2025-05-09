import { Router, Request, Response } from "express";
import { AuthValidation } from "../middleware/auth";
import { AuthService } from "../service/auth";
import { credentials } from "models/auth";
import { Tokenizer } from "../tokenizer";
import { RedisDB } from "../rdb";
import { v4 as uuidv4 } from 'uuid'

export class AuthRouter {
    private readonly _router: Router;

    constructor(service: AuthService, auth: AuthValidation, tk: Tokenizer, rdb: RedisDB) {
        this._router = Router();

        // this._router.get('/', auth.userPassCheck, auth.authValid, async (req: Request, res: Response) => {
        //     const username = req.body.username;
        //     const password = req.body.password;

        //     let cred: credentials | null = null;
        //     try {
        //         cred = await service.authenticate(username, password);
        //     } catch (error) {
        //         res.sendStatus(503);
        //         console.error(error);
        //         return;
        //     }

        //     if (!cred) {
        //         res.sendStatus(401)
        //         return;
        //     };

        //     res.status(200).json(cred);
        // });

        this._router.post('/login', auth.userPassCheck, async (req: Request, res: Response) => {
            const username = req.body.username;
            const password = req.body.password;

            let cred: credentials | null = null;
            try {
                cred = await service.authenticate(username, password);
            } catch (error) {
                res.sendStatus(503);
                console.error(error);
                return;
            }

            if (!cred) {
                res.sendStatus(401)
                return;
            };

            const access = tk.make_token(cred, 60 * 15 * 1000);
            const refresh = tk.make_token({ user_id: cred.user_id }, 60 * 60 * 24 * 1000);

            const token_id = uuidv4();

            await rdb.set(`access:${token_id}`, access, 60 * 15);
            await rdb.set(`refresh:${token_id}`, refresh, 60 * 60 * 24);

            res.cookie('token_id', token_id);

            res.status(200).json(cred);
        });

        this._router.post('/refresh', async (req: Request, res: Response) => {
            if (!req.cookies.token_id) {
                res.sendStatus(401);
                return;
            }

            const token_id = req.cookies.token_id;

            if (!await rdb.exists(`refresh:${token_id}`)) {
                res.status(401).send('The refresh token has expired or been deleted');
                return;
            }

            const refresh_payload = tk.decode_token(await rdb.get(`refresh:${token_id}`));

            let cred: credentials | null = null;
            try {
                cred = await service.getCredsById(refresh_payload.user_id);
            } catch (error) {
                res.sendStatus(503);
                console.error(error);
                return;
            }

            if (!cred) {
                res.sendStatus(401)
                return;
            };

            await rdb.del(`access:${token_id}`);
            await rdb.del(`refresh:${token_id}`);

            const new_id = uuidv4();

            const access = tk.make_token(cred, 60 * 15 * 1000);
            const refresh = tk.make_token({ user_id: cred.user_id }, 60 * 60 * 24 * 1000);

            await rdb.set(`access:${new_id}`, access, 60 * 15);
            await rdb.set(`refresh:${new_id}`, refresh, 60 * 60 * 24);

            res.cookie('token_id', new_id);
            res.sendStatus(200);
        });

        this._router.post('/logout', async (req: Request, res: Response) => {
            if (!req.cookies.token_id) {
                res.sendStatus(200);
                return;
            }

            await rdb.del(`access:${req.cookies.token_id}`);
            await rdb.del(`refresh:${req.cookies.token_id}`);

            res.clearCookie('token_id');
            res.sendStatus(200);
        });

    };

    public get_internal = () => {
        return this._router;
    };
}