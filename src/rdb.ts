import { createClient } from "redis"
import { RedisClientType } from "@redis/client";
import { AlertsService } from "service/alerts";
import { DataService } from "service/data";
import { dataInput } from "models/objects";

export class RedisDB {
    private client = createClient({
        url: process.env.RDB_URL,
        pingInterval: 30000
    });

    private connect = async () => {
        if (this.client.isOpen) return;

        console.log('Connecting to RDB.....')
        await this.client.connect();
        console.log('Connected')

        this.client.on('error', (err) => {
            console.error(`Redis error: ${err}`);
        })

        this.client.on('reconnecting', () => {
            console.log('Attempting a reconnect.....');
        })

        this.client.on('ready', () => {
            console.log('Reconnected');
        });
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

    public publish = async (channel: string, message: string) => {
        try {
            await this.connect();
        } catch (ex) {
            console.error(ex);
        }

        const res = await this.client.publish(channel, message);
        return res;
    }

    public getClient = () => {
        return this.client;
    }
};

export class AlertListener {
    private client: RedisClientType;
    private alertService: AlertsService;

    constructor(rdb: RedisDB, alertService: AlertsService) {
        this.client = rdb.getClient().duplicate();
        this.alertService = alertService;
    }

    private connect = async () => {
        if (this.client.isOpen) return;

        console.log('Connecting to RDB.....')
        await this.client.connect();
        console.log('Connected')

        this.client.on('error', (err) => {
            console.error(`Redis error: ${err}`);
        })

        this.client.on('reconnecting', () => {
            console.log('Attempting a reconnect.....');
        })

        this.client.on('ready', () => {
            console.log('Reconnected');
        });
    }

    public subscribe = async (channel: string) => {
        try {
            await this.connect();
        } catch (ex) {
            console.error(ex);
        }

        this.client.subscribe(channel, async (message, channel) => {
            console.log(`Recieved message at channel ${channel}. Adding to database...`);

            try {
                await this.alertService.add(JSON.parse(message));
            } catch (ex) {
                console.error(ex);
                return;
            }

            console.log('Alert added to the database');
        });
    }
}

export class DataListener {
    private client: RedisClientType;
    private dataService: DataService;

    constructor(rdb: RedisDB, dataService: DataService) {
        this.client = rdb.getClient().duplicate();
        this.dataService = dataService;
    }

    private connect = async () => {
        if (this.client.isOpen) return;

        console.log('Connecting to RDB.....')
        await this.client.connect();
        console.log('Connected')

        this.client.on('error', (err) => {
            console.error(`Redis error: ${err}`);
        })

        this.client.on('reconnecting', () => {
            console.log('Attempting a reconnect.....');
        })

        this.client.on('ready', () => {
            console.log('Reconnected');
        });
    }

    public subscribe = async (channel: string) => {
        try {
            await this.connect();
        } catch (ex) {
            console.error(ex);
        }

        this.client.subscribe(channel, async (message, channel) => {
            console.log(`Recieved message at channel ${channel}.`);

            const data = JSON.parse(message) as dataInput;

            if (!data.mac_address ||
                !data.air_pressure ||
                !data.charge ||
                !data.humidity ||
                !data.latitude ||
                !data.longitude ||
                !data.pulse ||
                !data.temperature ||
                !data.time ||
                data.analyzer_alarm === undefined ||
                data.fall === undefined ||
                data.activity === undefined
            ) {
                console.error('The data format is incorrect');
                return;
            }

            console.log(`The data format is correct. Adding to database...`);

            try {
                await this.dataService.insertData(JSON.parse(message));
            } catch (ex) {
                console.error(ex);
                return;
            }

            console.log('Data added to the database');
        });
    }
}