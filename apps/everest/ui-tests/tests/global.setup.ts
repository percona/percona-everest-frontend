import { test as setup } from '@playwright/test';

setup('Backup storage', async ({ request }) => {
  // TODO console.log('CREATE BACKUP STORAGE');
  await request.post('/v1/backup-storages/', {
    data: {
      name: 'ui-dev',
      description: 'CI test bucket',
      type: 's3',
      bucketName: 'backup-test',
      secretKey: 'mySecretKey',
      accessKey: 'myAccessKey',
      url: 'https://s3.us-west-2.amazonaws.com',
      region: 'us-west-2',
    },
  });
});
