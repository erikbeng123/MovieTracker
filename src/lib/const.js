export const AWESOME = 5
export const GOOD = 4
export const MEDIOCRE = 3
export const BAD = 2
export const AWFUL = 1

export const ratings = [
  { value: AWESOME, label: 'Awesome', color: '#4caf50' },
  // { value: GOOD, label: 'Good', color: '#cddc39' },
  { value: MEDIOCRE, label: 'Mediocre', color: '#ffc107' },
  // { value: BAD, label: 'Bad', color: '#f57c00' },
  { value: AWFUL, label: 'Awful', color: '#870000' },
]

export const sortByLookup = {
  alpha: 'Title',
  year: 'Year',
  rating: 'Rating',
}

export const movieType = {
  SEEN: 'seen',
  SEARCH: 'search',
}

export const mediaSizes = {
  large: 2000,
  medium: 1000,
  small: 500,
}
