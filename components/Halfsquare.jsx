import React from 'react'

const Halfsquare = ({left_color, right_color}) => {
  return (
    <div className={`color_selector overflow-hidden flex-start rotate-[125deg]`} style={{ backgroundColor: left_color }}>
        <div className={`angled-semi-circle w-11 h-[50%]`} style={{ backgroundColor: right_color }}></div>
    </div>
  )
}

export default Halfsquare