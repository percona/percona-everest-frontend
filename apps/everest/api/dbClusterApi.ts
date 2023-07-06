import { api } from './api';
import { DbWizardType } from '../pages/new-database/new-database.types';

export const createDbClusterFn = async (
  formData: DbWizardType,
  clusterId: string
) => {
  const response = await api.post(
    `kubernetes/${clusterId}/database-clusters`,
    formData
  );

  return response.data;
};
