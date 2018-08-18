import { combineForms } from 'react-redux-form'

export patient from './patient'
export api from './api'

export const rrf = combineForms({
  findPatientByNameForm: {
    search: '',
  },
  patientInfoForm: {
    firstName: '',
    lastName: '',
    gender: '',
    birthDate: '',
    address: {
      line: [
        ''
      ],
      //state: '',
      //city: '',
      //postalCode: '',
    },
    //identifier: '',
    phone: [
      '',
    ],
    email: [
      '',
    ],
  },
  isEditPatientInfoForm: false,
  curPatientId: '',
  patientListSearchText: '',
}, 'rrf')
