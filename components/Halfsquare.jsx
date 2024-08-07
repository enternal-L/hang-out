import React from 'react'

const Halfsquare = ({left_color, right_color, selection, setSelected, setButton}) => {


  return (
    <div className={`color_selector flex-start rotate-[125deg]`} onClick={() => {
        setSelected(selection);
        setButton(true);
      }}
      >
        <div className={`angled-semi-circle-two w-11 h-[52%] absolute self-end`} style={{ backgroundColor: left_color}}></div>
        <div className={`angled-semi-circle w-11 h-[50%] absolute self-start`} style={{ backgroundColor: right_color, borderColor: left_color, borderWidth: 3}}></div>
    </div>
  )
}

export default Halfsquare