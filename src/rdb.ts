import { createClient } from "redis"

export class RedisDB {
    private client = createClient({
        url: process.env.RDB_URL
    });

    private connect = async () => {
        if (this.client.isOpen) return;

        console.log('Connecting to RDB.....')
        await this.client.connect();
        console.log('Connected')
    }

    public set = async (key: string, value: string, expiry: number = 0) => {
        try {
            await this.connect();
        } catch (ex) {
            console.error(ex);
        }

        let res: string | null;
        if (expiry != 0) {
            res = await this.client.set(key, value, { EX: expiry });
        } else {
            res = await this.client.set(key, value);
        }
        console.log(res);

    }

    public get = async (key: string) => {
        try {
            await this.connect();
        } catch (ex) {
            console.error(ex);
        }

        const res = await this.client.get(key);
        return res;
    }

    public del = async (key: string) => {
        try {
            await this.connect();
        } catch (ex) {
            console.error(ex);
        }

        const res = await this.client.del(key);
        console.log(res);
    }

    public exists = async (key: string) => {
        try {
            await this.connect();
        } catch (ex) {
            console.error(ex);
        }

        const res = await this.client.exists(key);
        return res;
    }
};
