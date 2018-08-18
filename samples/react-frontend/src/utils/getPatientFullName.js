export default function getPatientFullName (patientItem) {
  if (!patientItem) return ''
  const { given, family } = patientItem.name[0]
  const fullName = (given + ' ' + family).trim()
  return fullName
}
