import React from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'
import { Errors } from 'react-redux-form'

import styles from './errors.scss'

export default class CustomErrors extends React.Component {
  static propTypes = {
    wrapperClassName: PropTypes.string,
  }

  render () {
    const { wrapperClassName, ...other } = this.props

    return (
      <Errors
        {...other}
        show='touched'
        wrapper={
          (props) => <div className={cn(styles.wrapper, wrapperClassName)}>{props.children}</div>
        }
      />
    )
  }
}
