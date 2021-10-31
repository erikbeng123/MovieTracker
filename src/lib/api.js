import data from '../data.json'

const normalizeMovies = movie => {
  return {
    id: movie.imdbID,
    title: movie.Title,
    poster: movie.Poster,
    year: movie.Year,
  }
}

const cleanUpMovieData = movieData => {
  console.log(movieData)
  return movieData.Response === 'False'
    ? {
        movies: [],
        total: 0,
      }
    : {
        movies: movieData.Search.map(normalizeMovies),
        total: movieData.totalResults,
      }
}

const apiKey = '5fc18a2f'

const searchMovies = (search, page) => {
  const endPoint = `http://www.omdbapi.com/?apikey=${apiKey}&s=${search}&type=movie&page=${page}`
  return fetch(endPoint)
    .then(response => response.json())
    .then(cleanUpMovieData)
}

const getMovieDetails = id => {
  const endPoint = `http://www.omdbapi.com/?apikey=${apiKey}&i=${id}&type=movie`
  return fetch(endPoint)
    .then(response => response.json())
    .then(details => {
      return {
        id,
        title: details.Title,
        year: details.Year,
        released: details.Released,
        director: details.Director,
        actors: details.Actors,
        plot: details.Plot,
        ratings: details.Ratings.map(x => ({
          source: x.Source,
          value: x.Value,
        })),
      }
    })
}

const getSeenMovies = () => new Promise(resolve => resolve(data.seenMovies))

const saveSeenMovies = movies => Promise.resolve('ok')

export { searchMovies, getSeenMovies, saveSeenMovies, getMovieDetails }
