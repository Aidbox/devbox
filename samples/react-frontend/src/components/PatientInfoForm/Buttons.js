import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { connect } from 'react-redux'

import FaIcon from 'ehrSrc/components/common/FaIcon'
import * as patientActions from 'ehrSrc/actions/patient'

import styles from './buttons.scss'

export class Buttons extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    patientId: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    isNew: PropTypes.bool,
    isEditPatientInfoForm: PropTypes.bool,
    isSavePending: PropTypes.bool,
    isDeletePending: PropTypes.bool,
    onEditClick: PropTypes.func,
    onCancelClick: PropTypes.func,
    onCloseClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
  }

  render () {
    const { isNew, isEditPatientInfoForm, isSavePending, isDeletePending, onEditClick, onCancelClick, onCloseClick, onDeleteClick } = this.props
    const disabled = (isSavePending || isDeletePending)

    return (
      <div className={cn(styles.buttons, this.props.className)}>
        <div className={cn(styles.left)}>
          {
            (!isNew && isEditPatientInfoForm) &&
            <button className={cn(styles.deleteBtn)} type='button' onClick={onDeleteClick} disabled={disabled}>
              Delete
              {' '}
              {
                isDeletePending ? <FaIcon icon='cog' className='fa-spin' /> : <FaIcon icon='trash' />
              }
            </button>
          }
        </div>
        <div className={cn(styles.right)}>
          {
            !isEditPatientInfoForm &&
            <button className={cn(styles.editBtn)} type='button' onClick={onEditClick} disabled={disabled}>Edit</button>
          }
          {
            isEditPatientInfoForm &&
            <React.Fragment>
              <button className={cn(styles.submitBtn)} type='submit' disabled={disabled}>
                Save
                {' '}
                {
                  isSavePending ? <FaIcon icon='cog' className='fa-spin' /> : <FaIcon icon='save' />
                }
              </button>
              <button className={cn(styles.cancelBtn)} type='button' onClick={isNew ? onCloseClick : onCancelClick} disabled={disabled}>Cancel</button>
            </React.Fragment>
          }
          {
            (!isNew && !isEditPatientInfoForm) &&
            <button className={cn(styles.closeBtn)} type='button' onClick={onCloseClick}>Close</button>
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    isEditPatientInfoForm: state.rrf.isEditPatientInfoForm,
    isSavePending: !!state.api.pending.API_PUT_PATIENT || !!state.api.pending.API_POST_PATIENT,
    isDeletePending: !!state.api.pending.API_DELETE_PATIENT,
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  const { patientId } = ownProps

  return {
    onEditClick: function () {
      return dispatch(patientActions.editPatientInfoForm())
    },
    onCancelClick: function () {
      return dispatch(patientActions.cancelPatientInfoForm())
    },
    onCloseClick: function () {
      return dispatch(patientActions.closePatientInfoForm())
    },
    onDeleteClick: function () {
      return dispatch(patientActions.deletePatient(patientId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buttons)
