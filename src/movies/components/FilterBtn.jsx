import React from 'react'
import { sortByLookup } from '../../lib/const.js'
import styles from './FilterBtn.styles.scss'

const FilterBtn = ({ sortBy, sortData, dispatch }) => {
  const isSelected = sortBy === sortData.sortBy
  const sort = sortBy => () => {
    const data = { sortBy }
    dispatch({ type: 'sort_seen', data })
  }
  return (
    <li
      className={styles.filterButton}
      style={{ background: isSelected ? '#541388' : '#fff' }}
    >
      <button
        style={{ color: isSelected ? '#fff' : '' }}
        onClick={sort(sortBy)}
      >
        {sortByLookup[sortBy]}
      </button>
    </li>
  )
}

export default FilterBtn
