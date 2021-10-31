import React from 'react'
import { Link } from 'react-router-dom'
import Plus from '../../svg/Plus'
import styles from './AddBtn.styles.scss'

const AddBtn = () => {
  return (
    <Link to="/movies/search">
      <button className={styles.addButton}>
        <Plus />
      </button>
    </Link>
  )
}

export default AddBtn
