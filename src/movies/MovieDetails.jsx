import React, { useEffect } from 'react'
import { getMovieDetails } from '../lib/api'
import { useParams } from 'react-router-dom'
import Arrow from '../svg/Arrow.jsx'
import styles from './MovieDetails.styles.scss'

const calcFontSize = (title = '') => {
  if (title.length > 20) {
    return 3
  } else if (title.length > 10) {
    return 4.5
  }
  return 6
}

const MovieInfo = ({ title, year, plot, director, actors }) => {
  return (
    <div className={styles.movieInfo} style={{ fontSize: calcFontSize(title) }}>
      <h1>{title}</h1>
      <small>{year}</small>
      <p>{plot}</p>
      <span>
        Directed by: <strong>{director}</strong>
      </span>
      <span>
        Starring: <strong>{actors}</strong>
      </span>
    </div>
  )
}

const MovieDetails = ({ movie, dispatch }) => {
  const { id } = useParams()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    getMovieDetails(movie ? movie.id : id).then(details =>
      dispatch({ type: 'show_movie_details', data: { ...movie, ...details } })
    )
    return () => {
      document.body.style.overflow = 'initial'
      dispatch({ type: 'show_movie_details', data: null })
    }
  }, [])

  const close = () => {
    history.back()
  }

  return (
    <div className={styles.detailContainer}>
      <button to="/movies" onClick={close} className={styles.backButton}>
        <Arrow dir="LEFT" />
      </button>
      <div className={styles.detailContents}>
        <MovieInfo {...movie} />
        <div className={styles.posterContainer}>
          <div className={styles.posterFrame}>
            <img src={movie.poster} className={styles.poster} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
