import { useState, useEffect } from "react";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
};

export const useLongMobileQuery = () => {
  const [isLongMobile, setIsLongMobile] = useState(false);

  useEffect(() => {
    const handleOrientationChange = () => {
      const { height, width } = window.screen;
      const ratio = height / width;
      setIsLongMobile(ratio >= 2.3);
    };

    handleOrientationChange();

    window.addEventListener("resize", handleOrientationChange);
    return () => window.removeEventListener("resize", handleOrientationChange);
  }, []);

  return isLongMobile;
};

export default useMediaQuery;
