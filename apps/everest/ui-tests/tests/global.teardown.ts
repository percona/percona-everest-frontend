import { test as setup } from '@playwright/test';

setup('Delete backup storage', async ({ request }) => {
  console.log('DELET BACKUP STORAGE');
  await request.delete('/v1/backup-storages/ui-dev')
});