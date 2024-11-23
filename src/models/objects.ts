export type role = {
    role_id: number,
    name: string,
    access_rights: number
};

export type user = {
    user_id: number,
    password_hash: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    profession: string,
    role_id: number,
    brigade_id: number,
    tracker_id: number
};

export type brigade = {
    brigade_id: number,
    name: string,
    facility_id: number
};

export type facility = {
    facility_id: number,
    name: string,
    latitude: number,
    longitude: number
};

export type tracker = {
    tracker_id: number,
    mac_adress: string,
    description: string
};

export type tracker_data = {
    data_id: number,
    tracker_id: number,
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