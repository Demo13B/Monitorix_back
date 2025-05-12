import { RedisDB } from "./rdb"

const main = async () => {
    const rdb = new RedisDB();

    const time = new Date();

    time.setHours(time.getHours() + 3);

    const data = {
        mac_address: "00:1A:2B:3C:4D:5F",
        air_pressure: Math.floor(Math.random() * (1300 - 700)) + 700,
        charge: Math.floor(Math.random() * (50 - 5)) + 5,
        humidity: Math.floor(Math.random() * (80 - 40)) + 40,
        latitude: 40.7128,
        longitude: -74.0060,
        pulse: Math.floor(Math.random() * (130 - 50)) + 50,
        temperature: Math.floor(Math.random() * (30 + 10)) - 10,
        time: time,
        analyzer_alarm: Math.round(Math.random()) ? true : false,
        fall: Math.round(Math.random()) ? true : false,
        activity: Math.round(Math.random()) ? true : false
    }

    await rdb.publish('tracker_data', JSON.stringify(data));
}

setInterval(main, 10000);
