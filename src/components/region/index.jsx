import PropTypes from "prop-types"
import React from "react"
import classnames from "classnames"
import styles from "./region.module.scss"

const Region = ({ className, children, regionType = "section", ...otherProps }) => {
  const regionElement =
    typeof regionType === "string"
      ? React.createElement(regionType)
      : React.createElement("section")
  return (
    <regionElement.type className={classnames(styles.region, className)} {...otherProps}>
      {children}
    </regionElement.type>
  )
}

Region.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  regionType: PropTypes.string,
}

export default Region
