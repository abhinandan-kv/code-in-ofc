import { useEffect, useState } from "react";

function useIntersectionObserver(ref) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const div = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 1 }
    );
    observer.observe(div);
    return () => observer.disconnect();
  }, [ref]);

  return isIntersecting;
}

export default useIntersectionObserver;
