import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import getPageCount from 'ehrSrc/utils/getPageCount'

import styles from './pagination.scss'

export default class Pagination extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    isPending: PropTypes.bool,
    total: PropTypes.number,
    curPage: PropTypes.number,
    selectPage: PropTypes.func,
  }

  render () {
      const { isPending, total, curPage, selectPage } = this.props;

    return (
      <ul className={cn(styles.pagination, this.props.className)}>
        {
          [...Array(getPageCount(total)).keys()].map(function (i) {
            const isSelect = (curPage === i)

            return (
              <li className={cn(styles.pageItem, {[styles.curPageItem]: isSelect})} key={i}>
                <button type='button' onClick={selectPage.bind(this, i)} disabled={isPending}>{i + 1}</button>
              </li>
            )
          })
        }
      </ul>
    )
  }
}
