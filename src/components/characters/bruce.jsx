import BruceGraphic from "./../../images/bruce.svg"
import BruceWithoutLeadGraphic from "./../../images/bruce-without-lead.svg"
import PropTypes from "prop-types"
import React from "react"
import styles from "./character.module.scss"

const Bruce = ({ className = "", withLead = true }) => {
  const Graphic = withLead ? BruceGraphic : BruceWithoutLeadGraphic
  return (
    <div role="presentation" aria-hidden="true" className={className}>
      <Graphic
        role="presentation"
        aria-hidden="true"
        alt="Bruce, Lucy's Guide Dog"
        className={styles.character}
      />
    </div>
  )
}

Bruce.propTypes = {
  withLead: PropTypes.bool,
  className: PropTypes.string,
}

export default Bruce
