import { JwtPayload, sign, verify } from 'jsonwebtoken'

export class Tokenizer {
    private secret: string;

    constructor() {
        if (process.env.TOKEN_SECRET) {
            this.secret = process.env.TOKEN_SECRET;
        } else {
            this.secret = 'secret';
        }
    }

    public make_token = (payload, expiry: number) => {
        const token = sign(payload, this.secret, { expiresIn: expiry })

        return token;
    }

    public decode_token = (token) => {
        const payload = verify(token, this.secret) as JwtPayload;

        return payload;
    }
};