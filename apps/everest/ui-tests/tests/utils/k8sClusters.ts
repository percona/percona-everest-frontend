import { APIRequestContext } from '@playwright/test';

export const getK8sClusters = async (request: APIRequestContext) => {
  const kubernetesList = await request.get('/v1/kubernetes');
  const kubernetesListJson = await kubernetesList.json();
  return kubernetesListJson;
};
