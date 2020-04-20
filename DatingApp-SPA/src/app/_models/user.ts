import { Photo } from './photo';

export interface User {
    id: number;
    username: string;
    knownAs: string;
    age: number;
    gender: string;
    created: Date;
    lastActive: Date;
    photUrl: string;
    city: string;
    intrests?: string;
    introduction?: string;
    lookingFor?: string;
    photos?: Photo[];
}
