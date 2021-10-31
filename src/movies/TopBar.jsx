import React from 'react'
import Plus from '../svg/Plus.jsx'
import GalleryIcon from '../svg/GalleryIcon.jsx'
import ListIcon from '../svg/ListIcon.jsx'
import { Link } from 'react-router-dom'
import styles from './TopBar.styles.scss'

const TopBar = ({ dispatch, viewType }) => {
  const toggleSearch = () => {
    dispatch({
      type: 'toggle_search',
      showSearch: true,
    })
  }

  const toggleViewType = viewType => () => {
    dispatch({
      type: 'view_type',
      viewType,
    })
  }

  return (
    <div className={styles.topBar}>
      <ul className={styles.tobBarContents}>
        <li
          className={`${styles.displayOptionButton} ${
            viewType === 'GRID' ? styles.selected : ''
          } `}
          onClick={toggleViewType('GRID')}
        >
          <GalleryIcon />
        </li>
        <li
          className={`${styles.displayOptionButton} ${
            viewType === 'LIST' ? styles.selected : ''
          }`}
          onClick={toggleViewType('LIST')}
        >
          <ListIcon />
        </li>
        <div className={styles.divider}></div>
        <li>
          <Link to="/movies/search">
            <button className={styles.toSearchButton} onClick={toggleSearch}>
              Add Movies
              <Plus />
            </button>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default TopBar
