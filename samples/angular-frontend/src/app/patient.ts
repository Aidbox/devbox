export interface PatientTelecomEmails {
  system: string;
  value?: string;
}

export interface PatientTelecomPhones {
  system: string;
  value?: string;
}

export interface PatientTelecom {
  emails: PatientTelecomEmails[];
  phones: PatientTelecomPhones[];
}


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
  telecom: PatientTelecom  = {
    emails: [{ system: 'email' }],
    phones: [{ system: 'phone' }]
  };
}
