import { Line } from "rc-progress";
import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";
import styles from "./progress-meter.module.scss";
import uuid from "uuid";

const ProgressMeter = ({
  name = "",
  colour = null,
  icon = null,
  steps = 0,
  distanceTravelled = 0,
  distanceToTravel = 0,
  descriptionText = "",
  isLoaded = false
} = {}) => {
  const percentTravelled =
    (distanceTravelled / (distanceToTravel + distanceTravelled)) * 100;
  const figureId = uuid();

  return (
    <>
      <p className={styles.figureDescription} id={figureId}>
        {descriptionText}
      </p>
      <figure
        className={classnames(styles.progressMeter, {
          [styles.loaded]: isLoaded
        })}
        aria-describedby={figureId}
      >
        <div className={styles.heading} role="heading" aria-hidden="true">
          {icon && (
            <div role="presentation" className={styles.icon}>
              {icon}
            </div>
          )}
          <span role="heading" className={styles.progressTitle}>
            {name}&rsquo;s progress
          </span>
        </div>
        <Line
          className={styles.progressBar}
          strokeLinecap="square"
          percent={isLoaded ? percentTravelled : 0}
          strokeWidth={2.5}
          strokeColor={colour}
          trailWidth={2.5}
        />
        <div className={styles.stats} role="presentation" aria-hidden="true">
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
    </>
  );
};

ProgressMeter.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.element,
  colour: PropTypes.string,
  steps: PropTypes.number,
  distanceTravelled: PropTypes.number,
  distanceToTravel: PropTypes.number,
  descriptionText: PropTypes.string,
  isLoaded: PropTypes.bool
};

export default ProgressMeter;
