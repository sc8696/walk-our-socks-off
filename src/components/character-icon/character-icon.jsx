import PropTypes from "prop-types"
import React from "react"
import classnames from "classnames"
import styles from "./floor.module.scss"

const CharacterIcon = ({ className }) => {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={classnames(styles.floor, className)}
    ></div>
  )
}

CharacterIcon.propTypes = {
  className: PropTypes.string,
}

export default CharacterIcon
