import React, { useState } from "react"

import Bruce from "../../components/characters/bruce"
import Link from "../../components/link"
import { Links } from "../../config/config"
import Region from "../../components/region"
import VisibilitySensor from "react-visibility-sensor"
import classnames from "classnames"
import styles from "./guide-dogs.module.scss"

const GuideDogs = () => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <VisibilitySensor
      active={!isVisible}
      onChange={v => setIsVisible(v)}
      minTopValue={200}
      partialVisibility
    >
      <Region
        className={classnames(styles.guideDogs, {
          [styles.visible]: isVisible,
        })}
      >
        <Bruce className={styles.bruce} withLead={false} />
        <header className={styles.heading}>
          <h2
            className={"unemph"}
            aria-label="The life changing work of Guide Dogs"
          >
            <span aria-hidden="true">
              The <em>life-changing</em> work of Guide
              Dogs
            </span>
          </h2>
        </header>

        <ul className={styles.information}>
          <li>
            Almost two million people in the UK are living with sight loss and
            180,000 of those rarely leave home alone
          </li>
          <li>
            Their life-changing work provides independence and freedom for
            people who are blind or partially sighted
          </li>
          <li>
            Guide dogs provide life-changing service for thousands of people
            with vision impairment
          </li>
          <li>
            These services range from providing guide dogs, to teaching
            independent living skills, and support in coming to terms with sight
            loss
          </li>
        </ul>

        <Link
          className={styles.link}
          href={Links.guideDogServices.link}
          title={Links.guideDogServices.title}
        >
          More about the life-changing services provided by guide dogs
        </Link>
      </Region>
    </VisibilitySensor>
  )
}

GuideDogs.propTypes = {}

export default GuideDogs
