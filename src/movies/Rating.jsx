import React from 'react'
import { ratings, AWESOME, GOOD, MEDIOCRE, BAD, AWFUL } from '../lib/const.js'
import Smile from '../svg/Smile.jsx'
import Meh from '../svg/Meh.jsx'
import Frown from '../svg/Frown.jsx'
import styles from './Rating.styles.scss'

const ratingComponentLookup = {
  [AWESOME]: Smile,
  [GOOD]: Smile,
  [MEDIOCRE]: Meh,
  [BAD]: Meh,
  [AWFUL]: Frown,
}

const Rating = ({ movie, dispatch }) => {
  const rate = rating => {
    dispatch({ type: 'rate', data: { ...movie, rating } })
  }

  return (
    <ul className={styles.container}>
      {ratings.map(rating => {
        return (
          <li key={rating.value} className={styles.buttonItem}>
            <button
              onClick={() => rate(rating.value)}
              className={styles.button}
            >
              {ratingComponentLookup[rating.value]({
                isSelected: movie.rating === rating.value,
              })}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default Rating
