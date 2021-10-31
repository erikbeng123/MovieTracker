import React from 'react'
import FilterBtn from './components/FilterBtn.jsx'
import styles from './Filter.styles.scss'

const Filter = ({ sortData, dispatch }) => {
  return (
    <div className={styles.container}>
      <strong className={styles.label}>Sort by:</strong>
      <ul className={styles.filterList}>
        <FilterBtn sortBy={'rating'} sortData={sortData} dispatch={dispatch} />
        <FilterBtn sortBy={'year'} sortData={sortData} dispatch={dispatch} />
        <FilterBtn sortBy={'alpha'} sortData={sortData} dispatch={dispatch} />
      </ul>
    </div>
  )
}

export default Filter
