import React from "react";

import palette from "!!sass-variable-loader!./../styles/palette.scss";

import { Character } from "../classes/character.class";
import LucyBadge from "./../images/lucy-badge.svg";
import LucyMarker from "./../images/lucy-marker.svg";
import SarahBadge from "./../images/sarah-badge.svg";
import SarahMarker from "./../images/sarah-marker.svg";

const characterList = new Map();
characterList.set(
  "sarah",
  new Character(
    "Sarah",
    "Cheltenham",
    palette.accent1,
    <SarahBadge />,
    <SarahMarker />
  )
);
characterList.set(
  "lucy",
  new Character(
    "Lucy",
    "Clacton-on-Sea",
    palette.accent2,
    <LucyBadge />,
    <LucyMarker />
  )
);

export default characterList;
