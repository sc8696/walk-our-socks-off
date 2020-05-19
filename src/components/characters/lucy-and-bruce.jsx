import BruceGraphic from "./../../images/bruce.svg";
import LucyGraphic from "./../../images/lucy.svg";
import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";
import styles from "./lucy-and-bruce.module.scss";

const LucyAndBruce = ({ className }) => {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={classnames(styles.lucyAndBruce, className)}
    >
      <LucyGraphic
        role="presentation"
        aria-hidden="true"
        alt="Lucy"
        className={styles.lucy}
      ></LucyGraphic>
      <BruceGraphic
        role="presentation"
        aria-hidden="true"
        alt="Bruce, Lucy's Guidedog, and Lucy"
        className={styles.bruce}
      ></BruceGraphic>
    </div>
  );
};

LucyAndBruce.propTypes = {
  className: PropTypes.string
};

export default LucyAndBruce;
