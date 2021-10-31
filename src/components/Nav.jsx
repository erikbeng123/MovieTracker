import React from 'react'
import { NavLink } from 'react-router-dom'
import Camera from '../svg/Camera.jsx'
import Guitar from '../svg/Guitar.jsx'
import Fork from '../svg/Fork.jsx'
import Graph from '../svg/Graph.jsx'
import styles from './Nav.styles.scss'

const Nav = () => {
  return (
    <nav className={styles.navMain}>
      <ul className={styles.navList}>
        <li className={styles.navLink}>
          <NavLink to="/movies" activeClassName={styles.selected}>
            <Camera />
            <small>Movies</small>
          </NavLink>
        </li>
        <li className={styles.navLink}>
          <NavLink to="/concerts" activeClassName={styles.selected}>
            <Guitar />
            <small>Concerts</small>
          </NavLink>
        </li>
        <li className={styles.navLink}>
          <NavLink to="/restaurants" activeClassName={styles.selected}>
            <Fork />
            <small>Restaurants</small>
          </NavLink>
        </li>
        <li className={styles.navLink}>
          <NavLink to="/data" activeClassName={styles.selected}>
            <Graph />
            <small>Data</small>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
