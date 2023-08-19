import { APIRequestContext } from '@playwright/test';
export const getEnginesList = async (
  request: APIRequestContext,
  kubernetesId: string
) => {
  const enginesList = await request.get(
    `/v1/kubernetes/${kubernetesId}/database-engines`
  );
  const engines = (await enginesList.json()).items;
  return engines;
};
export const getEnginesVersions = async (
  request: APIRequestContext,
  kubernetesId: string
) => {
  const engineVersions = {
    pxc: [],
    psmdb: [],
    postgresql: [],
  };

  const engines = await getEnginesList(request, kubernetesId);
  engines.forEach((engine) => {
    const { type } = engine.spec;

    if (engine.status.status === 'installed') {
      engineVersions[type].push(
        ...Object.keys(engine.status.availableVersions.engine)
      );
    }
  });

  return engineVersions;
};
