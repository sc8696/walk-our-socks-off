export class Character {
  constructor(
    name = "",
    colour = "",
    avatar = null,
    steps = 0,
    distanceTravelled = 0,
    distanceToTravel = 0
  ) {
    this.name = name
    this.colour = colour
    this.avatar = avatar
    this.steps = steps
    this.distanceTravelled = distanceTravelled
    this.distanceToTravel = distanceToTravel
  }
}
