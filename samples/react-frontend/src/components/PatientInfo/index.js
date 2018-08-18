import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { connect } from 'react-redux'

import PatientInfoForm from 'ehrSrc/components/PatientInfoForm'
import getPatientFullName from 'ehrSrc/utils/getPatientFullName'

import styles from './style.scss'

export class PatientInfo extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    allPatients: PropTypes.object,
    curPatientId: PropTypes.string,
  }

  render () {
    const { allPatients, curPatientId } = this.props
    const patientItem = allPatients[curPatientId]
    const fullName = getPatientFullName(patientItem)
    const isNew = (curPatientId === '_new')

    return (
      <div className={cn(styles.patientInfo, this.props.className)}>
        <h2 className='mt-0'>
          {
            isNew ? (
              'Add new patient'
            ) : (
              `Patient info` + (fullName ? ` «${fullName}»` : '')
            )
          }
        </h2>
        {
          (patientItem || isNew) ? (
            <PatientInfoForm patientItem={patientItem} isNew={isNew} />
          ) : (
            'Patient not selected'
          )
        }
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    allPatients: state.patient.allItems,
    curPatientId: state.rrf.curPatientId,
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientInfo)
