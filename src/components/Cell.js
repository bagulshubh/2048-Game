import React from 'react'

const Cell = (props) => {
    let value = props.value;

    if(value===0){
        value="";
    }

  return (
    <span className= {value===0 ? ("cell") : value===2 ? ("cell c2") : value===4 ? ("cell c4"): value===8 ? ("cell c8") : value===16 ? ("cell c16"):  value===32 ? ("cell c32") : value===64 ? ("cell c64"): value===128 ? ("cell c128"): value===256 ? ("cell c256"):  value===512 ? ("cell c512"): value===1024 ? ("cell c1024"): value===2048 ? ("cell c2048"):"cell"}>{
        value
    }
        
    </span>
  )
}

export default Cell
