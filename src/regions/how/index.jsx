import React from "react"
import Region from "../../components/region"
import styles from "./route.module.scss"

const How = () => {
  return (
    <Region className={styles.how}>
      <header className={styles.heading}>
        <h2 className={styles.title}>
          Racking up miles in lockdown
          <br />
          <aside className={"unemph"}>
            and completing this challenge safely during Coronavirus
          </aside>
        </h2>
      </header>
      <div className={styles.information}>
        <p>
          We&rsquo;re using our daily exercise to get out and walk as far as we
          reasonably can. For Lucy, that&rsquo;s a nice long walk with her guide
          dog Bruce.
        </p>
        <p>
          For the rest of our miles, we&rsquo;re getting creative at home -
          running around the garden, dancing in the kitchen and pacing while
          doing things like chatting on the phone or boiling the kettle.
        </p>
      </div>
    </Region>
  )
}

How.propTypes = {}

export default How
