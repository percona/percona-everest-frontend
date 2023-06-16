export const Messages = {
  backups: 'Backups',
  captionBackups:
    'Specify how often you want to run backup jobs for your database.',
  enableBackups: 'Enable backups',
  backupsRepeat: 'Repeats every',
  storageLocation: 'Storage location',
  repeatsEvery: 'Repeats every',
  enablePitr: 'Enable PITR',
  pitr: 'Point-in-time Recovery (PITR)',
  captionPitr:
    'Point-in-time recovery provides continuous backups on your database to protect against accidental writes or deletes.',
  pitrCreateHeader: 'Create PITR backup every',
  onMinute: 'on minute',
  minutes: 'minutes',
  on: 'on',
  onDay: 'on day',
  at: 'at',
  am: 'AM',
  pm: 'PM',
  infoText: (value) => `Everest will create a backup of your database every ${value}`,
  getTimeText: {
    hours: 'hours, starting at minute',
    days: 'days, at',
    weeks: 'weeks on',
    months: 'months, on day'
  }
};
