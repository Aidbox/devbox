import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { connect } from 'react-redux'

import FindPatientByNameForm from 'ehrSrc/components/FindPatientByNameForm'
import PatientItem from './PatientItem'
import Pagination from './Pagination'
import * as apiActions from 'ehrSrc/actions/api'
import * as patientActions from 'ehrSrc/actions/patient'

import styles from './style.scss'

export class PatientList extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    allPatients: PropTypes.object,
    searchResults: PropTypes.array,
    total: PropTypes.number,
    curPage: PropTypes.number,
    patientListSearchText: PropTypes.string,
    curPatientId: PropTypes.string,
    isPending: PropTypes.bool,
    apiGetAllPatients: PropTypes.func,
    onAddClick: PropTypes.func,
    selectPatient: PropTypes.func,
    selectPage: PropTypes.func
  }

  componentDidMount () {
      this.props.apiGetAllPatients();
  }

  render () {
    const { allPatients, searchResults, total, curPage, patientListSearchText, curPatientId, isPending, onAddClick, selectPatient, selectPage } = this.props
    let patients
    if (patientListSearchText || searchResults.length) {
      patients = searchResults
    } else {
      patients = Object.entries(allPatients).slice(0, 10).map(([key, value]) => key)
    }

    return (
      <div className={cn(styles.patientList, this.props.className)}>
        <h2 className='mt-0'>Patients list</h2>
        <div className='my-3'>
          <button type='button' onClick={onAddClick}>New</button>
        </div>
        <FindPatientByNameForm isPending={isPending} />
        <h3>
          {
            patientListSearchText ? `Search «${patientListSearchText}»` : 'All patients'
          }
          {' '}
          ({total})
        </h3>
        {
          (patients.length) ? (
            <React.Fragment>
              <ul className={cn(styles.ul)}>
                {
                  patients.map(function (patientId) {
                    const patientItem = allPatients[patientId]
                    if (patientItem) {
                      const isSelect = (curPatientId === patientItem.id)

                      return (
                        <PatientItem key={patientItem.id} patientItem={patientItem} isSelect={isSelect} selectPatient={selectPatient} />
                      )
                    }
                  })
                }
              </ul>
              <Pagination total={total} curPage={curPage} selectPage={selectPage} isPending={isPending} />
            </React.Fragment>
          ) : (
            'Patients not found'
          )
        }
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    allPatients: state.patient.allItems,
    searchResults: state.patient.searchResults,
    total: state.patient.total,
    curPage: state.patient.page,
    patientListSearchText: state.rrf.patientListSearchText,
    curPatientId: state.rrf.curPatientId,
    isPending: !!state.api.pending.API_GET_PATIENT_BY_NAME || !!state.api.pending.API_GET_ALL_PATIENTS,
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    apiGetAllPatients: function () {
      return dispatch(apiActions.getAllPatients({page: 0}))
    },
    onAddClick: function () {
      return dispatch(patientActions.addPatient())
    },
    selectPatient: function (patientId) {
      return dispatch(patientActions.selectPatient(patientId))
    },
    selectPage: function (page) {
      return dispatch(patientActions.selectPage(page))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientList)
