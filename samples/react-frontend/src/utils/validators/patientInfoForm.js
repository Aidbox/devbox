import validator from 'validator'
import moment from 'moment'

function isRequired (value = '') {
  return !!value.trim()
}

export default function (formValues) {
  const email = {}
  const phone = {}
  formValues.email.forEach(function (value, i) {
    email[`email.${i}`] = {
      isEmail: function (value) {
        if (!value) return true
        return validator.isEmail(value)
      }
    }
  })
  formValues.phone.forEach(function (value, i) {
    phone[`phone.${i}`] = {
      isNumeric: function (value) {
        if (!value) return true
        return validator.isNumeric(value)
      }
    }
  })
  return {
    firstName: {
      isRequired,
    },
    lastName: {
      isRequired,
    },
    birthDate: {
      isDate: function (value) {
        if (!value) return true
        return moment(value, 'YYYY-MM-DD', true).isValid()
      }
    },
    'address.line.0': {
      isRequired,
    },
    'address.city': {
      isRequired,
    },
    'address.postalCode': {
      isPostalCode: function (value) {
        if (!value) return true
        return validator.isPostalCode(value, 'RU')
      },
    },
    ...phone,
    ...email,
  }
}
