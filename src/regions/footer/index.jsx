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
          In support of <a href="lol">Gude Dogs for the Blind Association</a>
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
          work of <a href="lol">hummans</a>, by <a href="lol">Pablo Stanley</a>{" "}
          used under <a href="lol">CCO</a>
        </p>
        <p>
          &quot;Bruce, the guide dog&quot; illustration is a derivative of{" "}
          <a href="lol">Infographic vector</a> created by{" "}
          <a href="lol"> freepik</a> used under{" "}
          <a href="lol">Freepik license</a>
        </p>
      </section>
    </Region>
  )
}

Footer.propTypes = {}

export default Footer
