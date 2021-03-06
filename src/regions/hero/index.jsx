import Button from "../../components/button";
import Floor from "../../components/floor/floor";
import Link from "../../components/link";
import { Links } from "../../config/config";
import LucyAndBruce from "../../components/characters/lucy-and-bruce";
import React from "react";
import Region from "../../components/region";
import Sarah from "../../components/characters/sarah";
import styles from "./hero.module.scss";

const Hero = () => {
  return (
    <Region className={styles.hero}>
      <Floor className={styles.floor} />
      <header className={styles.header}>
        <h1>We&rsquo;re walking our socks off!</h1>
      </header>
      <p className={styles.information}>
        We&rsquo;re Sarah and Lucy and we&rsquo;re taking on the{" "}
        <Link href={Links.challenge.link} title={Links.challenge.title}>
          walk your socks off challenge
        </Link>{" "}
        for Guide Dogs. Our aim is to rack up enough steps each to cover the{" "}
        <em>250 kilometres</em> that's keeping us apart in lockdown.
      </p>
      <div className={styles.donateButtonContainer}>
        <Button
          title={Links.donate.title}
          buttonType="primary"
          link={Links.donate.link}
        >
          Donate
        </Button>
      </div>
      <div
        role="presentation"
        aria-hidden="true"
        className={styles.characterScene}
      >
        <Sarah className={styles.sarah} />
        <LucyAndBruce className={styles.lucyAndBruce} />
      </div>
    </Region>
  );
};

Hero.propTypes = {};

export default Hero;
