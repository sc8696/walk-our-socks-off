import PropTypes from "prop-types";
import React from "react";

const Link = ({
  children,
  className,
  link = null,
  title = null,
  ...otherProps
}) => {
  return (
    <a
      href={link}
      title={title}
      target="_"
      className={className}
      {...otherProps}
    >
      {children}
    </a>
  );
};

Link.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  link: PropTypes.string,
  title: PropTypes.string
};

export default Link;
