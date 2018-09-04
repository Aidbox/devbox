import { Patient } from './patient';

export const  objectToFhir = (obj): Object => {
  const patientData: any = {
    resourceType: "Patient",
    name: [
      {
        given: [obj.firstName],
        family: obj.lastName
      }
    ],
    address: [
      {
        use: "home",
        line: [obj.street],
        state: obj.state,
        city: obj.city,
        postalCode: obj.zcode
      }
    ],
    telecom: [
      ...obj.telecom.emails.filter(t => t.value && t.system),
      ...obj.telecom.phones.filter(t => t.value && t.system)
    ]
  };
  if (obj.birthDate) {
    patientData.birthDate = obj.birthDate;
  }
  if (obj.gender) {
    patientData.gender = obj.gender;
  }
  return patientData;
}

export const fhirToObject = (obj): Patient => {
  const { name: [ { given: [firstname], family: lastname } ],
          address: [ { line: [street], state, city, postalCode: zcode } ],
          telecom: telecom,
          birthDate,
          gender,
          id
        } = obj;
  const patient = new Patient();
  patient.id = id;
  patient.firstName = firstname;
  patient.lastName = lastname;
  patient.street = street;
  patient.state = state;
  patient.city = city;
  patient.gender = gender;
  patient.birthDate = birthDate;
  patient.zcode = zcode;
  const emails =  telecom.filter(t => t.system === "email");
  const phones =  telecom.filter(t => t.system === "phone")

  patient.telecom = {
    emails: emails.length > 0 ? emails : [{ value: '', system: 'email'}],
    phones: phones.length > 0 ? phones : [{ value: '', system: 'phone'}]
  };
  return  patient;
}
