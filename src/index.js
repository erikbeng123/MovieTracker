import ReactDOM from 'react-dom'
import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './styles/normalize.css'
import styles from './styles/global.scss'

import WatchedList from './movies/WatchedMovies'
import Nav from './components/Nav'

const App = () => (
  <Router>
    <div className={styles.main}>
      <Nav />
      <Route path="/movies">
        <div className={styles.content}>
          <WatchedList />
        </div>
      </Route>
    </div>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('app'))
