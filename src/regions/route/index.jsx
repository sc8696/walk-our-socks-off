import React, { useContext } from "react";

import Map from "../../components/map";
import { ProgressContext } from "../../contexts/progress.provider";
import Region from "../../components/region";
import styles from "./route.module.scss";

const Route = () => {
  const { progress } = useContext(ProgressContext) || {};

  return (
    <Region className={styles.route}>
      <header className={styles.heading}>
        <h2>
          Follow us <span className={"unemph"}>on our virtual route</span>
        </h2>
      </header>
      <figure className={styles.mapContainer}>
        <Map characters={progress} />
      </figure>
    </Region>
  );
};

Route.propTypes = {};

export default Route;
