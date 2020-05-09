import Button from "../../components/button"
import React from "react"
import Region from "../../components/region"
import styles from "./support.module.scss"

const Support = () => {
  return (
    <Region className={styles.support}>
      <header className={styles.heading}>
        <h2 className={styles.title}>Support us</h2>
        <aside>
          <em className={"emph"}>Only if</em> you can
        </aside>
      </header>
      <p>
        We know this is a difficult time for everybody and if you can&rsquo;t
        afford to donate right now, that&rsquo;s okay. We still invite you to
        follow our progress, to cheer us on and to share this page if you liked
        it
      </p>
      <p>
        If you can afford to give a little something we&rsquo;d really
        appreciate it. The COVID-19 pandemic has had a devastating effect on
        charities, like Guide Dogs, that rely on fundraising activities for
        their life-changing work.
      </p>
      <footer className={styles.buttonGroup}>
        <Button link="lol" buttonType="primary">Donate</Button>
        <Button link="lol">Cheer us on!</Button>
      </footer>
    </Region>
  )
}

Support.propTypes = {}

export default Support
