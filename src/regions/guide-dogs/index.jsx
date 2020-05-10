import React, { useState } from "react";

import Bruce from "../../components/characters/bruce";
import Link from "../../components/link";
import { Links } from "../../config/config";
import Region from "../../components/region";
import VisibilitySensor from "react-visibility-sensor";
import classnames from "classnames";
import styles from "./guide-dogs.module.scss";

const GuideDogs = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <VisibilitySensor
      active={!isVisible}
      onChange={v => setIsVisible(v)}
      minTopValue={200}
      partialVisibility
    >
      <Region
        className={classnames(styles.guideDogs, {
          [styles.visible]: isVisible
        })}
      >
        <Bruce className={styles.bruce} withLead={false} />
        <header className={styles.heading}>
          <h2
            className={"unemph"}
            aria-label="The life changing work of Guide Dogs"
          >
            <span aria-hidden="true">
              The <em>life-changing</em> work of Guide Dogs
            </span>
          </h2>
        </header>

        <ul className={styles.information}>
          <li>
            Almost two million people in the UK are living with sight loss and
            of those 180,000 rarely leave home alone
          </li>
          <li>
            The current coronavirus situation is particularly difficult for
            those that rely on touch or the support of others to navigate the
            world around them
          </li>
          <li>
            Guide dogs provide a range of life changing services beyond their
            dogs to help those with sight loss enjoy freedom and independence
          </li>
          <li>
            Their services range from providing resources for children &amp;
            young people, teaching independent living skills, to connecting
            people with sighted guides &amp; helping support families coming to
            terms with sight loss
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
  );
};

GuideDogs.propTypes = {};

export default GuideDogs;
