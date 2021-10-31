import React from 'react'
import Plus from '../svg/Plus.jsx'
import styles from './SearchMovie.styles.scss'

const calcFontSize = (title = '') => {
  if (title.length > 20) {
    return 13
  } else if (title.length > 10) {
    return 16
  }
  return 18
}

const SearchMovie = ({ movie, dispatch }) => {
  const clickHandler = () => {
    if (!movie.rating) {
      dispatch({ type: 'rate', data: { ...movie, rating: 3 } })
    } else {
      dispatch({ type: 'remove', data: movie.id })
    }
  }
  return (
    <div className={styles.searchMovies}>
      <div
        className={styles.poster}
        style={{ backgroundImage: `url(${movie.poster})` }}
      ></div>
      <div className={styles.movieData}>
        <strong style={{ fontSize: calcFontSize(movie.title) }}>
          {movie.title}
        </strong>
      </div>
      <button
        className={`${styles.addButton} ${movie.rating ? styles.rated : ''}`}
        onClick={clickHandler}
      >
        {!movie.rating ? <Plus /> : '-'}
      </button>
    </div>
  )
}

export default SearchMovie
