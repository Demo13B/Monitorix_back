export type user = {
    login: string,
    first_name: string,
    last_name: string,
    gender: string,
    phone_number: string,
    profession: string,
    role: string,
    brigade: string,
    facility: string,
    tracker: string
}

export type data = {
    login: string,
    tracker: string,
    description: string,
    air_pressure: number,
    pulse: number,
    latitude: number,
    longitude: number,
    activity: boolean,
    fall: boolean,
    temperature: number,
    humidity: number,
    charge: number,
    analyzer_alarm: boolean,
    time: string
};

export type alert = {
    login: string,
    tracker: string,
    type: number,
    message: string,
    time: string
};