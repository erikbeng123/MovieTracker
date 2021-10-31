import React from 'react'
import Plus from '../../svg/Plus.jsx'

import styles from './XButton.styles.scss'

const XButton = ({ onClick }) => {
  return (
    <button className={styles.xButton} onClick={onClick}>
      <Plus />
    </button>
  )
}

export default XButton
