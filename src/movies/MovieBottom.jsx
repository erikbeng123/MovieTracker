import React, { useState, useEffect } from 'react'
import styles from './MovieBottom.styles.scss'

const MovieBottom = ({ shouldShow, movie }) => {
  const [showRate, setShowRate] = useState(false)
  useEffect(() => {
    if (!shouldShow) {
      setTimeout(() => {
        setShowRate(false)
      }, 300)
    }
  }, [shouldShow])

  return (
    <div
      className={styles.container}
      style={{ transform: `translateY(${shouldShow ? '-100' : '0'}%)` }}
    >
      <div
        className={styles.movieInfo}
        style={{ visibility: `${showRate ? 'hidden' : 'visible'}` }}
      >
        <strong>{movie.title}</strong>
        <small>{movie.year}</small>
      </div>
    </div>
  )
}

export default MovieBottom
