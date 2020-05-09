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
  title = null,
  ...otherProps
}) => {
  if (link) {
    return (
      <a
        href={link}
        title={title}
        target="_"
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
      title={title}
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
  title: PropTypes.string
}

export default Button
