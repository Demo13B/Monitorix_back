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

export type brigade = {
    name: string,
    brigadier_name: string,
    brigadier_surname: string,
    facility_name: string,
    latitude: number,
    longitude: number
}

export type facility = {
    name: string,
    latitude: number,
    longitude: number
};

export type userStat = {
    login: string,
    yellow: number,
    red: number
};

export type brigadeStat = {
    name: string,
    yellow: number,
    red: number
};

export type facilityStat = {
    name: string,
    yellow: number,
    red: number
};

export type facilityID = {
    facility_id: number
};

export type brigadeInput = {
    name: string,
    facility_name: string
};

export type brigadeDB = {
    name: string,
    facility_id: number
};

export type tracker = {
    mac_address: string,
    description: string
};

export type roleID = {
    role_id: number
};

export type brigadeID = {
    brigade_id: number
};

export type trackerID = {
    tracker_id: number
}

export type userDB = {
    login: string,
    password_hash: string,
    gender: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    profession: string,
    role_id: number,
    brigade_id?: number,
    tracker_id?: number
}

export type userInput = {
    login: string,
    password: string,
    gender: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    profession: string,
    role: string,
    brigade: string,
    tracker: string
}

