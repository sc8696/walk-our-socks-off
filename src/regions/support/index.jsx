import React, { useState } from "react"

import Button from "../../components/button"
import { Links } from "../../config/config"
import Region from "../../components/region"
import VisibilitySensor from "react-visibility-sensor"
import classnames from "classnames"
import styles from "./support.module.scss"

const Support = () => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <VisibilitySensor
      active={!isVisible}
      onChange={v => setIsVisible(v)}
      minTopValue={200}
      partialVisibility
    >
      <Region
        className={classnames(styles.support, {
          [styles.visible]: isVisible,
        })}
      >
        <header className={styles.heading}>
          <h2
            className={styles.title}
            aria-label={"Support us, only if you can"}
          >
            Support us
          </h2>
          <aside aria-hidden={"true"}>
            <em className={"emph"}>Only if</em> you can
          </aside>
        </header>
        <div className={styles.information}>
          <p>
            We know this is a difficult time for everybody and if you
            can&rsquo;t afford to donate right now, that&rsquo;s okay. We still
            invite you to follow our progress, to cheer us on and to share this
            page if you liked it
          </p>
          <p>
            If you can afford to give a little something we&rsquo;d really
            appreciate it. The COVID-19 pandemic has had a devastating effect on
            charities, like Guide Dogs, that rely on fundraising activities for
            their life-changing work.
          </p>
        </div>
        <footer className={styles.buttonGroup}>
          <Button
            link={Links.donate.link}
            title={Links.donate.title}
            buttonType="primary"
          >
            Donate
          </Button>
          {/* <Button link={Links.cheerUsOnLink}>Cheer us on!</Button> */}
        </footer>
      </Region>
    </VisibilitySensor>
  )
}

Support.propTypes = {}

export default Support
