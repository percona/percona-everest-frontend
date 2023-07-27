import { test, expect } from '@playwright/test';
import { GetDbClusterPayload } from '../../types/dbCluster.types';

let kubernetesId;

test.beforeAll(async ({ request }) => {
  const kubernetesList = await request.get('/v1/kubernetes');
  kubernetesId = (await kubernetesList.json())[0].id;
});

test.beforeEach(async ({ page }) => {
  await page.goto('/databases/new');
  await page.getByTestId('toggle-button-group-input-db-type').waitFor();
  await page.getByTestId('select-input-db-version').waitFor();
});

test('Cluster creation', async ({ page, request }) => {
  const clusterName = 'db-cluster-ui-test';

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
