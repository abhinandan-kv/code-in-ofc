import React from "react";
import MouseHoc from "./MouseHoc";

const MouseFunctional = ({currentPosi}) => {
    let xValue = currentPosi.x;
    let yValue = currentPosi.y;
    // console.log(`Inside MouseFuncitonal ${xValue}, ${yValue}`)
  return (
    <div  style={{width:'80vw',display:'flex' ,justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
      <h5>Mouse functionality increased by HOC</h5>
      <span  style={{fontSize:'100px', fontFamily:'cursive'}}>X: {xValue}</span>
      <span  style={{fontSize:'100px', fontFamily:'cursive'}}>Y: {yValue}</span>
    </div>
  );
};

const MouseFunctionalComponent = MouseHoc(MouseFunctional)

export default MouseFunctionalComponent;
