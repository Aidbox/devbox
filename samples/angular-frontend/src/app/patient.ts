export class Patient {
    id: number;
    firstName: string;
    lastName: string;
    street: string;
    state: string;
    city: string;
    gender?: string;
    birthDate?: string;
    zcode?: string;
    phone?: string;
    email?: string;
    telecom: Object = {
        emails: [{ system: 'email' }],
        phones: [{ system: 'phone' }]
    };
}
