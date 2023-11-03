export var WeekDays;
(function (WeekDays) {
    // don't change the order of the days, the list is used in getWeekDayByNumber function
    WeekDays["Su"] = "Sunday";
    WeekDays["Mo"] = "Monday";
    WeekDays["Tu"] = "Tuesday";
    WeekDays["We"] = "Wednesday";
    WeekDays["Th"] = "Thursday";
    WeekDays["Fr"] = "Friday";
    WeekDays["Sa"] = "Saturday";
})(WeekDays || (WeekDays = {}));
export const weekDaysPlural = (day) => `${day}s`;
export var AmPM;
(function (AmPM) {
    AmPM["AM"] = "AM";
    AmPM["PM"] = "PM";
})(AmPM || (AmPM = {}));
export var TimeValue;
(function (TimeValue) {
    TimeValue["hours"] = "hour";
    TimeValue["days"] = "day";
    TimeValue["weeks"] = "week";
    TimeValue["months"] = "month";
})(TimeValue || (TimeValue = {}));
export const timeValueHumanized = {
    [TimeValue.hours]: 'Hourly',
    [TimeValue.days]: 'Daily',
    [TimeValue.weeks]: 'Weekly',
    [TimeValue.months]: 'Monthly',
};
//# sourceMappingURL=time-selection.types.js.map