import axios from "axios";
import createDebug from "debug";

const debug = createDebug("ehr:api"); // eslint-disable-line no-unused-vars

const myAxios = axios.create({
  baseURL: AIDBOX_URL
});

if (process.env.NODE_ENV === "development") {
  // slow down requests for dev environment
  myAxios.interceptors.request.use(
    function(config) {
      return Promise.delay(100).then(function() {
        return config;
      });
    },
    function(error) {
      return Promise.reject(error);
    }
  );
}

export const getPath = function(path) {
  return myAxios.get(path).then(function(response) {
    return response.data;
  });
};

export const getAllPatients = function({ page }) {
  return myAxios
    .get(`/fhir/Patient?_page=${page}&_totalMethod=count`)
    .then(function(response) {
      return response.data;
    });
};

export const getPatientByName = function({ patientName, page }) {
  let url = `/fhir/Patient?_page=${page}`;
  if (patientName && patientName.length >= 0) {
    url += `&name=${patientName}`;
  }
  return myAxios
    .get(url)
    .then(function(response) {
      return response.data;
    });
};

const setPatientData = function(values) {
  const patientData = {
    resourceType: "Patient",
    name: [
      {
        given: [values.firstName],
        family: values.lastName
      }
    ],
    address: [
      {
        use: "home",
        line: values.address.line,
        state: values.address.state,
        city: values.address.city,
        postalCode: values.address.postalCode
      }
    ],
    // identifier: [
    //   {
    //     use: 'usual',
    //     type: {
    //       coding: [
    //         {
    //           code: 'SS',
    //           system: 'http://hl7.org/fhir/v2/0203',
    //         }
    //       ]
    //     },
    //     value: values.identifier,
    //     system: 'http://hl7.org/fhir/sid/us-ssn',
    //   }
    // ],
    telecom: [
      ...values.phone.filter(i => i.trim()).map(item => {
        return { system: "phone", value: item };
      }),
      ...values.email.filter(i => i.trim()).map(item => {
        return { system: "email", value: item };
      })
    ]
  };
  if (values.birthDate) patientData.birthDate = values.birthDate;
  if (values.gender) patientData.gender = values.gender;
  return patientData;
};

export const putPatient = function(values) {
  const data = {
    ...setPatientData(values),
    id: values.id
  };
  return myAxios.put(`/fhir/Patient/${data.id}`, data).then(function(response) {
    return response.data;
  });
};

export const postPatient = function(values) {
  const data = setPatientData(values);
  return myAxios.post("/fhir/Patient", data).then(function(response) {
    return response.data;
  });
};

export const deletePatient = function({ patientId }) {
  return myAxios.delete(`/fhir/Patient/${patientId}`).then(function(response) {
    return response.data;
  });
};
