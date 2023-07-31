import { test, expect } from '@playwright/test';
import { GetDbClusterPayload } from '../../types/dbCluster.types';

let kubernetesId;
const engineVersions = {
  pxc: [],
  psmdb: [],
  postgresql: [],
};

test.beforeAll(async ({ request }) => {
  const kubernetesList = await request.get('/v1/kubernetes');
  kubernetesId = (await kubernetesList.json())[0].id;

  const enginesList = await request.get(`/v1/kubernetes/${kubernetesId}/database-engines`);
  const engines = (await enginesList.json()).items;

  engines.forEach((engine) => {
    const type: string = engine.spec.type;
  
    if (engine.status.status === 'installed') {
      engineVersions[type].push(...Object.keys(engine.status.availableVersions.engine)); 
    }
  });
});

test.beforeEach(async ({ page }) => {
  await page.goto('/databases/new');
  await page.getByTestId('toggle-button-group-input-db-type').waitFor();
  await page.getByTestId('select-input-db-version').waitFor();
});

test('Cluster creation', async ({ page, request }) => {
  const clusterName = 'db-cluster-ui-test';

  const dbEnginesButtons = page.getByTestId('toggle-button-group-input-db-type').getByRole('button');

  if (engineVersions.pxc.length) {
    await expect(dbEnginesButtons.filter({ hasText: 'MySQL' })).toBeVisible();
  }

  if (engineVersions.psmdb.length) {
    await expect(dbEnginesButtons.filter({ hasText: 'MongoDB' })).toBeVisible();
  }

  if (engineVersions.postgresql.length) {
    await expect(dbEnginesButtons.filter({ hasText: 'PostgreSQL' })).toBeVisible();
  }

  for (let i = 0; i < await dbEnginesButtons.count(); i++) {
    await dbEnginesButtons.nth(i).click();
    const buttonText = await dbEnginesButtons.nth(i).textContent();
    
    await page.getByTestId('select-db-version-button').click();
    const options = page.getByRole('option');

    switch (buttonText) {
      case 'MongoDB':
        engineVersions.psmdb.forEach((version) => expect(options.filter({ hasText: new RegExp(`^${version}$`) })).toBeVisible());
        break;
      case 'MySQL':
        engineVersions.pxc.forEach((version) => expect(options.filter({ hasText: new RegExp(`^${version}$`) })).toBeVisible());
        break;
      case 'PostgreSQL':
        engineVersions.postgresql.forEach((version) => expect(options.filter({ hasText: new RegExp(`^${version}$`) })).toBeVisible());
        break;
    }

    await page.getByRole('option').first().click();
  }

  await page.getByTestId('mongodb-toggle-button').click();
  await page.getByTestId('text-input-db-name').fill(clusterName);
  await page.getByTestId('db-wizard-continue-button').click();

  await expect(
    page.getByRole('heading', {
      name: 'Configure the resources your new database will have access to.',
    })
  ).toBeVisible();
  await page.getByTestId('toggle-button-two-nodes').click();
  await page.getByTestId('toggle-button-large').click();
  await page.getByTestId('disk-input').fill('150');
  await page.getByTestId('db-wizard-continue-button').click();

  await expect(
    page.getByRole('heading', { name: 'External Access' })
  ).toBeVisible();
  await page.getByLabel('Enable External Access').check();
  expect(
    await page.getByLabel('Enable External Access').isChecked()
  ).toBeTruthy();
  await page.getByTestId('text-input-source-range').fill('192.168.1.1');
  await page.getByTestId('db-wizard-submit-button').click();

  await expect(page.getByTestId('db-wizard-goto-db-clusters')).toBeVisible();

  const response = await request.get(
    `/v1/kubernetes/${kubernetesId}/database-clusters`
  );

  expect(response.ok()).toBeTruthy();
  // TODO replace with correct payload typings from GET DB Clusters
  const { items: clusters }: GetDbClusterPayload = await response.json();

  const addedCluster = clusters.find(
    (cluster) => cluster.metadata.name === clusterName
  );

  const deleteResponse = await request.delete(
    `/v1/kubernetes/${kubernetesId}/database-clusters/${addedCluster?.metadata.name}`
  );
  expect(deleteResponse.ok()).toBeTruthy();

  expect(addedCluster).not.toBeUndefined();
  expect(addedCluster?.spec.engine.type).toBe('psmdb');
  expect(addedCluster?.spec.engine.replicas).toBe(2);
  expect(addedCluster?.spec.engine.resources?.cpu.toString()).toBe('8');
  expect(addedCluster?.spec.engine.resources?.memory.toString()).toBe('32');
  expect(addedCluster?.spec.engine.storage.size.toString()).toBe('150');
  expect(addedCluster?.spec.proxy.expose.type).toBe('external');
  expect(addedCluster?.spec.proxy.replicas).toBe(2);
  expect(addedCluster?.spec.proxy.expose.ipSourceRanges).toEqual([
    '192.168.1.1',
  ]);
});
