import { Character } from "../classes/character.class";
import LucyBadge from "./../images/lucy-badge.svg";
import LucyMarker from "./../images/lucy-marker.svg";
import React from "react";
import SarahBadge from "./../images/sarah-badge.svg";
import SarahMarker from "./../images/sarah-marker.svg";
// eslint-disable-next-line import/no-webpack-loader-syntax
import palette from "!!sass-variable-loader!./../styles/palette.scss";

const characterList = {
  sarah: new Character(
    "Sarah",
    "Cheltenham",
    palette.accent1,
    <SarahBadge />,
    <SarahMarker />
  ),
  lucy: new Character(
    "Lucy",
    "Clacton-on-Sea",
    palette.accent2,
    <LucyBadge />,
    <LucyMarker />
  )
};

export default { ...characterList };
