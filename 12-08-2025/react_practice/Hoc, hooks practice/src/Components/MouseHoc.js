import React, { useEffect, useRef, useState } from "react";

const MouseHoc = (WrappedComponent) => {
  const EnhancedComponent = (props) => {
    // console.log(WrappedComponent)
    const [darkBg, setDarkBg] = useState(false);

    const handleMouseEnter = () => {
      setDarkBg(true);
    };
    const handleMouseLeave = () => {
      setDarkBg(false);
    };

    return (
      <>
        <WrappedComponent {...props} />
        <div style={{  display: "flex", justifyContent: "center" }}>
          <div
            style={
              darkBg
                ? { backgroundColor: "black", color: "white", width: "200px", height: "200px", border: "5px solid black" }
                : { backgroundColor: "red", width: "200px", height: "200px", border: "5px solid black" }
            } 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          ></div>
        </div>
      </>
    );
  };
  return EnhancedComponent;
};

export default MouseHoc;
