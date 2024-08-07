import React from 'react'

const Halfsquare = ({left_color, right_color, setMain, setBorder, selection, setBlackLogo, setSelected}) => {


  return (
    <div className={`color_selector flex-start rotate-[125deg]`} onClick={() => {
        setMain(right_color); 
        setBorder(left_color);
        setSelected(selection);
        
        selection < 4 ? setBlackLogo(false) : setBlackLogo(true);
      }}
      >
        <div className={`angled-semi-circle-two w-11 h-[52%] absolute self-end`} style={{ backgroundColor: left_color }}></div>
        <div className={`angled-semi-circle w-11 h-[50%] absolute self-start`} style={{ backgroundColor: right_color }}></div>
    </div>
  )
}

export default Halfsquare