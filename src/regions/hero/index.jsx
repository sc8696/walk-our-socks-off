import Button from "../../components/button"
import Floor from "../../components/floor/floor"
import { Links } from "../../config/config"
import LucyAndBruce from "../../components/characters/lucy-and-bruce"
import React from "react"
import Region from "../../components/region"
import Sarah from "../../components/characters/sarah"
import styles from "./hero.module.scss"

const Hero = () => {
  return (
    <Region className={styles.hero}>
      <Floor className={styles.floor} />
      <header className={styles.header}>
        <h1>We&rsquo;re walking our socks off!</h1>
      </header>
      <p className={styles.information}>
        This May, since we can&rsquo;t visit each other, we&rsquo;re each going
        to walk the 250 kilometres between us (whilst observing the COVID-19
        pandemic guidelines) in support of Guide Dogs{" "}
        <a href={Links.challengeLink} title="Donate to the Guide Dogs trust">
          walk your socks off challenge
        </a>
      </p>
      <div role="button" className={styles.donateButtonContainer}>
        <Button
          aria-label="Donate to the Guide Dogs Trust"
          title="Donate to the Guide Dogs trust"
          buttonType="primary"
          link={Links.donateLink}
        >
          Donate
        </Button>
      </div>
      {/* <Characters className={styles.charactersDesktop} /> */}
      <div
        role="presentation"
        aria-hidden="true"
        className={styles.characterScene}
      >
        <Sarah className={styles.sarah} />
        <LucyAndBruce className={styles.lucyAndBruce} />
      </div>
    </Region>
  )
}

Hero.propTypes = {}

export default Hero
