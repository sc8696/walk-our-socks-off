import { Credits } from "../../config/config";
import Link from "../../components/link";
import React from "react";
import Region from "../../components/region";
import styles from "./footer.module.scss";

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
        <h3 className={styles.creditTitle}>Credits</h3>
        <p>
          &quot;Sarah&quot; and &quot;Lucy&quot; illustrations are a derivative
          work of <Link href={Credits.hummans.link}>humaaans</Link>, by{" "}
          <Link href={Credits.hummans.authorLink}>Pablo Stanley</Link> under{" "}
          <Link href={Credits.hummans.licenseLink}>CC BY 4.0</Link>
        </p>
        <p>
          &quot;Bruce, the guide dog&quot; illustration is a derivative of{" "}
          <Link href={Credits.freepik.link}>Infographic vector</Link> created by{" "}
          <Link href={Credits.freepik.authorLink}> freepik</Link> under{" "}
          <Link href={Credits.freepik.licenseLink}>Freepik license</Link>
        </p>
        <p>
          Map tiles by <Link href={Credits.maps.authorLink}>Stamen Design</Link>{" "}
          under <Link href={Credits.maps.licenseLink}>CC BY 3.0</Link>. Data by{" "}
          <Link href={Credits.maps.dataLink}>OpenStreetMap</Link> under{" "}
          <Link href={Credits.maps.dataLicenseLink}>ODbL</Link>
        </p>
      </section>
    </Region>
  );
};

Footer.propTypes = {};

export default Footer;
