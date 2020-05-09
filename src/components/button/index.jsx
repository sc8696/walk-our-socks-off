import PropTypes from "prop-types"
import React from "react"
import classnames from "classnames"

const classMap = {
  primary: "button-primary",
}

const Button = ({
  children,
  className,
  buttonType = "secondary",
  link = null,
  ...otherProps
}) => {
  if (link) {
    return (
      <a
        href={link}
        className={classnames("button", classMap[buttonType], className)}
        {...otherProps}
      >
        {children}
      </a>
    )
  }
  return (
    <button
      className={classnames(classMap[buttonType], className)}
      {...otherProps}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  buttonType: PropTypes.oneOf(["primary", "secondary"]),
  link: PropTypes.string,
}

export default Button
