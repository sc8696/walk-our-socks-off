import uuid from "uuid";

export class Character {
  constructor(name = "", home = "", colour = "", avatar = null) {
    this.id = uuid();
    this.name = name;
    this.home = home;
    this.colour = colour;
    this.avatar = avatar;
    this.totalSteps = 0;
    this.distanceTravelled = 0;
    this.distanceToTravel = 999;
    this.timeline = [];
  }
  setProgress(progress = []) {
    this.timeline = progress.map(({ date, steps, distance, remaining }) => ({
      date: new Date(date),
      steps: parseInt(steps),
      distance: parseFloat(distance),
      remaining: parseFloat(remaining)
    }));

    this.totalSteps = Math.round(
      this.timeline.reduce((acc, reading) => {
        return acc + reading.steps;
      }, 0)
    );

    this.distanceTravelled = Math.round(
      this.timeline.reduce((acc, reading) => {
        return acc + reading.distance;
      }, 0)
    );

    this.distanceToTravel = this.timeline[this.timeline.length - 1].remaining;
  }
}
