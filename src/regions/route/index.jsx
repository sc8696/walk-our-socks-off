import Map from "../../components/map";
import React from "react";
import Region from "../../components/region";
import styles from "./route.module.scss";

const Route = () => {
  return (
    <Region className={styles.route}>
      <header className={styles.heading}>
        <h2>
          Follow us <span className={"unemph"}>on our virtual route</span>
        </h2>
      </header>
      <figure className={styles.mapContainer}>
        <Map />
      </figure>
    </Region>
  );
};

Route.propTypes = {};

export default Route;
