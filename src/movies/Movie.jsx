import React from 'react'
import MovieRemoveButton from './components/XButton.jsx'
import MovieBottom from './MovieBottom.jsx'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Movie.styles.scss'

const Movie = ({ movie, dispatch }) => {
  const [showMovieBottom, setShowMovieBottom] = useState(false)

  const onClick = () => {
    dispatch({ type: 'show_movie_details', data: movie })
  }

  const remove = () => {
    dispatch({ type: 'remove', data: movie.id })
  }
  const toggleBottom = shouldShow => () => {
    setShowMovieBottom(shouldShow)
  }

  return (
    <div
      onMouseEnter={toggleBottom(true)}
      onMouseLeave={toggleBottom(false)}
      className={styles.movie}
    >
      <MovieRemoveButton onClick={remove} />
      <div
        onClick={onClick}
        className={styles.posterContainer}
        style={{ backgroundImage: `url(${movie.poster})` }}
      >
        <img
          src={movie.poster}
          alt={`${movie.title} poster`}
          style={{
            display: 'none',
            width: '100%',
          }}
        />
        <Link to={`/movies/detail/${movie.id}`}>
          <div className={styles.linkWrap}></div>
        </Link>
      </div>
      <MovieBottom
        shouldShow={showMovieBottom}
        movie={movie}
        dispatch={dispatch}
      />
    </div>
  )
}

export default React.memo(Movie)
