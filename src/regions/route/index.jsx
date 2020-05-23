import React, { useState } from "react";

import { App } from "../../config/config";
import Map from "../../components/map";
import { ProgressHook } from "../../hooks/progress.hook";
import Region from "../../components/region";
import VisibilitySensor from "react-visibility-sensor";
import styles from "./route.module.scss";

const Route = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { progress } = ProgressHook();

  const isLoaded =
    (progress?.get("sarah")?.timeline?.length ?? 0) > 0 &&
    (progress?.get("lucy")?.timeline?.length ?? 0) > 0;

  return (
    <VisibilitySensor
      active={!isVisible}
      onChange={v => setIsVisible(v)}
      minTopValue={500}
      partialVisibility
      scrollThrottle={App.scrollThrottle}
    >
      <Region className={styles.route}>
        <header className={styles.heading}>
          <h2>
            Follow us <span className={"unemph"}>on our virtual route</span>
          </h2>
        </header>
        <div className={styles.mapContainer}>
          <Map
            characters={progress}
            isLoaded={isLoaded}
            drawRoute={isLoaded && isVisible}
          />
        </div>
      </Region>
    </VisibilitySensor>
  );
};

Route.propTypes = {};

export default Route;
