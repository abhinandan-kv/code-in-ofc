import { useEffect, useState } from "react";
import MouseFunctional from "./MouseFunctional";

const MouseEnchanced = () => {
  const [position, setPosition] = useState({ x: null, y: null });

  useEffect(() => {
    function getCursorPosition(e) {
      setPosition({ x: e.clientX, y: e.clientY });
    //   console.log({ x: e.clientX, y: e.clientY }, "Indide useEffect")
    }

    window.addEventListener("mousemove", getCursorPosition);

    return () => window.removeEventListener("mousemove", getCursorPosition);
  }, [position]);

  return (
      <MouseFunctional currentPosi={position}/>
  );
};

export default MouseEnchanced;
