import React, { useState } from "react";

import { App } from "../../config/config";
import Region from "../../components/region";
import VisibilitySensor from "react-visibility-sensor";
import classnames from "classnames";
import styles from "./how.module.scss";

const How = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <VisibilitySensor
      active={!isVisible}
      onChange={v => setIsVisible(v)}
      minTopValue={App.scrollOffset}
      partialVisibility
      scrollThrottle={App.scrollThrottle}
    >
      <Region
        className={classnames(styles.how, {
          [styles.visible]: isVisible
        })}
      >
        <header className={styles.heading}>
          <h2
            className={styles.title}
            aria-label="Racking up miles in lockdown and completing this challenge safely during Coronavirus"
          >
            Racking up miles in lockdown
            <br />
            <aside className={"unemph"} aria-hidden="true">
              and completing this challenge safely during Coronavirus
            </aside>
          </h2>
        </header>
        <div className={styles.information}>
          <p>
            We&rsquo;re using our daily exercise to get out and walk as far as
            we reasonably can. For Lucy, that includes a nice long walk with her
            guide dog, Bruce.
          </p>
          <p>
            For the rest of our miles, we&rsquo;re getting creative at home -
            running around the garden, dancing in the kitchen and pacing while
            doing things like chatting on the phone or boiling the kettle.
          </p>
        </div>
      </Region>
    </VisibilitySensor>
  );
};

How.propTypes = {};

export default How;
