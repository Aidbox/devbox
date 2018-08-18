import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { connect } from 'react-redux'
import { Form, Control } from 'react-redux-form'

import * as patientActions from 'ehrSrc/actions/patient'
import FaIcon from 'ehrSrc/components/common/FaIcon'

import styles from './style.scss'

export class FindPatientByNameForm extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    isPending: PropTypes.bool,
    onSubmit: PropTypes.func,
  }

  render () {
    const { onSubmit, isPending } = this.props

    return (
      <Form className={cn(styles.findPatientByNameForm, this.props.className)} model='rrf.findPatientByNameForm' onSubmit={onSubmit}>
        <div className={cn(styles.fieldset)}>
          <Control className={cn(styles.search)} type='search' autoFocus disabled={isPending} model='.search' />
          <button className={cn(styles.submit)} type='submit' disabled={isPending}>
            Search
            {' '}
            {
              isPending ? <FaIcon icon='cog' className='fa-spin' /> : <FaIcon icon='search' />
            }
          </button>
        </div>
      </Form>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    onSubmit: function (values) {
      return dispatch(patientActions.submitFindPatientByNameForm({...values, page: 0}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindPatientByNameForm)
