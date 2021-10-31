import React from 'react'
import Movie from './Movie.jsx'
import { movieType } from '../lib/const.js'
import styles from './MovieList.styles.scss'

const MovieList = ({ seenMovies, dispatch }) => {
  return (
    <div className={styles.movieList}>
      {seenMovies.map(movie => (
        <Movie
          key={movie.id}
          movie={movie}
          dispatch={dispatch}
          type={movieType.SEEN}
        />
      ))}
    </div>
  )
}

export default React.memo(MovieList)
