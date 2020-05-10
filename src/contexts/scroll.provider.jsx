import React, { useCallback, useEffect, useState } from "react";

import PropTypes from "prop-types";
import { throttle } from "lodash";

export const ScrollContext = React.createContext();

/**
 * Gives the current scroll position to anything willing to listen to it
 * Example:
 * const { scrollPosition } = useContext(ScrollContext)
 * @param {*} param0
 */
export const ScrollProvider = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  /** Throttle to once every 1/5th of a second*/
  const handleScroll = useCallback(
    throttle(() => {
      setScrollPosition(
        window.pageYOffset || document.documentElement.scrollTop
      );
    }, 200),
    [setScrollPosition]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <ScrollContext.Provider value={{ scrollPosition }}>
      {children}
    </ScrollContext.Provider>
  );
};

ScrollProvider.propTypes = {
  children: PropTypes.any
};
