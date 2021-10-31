import { searchMovies } from '../lib/api.js'
import React, { useEffect } from 'react'
import Plus from '../svg/Plus.jsx'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { useState } from 'react'
import ScrollBox from './components/ScrollBox'
import SearchMovie from './SearchMovie'
import styles from './Search.styles.scss'

const filterMovies = movieData => {
  const movieIds = new Set()
  const filteredMovies = []
  for (const movie of movieData) {
    if (!movieIds.has(movie.id)) {
      filteredMovies.push(movie)
      movieIds.add(movie.id)
    } else {
      const fake = { hide: true }
      filteredMovies.push(fake)
    }
  }
  return filteredMovies
}

const NoMovies = () => {
  return <div>No Movies</div>
}

const Search = ({
  searchedMovies,
  searchMovieTotal,
  searchInput,
  dispatch,
}) => {
  const rootEl = useRef(null)
  const searchInputEl = useRef(null)
  const [localSearchInput, setLocalSearchInput] = useState(searchInput)
  const filteredMovies = filterMovies(searchedMovies)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    searchInputEl.current.focus()
    return () => {
      document.body.style.overflow = 'initial'
    }
  }, [])

  const resetSearch = () => {
    dispatch({ type: 'clear_search' })
  }

  const handleChange = e => {
    setLocalSearchInput(e.target.value)
  }

  const close = e => {
    if (e.target === e.currentTarget) {
      resetSearch()
      history.back()
    }
  }

  const search = e => {
    if (e.key === 'Enter') {
      dispatch({ type: 'search_input', data: localSearchInput })
      rootEl.current.scrollTop = 0
      if (localSearchInput.length >= 3) {
        searchMovies(localSearchInput, 1)
          .then(async ({ movies, total }) => {
            if (movies.length < 12) {
              const moreMovies = await searchMovies(localSearchInput, 2)
              return { movies: movies.concat(moreMovies.movies), total }
            }
            return { movies, total }
          })
          .then(({ movies, total }) => {
            dispatch({ type: 'search', data: { movies, total } })
          })
      } else {
        dispatch({ type: 'search', data: { movies: [], total: 0 } })
      }
    }
  }

  const scroll = () => {
    if (searchInput && searchMovieTotal > searchedMovies.length) {
      const page = Math.floor(searchedMovies.length / 10) + 1
      searchMovies(searchInput, page).then(({ movies, total }) => {
        const concatMovies = searchedMovies.concat(movies)
        dispatch({ type: 'search', data: { movies: concatMovies, total } })
      })
    }
  }

  return (
    <div className={styles.mask} onClick={close}>
      <div className={styles.searchArea}>
        <div className={styles.top}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search..."
            onChange={handleChange}
            onKeyUp={search}
            value={localSearchInput}
            ref={searchInputEl}
          />
          <Link to="/movies">
            <button className={styles.closeButton} onClick={resetSearch}>
              <Plus />
            </button>
          </Link>
        </div>
        <div className={styles.movieGridWrapper}>
          <ScrollBox
            rootEl={rootEl}
            intersectCb={scroll}
            watching={searchedMovies}
          >
            <div className={styles.movieGrid}>
              {filteredMovies.length > 0 ? (
                filteredMovies
                  .filter(x => !x.hide)
                  .map(movie => (
                    <SearchMovie
                      key={movie.id}
                      movie={movie}
                      dispatch={dispatch}
                    />
                  ))
              ) : (
                <NoMovies />
              )}
            </div>
          </ScrollBox>
        </div>
      </div>
    </div>
  )
}

export default Search
