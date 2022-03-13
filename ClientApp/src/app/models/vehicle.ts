export interface IdNamePair {
    id: number;
    name: string;
}

export interface Contact {
    name: string;
    phone: string;
    email: string;
}

export interface Vehicle {
    id: number;
    model: IdNamePair;
    make: IdNamePair;
    isRegistered: boolean;
    features: IdNamePair[];
    contact: Contact;
    lastUpdate: string;
}

export interface SaveVehicle {
    id: number;
    modelId?: number;
    makeId: number;
    isRegistered: boolean;
    features: number[];
    contact: Contact;
}