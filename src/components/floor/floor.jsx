import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";
import styles from "./floor.module.scss";

const Floor = ({ className }) => {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={classnames(styles.floor, className)}
    ></div>
  );
};

Floor.propTypes = {
  className: PropTypes.string
};

export default Floor;
