import { useReducer } from 'react'

const appState = {
  sortedSeen: {
    sortBy: 'alpha',
    dir: 'asc',
  },
  movieInFocus: null,
  seenMovies: [],
  searchedMovies: [],
  searchMovieTotal: 0,
  searchInput: '',
  isInited: false,
  showSearch: true,
  viewType: 'GRID',
}

const sortSeenMovies = (movies, sortState) => {
  if (sortState.sortBy === 'alpha') {
    return movies.slice().sort((a, b) => (a.title <= b.title ? -1 : 1))
  }
  const sortBy = sortState.sortBy === 'rating' ? 'rating' : 'year'
  return movies.slice().sort((a, b) => b[sortBy] - a[sortBy])
}

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

const cleanUpMovieData = movieData => ({
  movies: filterMovies(movieData.Search.map(normalizeMovies)),
  total: movieData.totalResults,
})

const reducer = (state, action) => {
  switch (action.type) {
    case 'init':
      return { ...state, ...action.data, isInited: true }
    case 'search':
      const rated = action.data.movies.map(x => {
        const seen = state.seenMovies.find(y => y.id === x.id)
        return seen ? { ...x, rating: seen.rating } : x
      })
      return {
        ...state,
        searchedMovies: rated,
        searchMovieTotal: action.data.total,
      }
    case 'search_input': {
      return { ...state, searchInput: action.data }
    }
    case 'clear_search': {
      return {
        ...state,
        searchInput: '',
        showSearch: false,
        searchedMovies: [],
      }
    }
    case 'rate': {
      const alreadySeen = state.seenMovies.find(x => x.id === action.data.id)
      const rateMovie = x =>
        x.id === action.data.id ? { ...x, rating: action.data.rating } : x
      const newSeenMovies = alreadySeen
        ? state.seenMovies.map(rateMovie)
        : state.seenMovies.concat([action.data])
      const sorted = sortSeenMovies(newSeenMovies, { sortBy: 'alpha' })
      const searchedMovies = state.searchedMovies.map(rateMovie)
      return { ...state, searchedMovies, seenMovies: sorted }
    }
    case 'remove': {
      const seenMovies = state.seenMovies.filter(x => x.id !== action.data)
      const searchedMovies = state.searchedMovies.map(x => {
        return x.id === action.data ? { ...x, rating: null } : x
      })
      return { ...state, searchedMovies, seenMovies }
    }
    case 'sort_seen': {
      const seenMovies = sortSeenMovies(state.seenMovies, action.data)
      return { ...state, seenMovies, sortedSeen: action.data }
    }
    case 'toggle_search': {
      return { ...state, showSearch: action.showSearch }
    }
    case 'show_movie_details': {
      return { ...state, movieInFocus: action.data }
    }
    case 'view_type': {
      return { ...state, viewType: action.viewType }
    }
    default:
      return state
  }
}

const serialize = newState => {
  localStorage.setItem('movies', JSON.stringify(newState))
}

const middleware = [serialize]

const setUpReducer = (state, action) => {
  const newState = reducer(state, action)
  middleware.forEach(fn => fn(newState))
  return newState
}

const useMovieStore = () => {
  const serialized = localStorage.getItem('movies')
  const initState = serialized ? JSON.parse(serialized) : appState
  // const initState = appState
  return useReducer(setUpReducer, { ...appState, ...initState })
}

export default useMovieStore
