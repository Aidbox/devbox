import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import getPatientFullName from 'ehrSrc/utils/getPatientFullName'

import styles from './patientItem.scss'

export default class PatientItem extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    patientItem: PropTypes.object,
    isSelect: PropTypes.bool,
    selectPatient: PropTypes.func,
  }

  render () {
    const { patientItem, isSelect, selectPatient } = this.props
    const fullName = getPatientFullName(patientItem)

    return (
      <li className={cn(styles.patientItem, {[styles.curPatientItem]: isSelect}, this.props.className)}>
        <button type='button' onClick={selectPatient.bind(this, patientItem.id)}>{fullName}</button>
      </li>
    )
  }
}
