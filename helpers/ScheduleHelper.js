const moment = require('moment');
const ArrayUtils = require('../helpers/ArrayTools');
// import moment from "moment";
const {shuffle} = require("../helpers/ArrayTools");

const holidays = ["2020-03-21", "2020-06-04"];
const TWENTY_MINS = 1200000;
const ONE_HOUR = 1200000;

const {workouts} = require('../helpers/Workouts');

const isValidWorkTime = (lastWorkoutTimestamp) => {
  // checks if holiday or weekend of after work hours
  // Also checks if enough time has passed since last workout
  const day = moment().format("YYYY-MM-DD");
  const dayOfWeek = moment().format("d");
  const isHoliday = holidays.filter(holiday => holiday === day);

  const startOfDay = moment("9:00:00", "hh:mm:ss");
  const startOfLunch = moment("12:00:00", "hh:mm:ss");
  const endOfLunch = moment("12:50:00", "hh:mm:ss");
  const endOfDay = moment("17:00:00", "hh:mm:ss");
  const isWorkHours =
    moment().isBetween(startOfDay, startOfLunch) ||
    moment().isBetween(endOfLunch, endOfDay);
  // const isEnoughTimeSinceLastWorkout = moment().isAfter(lastWorkoutTimestamp.add(ONE_HOUR, "hour"));
  const isEnoughTimeSinceLastWorkout = moment().isAfter(moment(lastWorkoutTimestamp).add(1, "minute"));
  // const isEnoughTimeSinceLastWorkout = true;

  return isEnoughTimeSinceLastWorkout && !(isHoliday.length > 0 || dayOfWeek.includes([0, 6])) && isWorkHours;
};

const getNextWorkout = (currentWorkout) => {
  if (currentWorkout === null) {
    return workouts[0];
  }

  const currWorkoutIndex = workouts.indexOf(currentWorkout);
  const nextIndex = (currWorkoutIndex + 1) % workouts.length;
  return workouts[nextIndex];
}

module.exports = {
  isValidWorkTime,
  getNextWorkout,
}