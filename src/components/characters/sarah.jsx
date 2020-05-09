import PropTypes from "prop-types"
import React from "react"
import SarahGraphic from "./../../images/Sarah.svg"
import styles from "./sarah.module.scss"

const Sarah = ({ className = "" }) => {
  return (
    <div role="presentation" aria-hidden="true" className={className}>
      <SarahGraphic
        role="presentation"
        aria-hidden="true"
        alt="Sarah"
        className={styles.sarah}
      />
    </div>
  )
}

Sarah.propTypes = {
  className: PropTypes.string,
}

export default Sarah
