import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import PatientList from 'ehrSrc/components/PatientList'
import PatientInfo from 'ehrSrc/components/PatientInfo'

import styles from './style.scss'

export default class Base extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  }

  render () {
    return (
      <div className={cn(styles.base, this.props.className)}>
            <h1>Medical card</h1>
        <div className={cn(styles.content)}>
          <PatientList className={cn(styles.patientList)} />
          <PatientInfo className={cn(styles.patientInfo)} />
        </div>
      </div>
    )
  }
}
