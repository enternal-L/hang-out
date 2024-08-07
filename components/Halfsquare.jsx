import React from 'react'

const Halfsquare = ({left_color, right_color, setMain, setBorder, selection, setBlackLogo}) => {


  return (
    <div className={`color_selector flex-start rotate-[125deg]`} onClick={() => {
        setMain(right_color); 
        setBorder(left_color);
        
        selection % 2 == 0 ? setBlackLogo(true) : setBlackLogo(false);
        }}
      >
        <div className={`angled-semi-circle-two w-11 h-[52%] absolute self-end`} style={{ backgroundColor: left_color }}></div>
        <div className={`angled-semi-circle w-11 h-[50%] absolute self-start`} style={{ backgroundColor: right_color }}></div>
    </div>
  )
}

export default Halfsquare