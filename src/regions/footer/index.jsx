import { Credits } from "../../config/config"
import Link from "../../components/link"
import React from "react"
import Region from "../../components/region"
import styles from "./footer.module.scss"

const Footer = () => {
  return (
    <Region role="contentinfo" className={styles.footer} regionType={"footer"}>
      <h2 className={styles.heading}>Credits</h2>
      <section className={styles.credit}>
        <h3 className={styles.creditTitle}>
          Created by Sarah McIntyre &amp; Steve Cumming{" "}
        </h3>
        <span>
          In support of{" "}
          <Link href={Credits.guideDogLink}>
            Guide Dogs for the Blind Association
          </Link>
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
          work of <Link href={Credits.hummans.link}>hummans</Link>, by{" "}
          <Link href={Credits.hummans.authorLink}>Pablo Stanley</Link> used under{" "}
          <Link href={Credits.hummans.licenseLink}>CCO</Link>
        </p>
        <p>
          &quot;Bruce, the guide dog&quot; illustration is a derivative of{" "}
          <Link href={Credits.freepik.link}>Infographic vector</Link> created by{" "}
          <Link href={Credits.freepik.authorLink}> freepik</Link> used under{" "}
          <Link href={Credits.freepik.licenseLink}>Freepik license</Link>
        </p>
      </section>
    </Region>
  )
}

Footer.propTypes = {}

export default Footer
