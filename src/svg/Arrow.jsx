import React from 'react'

const directions = {
  DOWN: 0,
  UP: 180,
  LEFT: 90,
  RIGHT: 270,
}

const Arrow = ({ dir = 'DOWN' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transition: '0.3s',
        transform: `rotateZ(${directions[dir] || 0}deg)`,
        width: '100%',
        height: '100%',
      }}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  )
}

export default Arrow
