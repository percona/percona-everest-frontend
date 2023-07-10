import { UseMutationOptions, useMutation } from 'react-query';
import { DbWizardType } from '../../pages/new-database/new-database.types';
import { createDbClusterFn } from '../../api/dbClusterApi';

type CreateDbClusterArgType = { dbPayload: DbWizardType; id: string };

export const useCreateDbCluster = (
  options?: UseMutationOptions<any, unknown, CreateDbClusterArgType, unknown>
) => {
  return useMutation(
    ({ dbPayload, id }: CreateDbClusterArgType) =>
      createDbClusterFn(dbPayload, id),
    { ...options }
  );
};
