import ProgressMeter from "../../components/progress-meter"
import React from "react"
import Region from "../../components/region"
import characterList from "../../consts/character-list"
import styles from "./progress.module.scss"

const Progress = () => {
  return (
    <Region className={styles.progress}>
      <header className={styles.heading}>
        <h2>Our progress</h2>
      </header>
      {characterList.map((character, index) => (
        <ProgressMeter
          key={index}
          name={character.name}
          colour={character.colour}
          steps={character.steps}
          distanceTravelled={character.distanceTravelled}
          distanceToTravel={character.distanceToTravel}
        ></ProgressMeter>
      ))}
    </Region>
  )
}

Progress.propTypes = {}

export default Progress
