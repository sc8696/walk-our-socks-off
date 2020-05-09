import { Character } from "../classes/character.class"
// eslint-disable-next-line import/no-webpack-loader-syntax
import palette from "!!sass-variable-loader!./../styles/palette.scss"
export default [
  new Character("Sarah", palette.accent1),
  new Character("Lucy", palette.accent2)
]
