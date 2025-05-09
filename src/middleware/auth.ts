import { Request, Response, NextFunction } from "express";
import { credentials } from "models/auth";
import { RedisDB } from "rdb";
import { AuthService } from "service/auth";
import { Tokenizer } from "tokenizer";

export class AuthValidation {
    private readonly _authService: AuthService;
    private readonly _rdb: RedisDB;
    private readonly _tk: Tokenizer

    constructor(service: AuthService, rdb: RedisDB, tk: Tokenizer) {
        this._authService = service;
        this._rdb = rdb;
        this._tk = tk;
    };

    public userPassCheck = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.username || !req.body.password) {
            res.sendStatus(400);
            return;
        }
        next();
    };

    public adminCheck = async (req: Request, res: Response, next: NextFunction) => {
        if (req.body.access_rights != 3) {
            res.sendStatus(401);
            return;
        }

        next();
    };

    // public authValid = async (req: Request, res: Response, next: NextFunction) => {
    //     const user: string = req.body.username;
    //     const password: string = req.body.password;

    //     let cred: credentials | null = null;
    //     try {
    //         cred = await this._authService.authenticate(user, password)
    //     } catch (error) {
    //         res.sendStatus(503);
    //         console.error(error);
    //         return;
    //     }

    //     if (!cred) {
    //         res.sendStatus(401);
    //         return;
    //     }

    //     req.body.user_id = cred.user_id;
    //     req.body.access_rights = cred.access_rights;
    //     req.body.brigade_id = cred.brigade_id;

    //     next();
    // };

    public authValid = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.cookies.token_id) {
            res.sendStatus(401);
            return;
        }

        if (!await this._rdb.exists(`access:${req.cookies.token_id}`)) {
            res.status(401).send('The token has expired');
            return;
        }

        let token = await this._rdb.get(`access:${req.cookies.token_id}`)

        let cred;
        try {
            cred = this._tk.decode_token(token);
        } catch (error) {
            res.sendStatus(503);
            console.error(error);
            return;
        }

        req.body.user_id = cred.user_id;
        req.body.access_rights = cred.access_rights;
        req.body.brigade_id = cred.brigade_id;

        next();
    };
};