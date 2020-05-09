import Bruce from "../../components/characters/bruce"
import Link from "../../components/link"
import { Links } from "../../config/config"
import React from "react"
import Region from "../../components/region"
import styles from "./guide-dogs.module.scss"

const GuideDogs = () => {
  return (
    <Region className={styles.guideDogs}>
      <Bruce className={styles.bruce} withLead={false} />
      <header>
        <h2 className={"unemph"}>
          The <span className={"emph"}>life-changing</span> work of Guide Dogs
        </h2>
      </header>

      <ul className={styles.information}>
        <li>
          Almost two million people in the UK are living with sight loss and
          180,000 of those rarely leave home alone
        </li>
        <li>
          Their life-changing work provides independence and freedom for people
          who are blind or partially sighted
        </li>
        <li>
          Guide dogs provide life-changing service for thousands of people with
          vision impairment
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
  )
}

GuideDogs.propTypes = {}

export default GuideDogs
