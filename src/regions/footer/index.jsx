import { Credits, Links } from "../../config/config";

import React from "react"
import Region from "../../components/region"
import styles from "./footer.module.scss"

const Footer = () => {
  return (
    <Region role="contentinfo" className={styles.footer} regionType={"footer"}>
      <header className={styles.heading}>
        <h2>Credits</h2>
      </header>
      <section className={styles.credit}>
        <h3 className={styles.creditTitle}>
          Created by Sarah McIntyre &amp; Steve Cumming{" "}
        </h3>
        <span>
          In support of <a href={Links.guideDogLink}>Gude Dogs for the Blind Association</a>
        </span>
        <address className={styles.charityInfo}>
          Charity Registration No. in England and Wales 209617 and Scotland
          SC038979
        </address>
      </section>

      <section className={styles.credit}>
        <h3 className={styles.creditTitle}>Illustration credits</h3>
        <p>
          &quot;Sarah&quot; and &quot;Lucy&quot; illustrations are a derivative
          work of <a href={Credits.hummans.link}>hummans</a>, by <a href={Credits.hummans.authorLink}>Pablo Stanley</a>{" "}
          used under <a href={Credits.hummans.licenseLink}>CCO</a>
        </p>
        <p>
          &quot;Bruce, the guide dog&quot; illustration is a derivative of{" "}
          <a href={Credits.freepik.link}>Infographic vector</a> created by{" "}
          <a href={Credits.freepik.authorLink}> freepik</a> used under{" "}
          <a href={Credits.freepik.licenseLink}>Freepik license</a>
        </p>
      </section>
    </Region>
  )
}

Footer.propTypes = {}

export default Footer
