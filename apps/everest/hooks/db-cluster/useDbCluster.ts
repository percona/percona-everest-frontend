import { UseMutationOptions, useMutation } from "react-query"
import { DbWizardType } from "../../pages/new-database/new-database.types";
import { createDbClusterFn } from "../../api/dbClusterApi";

type createDbClusterArgType = { dbPayload: DbWizardType, id: string };

export const useCreateDbCluster = (options?: UseMutationOptions<any, unknown, createDbClusterArgType, unknown>) => {
  return useMutation(({ dbPayload, id }: createDbClusterArgType) => createDbClusterFn(dbPayload, id), { ...options })
}