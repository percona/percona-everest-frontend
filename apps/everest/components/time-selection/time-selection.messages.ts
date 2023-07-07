export const Messages = {
  onMinute: 'on minute',
  minutes: 'minutes',
  on: 'on',
  onDay: 'on day',
  at: 'at',
  am: 'AM',
  pm: 'PM',
  infoText: (value) =>
    `Everest will create a backup of your database every ${value}`,
  getTimeText: {
    hours: 'hours, starting at minute',
    days: 'days, at',
    weeks: 'weeks on',
    months: 'months, on day',
  },
};
