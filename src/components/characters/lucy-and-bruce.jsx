import LucyAndBruceGraphic from "./../../images/Lucy-And-Bruce.svg"
import PropTypes from "prop-types"
import React from "react"
import styles from "./lucy-and-bruce.module.scss"

const LucyAndBruce = ({ className }) => {
  return (
    <div role="presentation" aria-hidden="true" className={className}>
      <LucyAndBruceGraphic
        role="presentation"
        aria-hidden="true"
        alt="Bruce, Lucy's Guidedog, and Lucy"
        className={styles.lucyAndBruce}
      />
    </div>
  )
}

LucyAndBruce.propTypes = {
  className: PropTypes.string,
}

export default LucyAndBruce
