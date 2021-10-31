import React, { useEffect } from 'react'
import { getSeenMovies } from '../lib/api.js'
import useMovieStore from './store/useMovieStore.js'
import Search from './Search.jsx'
import MovieList from './MovieList.jsx'
import TopBar from './TopBar.jsx'
import MovieDetails from './MovieDetails.jsx'
import { Route } from 'react-router-dom'
import styles from './WatchedMovies.styles.scss'

const WatchedMovies = () => {
  const [store, dispatch] = useMovieStore()

  useEffect(() => {
    if (!store.isInited) {
      getSeenMovies().then(movies => {
        dispatch({ type: 'init', data: { seenMovies: movies } })
      })
    }
  }, [])

  return (
    <div className={styles.WatchedMovies}>
      <TopBar viewType={store.viewType} dispatch={dispatch} />
      <div className={styles.listWrapper}>
        <MovieList
          seenMovies={store.seenMovies}
          sortData={store.sortedSeen}
          dispatch={dispatch}
        />
      </div>
      <Route path="/movies/search">
        <Search
          searchedMovies={store.searchedMovies}
          searchInput={store.searchInput}
          searchMovieTotal={store.searchMovieTotal}
          dispatch={dispatch}
        />
      </Route>
      <Route path="/movies/detail/:id">
        <MovieDetails movie={store.movieInFocus} dispatch={dispatch} />
      </Route>
    </div>
  )
}

export default WatchedMovies
