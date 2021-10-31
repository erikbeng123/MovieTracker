import React, { useEffect, useRef } from 'react'
import styles from './ScrollBox.styles.scss'

const ScrollBox = ({ rootEl, intersectCb, watching, children }) => {
  const bottomEl = useRef(null)

  const cb = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        intersectCb()
      }
    })
  }

  useEffect(() => {
    const options = {
      root: rootEl.current,
      rootMargin: '0px',
      threshold: 0.5,
    }
    const observer = new IntersectionObserver(cb, options)
    observer.observe(bottomEl.current)
    return () => {
      observer.unobserve(bottomEl.current)
    }
  }, [watching])

  return (
    <div className={styles.scrollBox} ref={rootEl}>
      {children}
      <div className={styles.bottom} ref={bottomEl}></div>
    </div>
  )
}

export default ScrollBox
