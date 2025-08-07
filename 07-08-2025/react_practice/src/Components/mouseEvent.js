import { useEffect, useState } from "react";

function MouseEvent() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(e) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  console.log(position);

  return (
    <>
      <div
        id="mouseCircle"
        style={{
          position: "absolute",
          backgroundColor: "black",
          borderRadius: "50%",
          opacity: 0.6,
          transform: `translate(${position.x}px, ${position.y}px)`,
          pointerEvents: "none",
          cursor: "none",
          left: -20,
          top: -20,
          width: 40,
          height: 40,
        }}
      ></div>
    </>
  );
}

export default MouseEvent;
