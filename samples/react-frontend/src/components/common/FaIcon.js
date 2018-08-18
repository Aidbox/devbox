import React from 'react'
import PropTypes from 'prop-types'

export default class FaIcon extends React.Component {
  static propTypes = {
    icon: PropTypes.string,
    className: PropTypes.string,
  }

  render () {
    const { icon, className = '', ...other } = this.props

    return (
      <i aria-hidden {...other} className={`fa fa-${icon} ${className}`} />
    )
  }
}
