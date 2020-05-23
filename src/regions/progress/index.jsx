import React, { useState } from "react";

import { App } from "../../config/config";
import { ProgressHook } from "../../hooks/progress.hook";
import ProgressMeter from "../../components/progress-meter";
import Region from "../../components/region";
import VisibilitySensor from "react-visibility-sensor";
import styles from "./progress.module.scss";

const Progress = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { progress } = ProgressHook();

  const isLoaded =
    (progress?.get("sarah")?.timeline?.length ?? 0) > 0 &&
    (progress?.get("lucy")?.timeline?.length ?? 0) > 0;

  return (
    <Region className={styles.progress}>
      <header className={styles.heading}>
        <h2>Our progress</h2>
      </header>
      <VisibilitySensor
        active={!isVisible}
        onChange={v => setIsVisible(v)}
        minTopValue={115}
        partialVisibility
        scrollThrottle={App.scrollThrottle}
      >
        <div className={styles.meters}>
          {Array.from(progress.values()).map((character, index) => {
            const descriptionText = `${character.name} has walked ${character.totalSteps} steps, and a total of ${character.distanceTravelled} kilometres. She has ${character.distanceToTravel} kilometres to go`;
            return (
              <ProgressMeter
                key={index}
                name={character.name}
                icon={character.avatar}
                colour={character.colour}
                steps={character.totalSteps}
                distanceTravelled={character.distanceTravelled}
                distanceToTravel={character.distanceToTravel}
                isLoaded={isLoaded && isVisible}
                descriptionText={descriptionText}
              ></ProgressMeter>
            );
          })}
        </div>
      </VisibilitySensor>
    </Region>
  );
};

Progress.propTypes = {};

export default Progress;
