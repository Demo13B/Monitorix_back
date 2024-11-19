export type role = {
    role_id: bigint,
    name: string,
    access_rights: number
};

export type user = {
    user_id: bigint,
    password_hash: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    profession: string,
    role_id: bigint,
    brigade_id: bigint,
    tracker_id: bigint
};

export type brigade = {
    brigade_id: bigint,
    brigadier_id: bigint,
    name: string,
    facility_id: bigint
};

export type facility = {
    facility_id: bigint,
    name: string,
    latitude: number,
    longitude: number
};

export type tracker = {
    tracker_id: bigint,
    mac_adress: string,
    description: string
};

export type tracker_data = {
    data_id: bigint,
    tracker_id: bigint,
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