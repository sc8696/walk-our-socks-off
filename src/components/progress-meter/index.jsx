import { Line } from "rc-progress"
import PropTypes from "prop-types"
import React from "react"
import styles from "./progress-meter.module.scss"

const ProgressMeter = ({
  name = "",
  icon = null,
  colour = null,
  steps = 0,
  distanceTravelled = 0,
  distanceToTravel = 0,
} = {}) => {
  const percentTravelled = (distanceTravelled / distanceToTravel) * 100

  return (
    <figure className={styles.progressMeter}>
      <div className={styles.heading} role="heading">
        <div role="presentation" aria-hidden="true" className={styles.icon}>
          {icon}
        </div>
        <span role="heading" className={styles.progressTitle}>
          {name}&rsquo;s progress
        </span>
      </div>
      <Line
        className={styles.progressBar}
        strokeLinecap="square"
        percent={percentTravelled}
        strokeWidth={2.5}
        strokeColor={colour}
        trailWidth={2.5}
      />
      <div className={styles.stats}>
        <dl>
          <div>
            <dt>total steps</dt>
            <dd>{steps}</dd>
          </div>
          <div>
            <dt>km walked</dt>
            <dd>{distanceTravelled}</dd>
          </div>
          <div>
            <dt>km left to go</dt>
            <dd>{distanceToTravel}</dd>
          </div>
        </dl>
      </div>
    </figure>
  )
}

ProgressMeter.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.element,
  colour: PropTypes.string,
  steps: PropTypes.number,
  distanceTravelled: PropTypes.number,
  distanceToTravel: PropTypes.number,
}

export default ProgressMeter
