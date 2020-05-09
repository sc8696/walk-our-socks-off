import BruceGraphic from "./../../images/Bruce.svg"
import PropTypes from "prop-types"
import React from "react"
import styles from "./character.module.scss";

const Bruce = ({ className = "" }) => {
  return (
    <div role="presentation" aria-hidden="true" className={className}>
      <BruceGraphic
        role="presentation"
        aria-hidden="true"
        alt="Bruce, Lucy's Guide Dog"
        className={styles.character}
      />
    </div>
  )
}

Bruce.propTypes = {
  className: PropTypes.string,
}

export default Bruce
