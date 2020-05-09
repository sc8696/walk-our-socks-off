import LucyGraphic from "./../../images/lucy.svg"
import PropTypes from "prop-types"
import React from "react"
import styles from "./character.module.scss";

const Lucy = ({ className = "" }) => {
  return (
    <div role="presentation" aria-hidden="true" className={className}>
      <LucyGraphic
        role="presentation"
        aria-hidden="true"
        alt="Lucy"
        className={styles.character}
      />
    </div>
  )
}

Lucy.propTypes = {
  className: PropTypes.string,
}

export default Lucy
