import { useDeleteDbCluster } from 'hooks/api/db-cluster/useDeleteDbCluster';
import { usePausedDbCluster } from 'hooks/api/db-cluster/usePausedDbCluster';
import { useRestartDbCluster } from 'hooks/api/db-cluster/useRestartDbCluster';
import {
  DB_CLUSTERS_QUERY_KEY,
  useDbClusters,
} from 'hooks/api/db-clusters/useDbClusters';
import { enqueueSnackbar } from 'notistack';
import { Messages } from 'pages/databases/dbClusterView.messages';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { DbCluster, GetDbClusterPayload } from 'shared-types/dbCluster.types';

export const useDbActions = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { data: dbClusters = [] } = useDbClusters();
  const { mutate: deleteDbCluster } = useDeleteDbCluster();
  const { mutate: suspendDbCluster } = usePausedDbCluster();
  const { mutate: restartDbCluster } = useRestartDbCluster();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isPaused = (dbClusterName: string) =>
    dbClusters.find((dbCluster) => dbCluster.metadata.name === dbClusterName)
      ?.spec.paused;

  const handleDbSuspendOrResumed = (dbClusterName: string) => {
    const shouldBePaused = !isPaused(dbClusterName);
    const dbCluster = dbClusters.find(
      (item) => item.metadata.name === dbClusterName
    );

    if (dbCluster) {
      suspendDbCluster(
        { shouldBePaused, dbCluster },
        {
          onSuccess: (updatedObject: DbCluster) => {
            queryClient.setQueryData<GetDbClusterPayload | undefined>(
              DB_CLUSTERS_QUERY_KEY,
              (oldData) => {
                if (!oldData) {
                  return undefined;
                }

                return {
                  ...oldData,
                  items: oldData.items.map((value) =>
                    value.metadata.name === updatedObject.metadata.name
                      ? updatedObject
                      : value
                  ),
                };
              }
            );
            enqueueSnackbar(
              shouldBePaused
                ? Messages.responseMessages.pause
                : Messages.responseMessages.resume,
              {
                variant: 'success',
              }
            );
          },
        }
      );
    }
  };

  const handleDbRestart = (dbClusterName: string) => {
    const dbCluster = dbClusters.find(
      (item) => item.metadata.name === dbClusterName
    );

    if (dbCluster) {
      restartDbCluster(
        { dbCluster },
        {
          onSuccess: (updatedObject: DbCluster) => {
            queryClient.setQueryData<GetDbClusterPayload | undefined>(
              DB_CLUSTERS_QUERY_KEY,
              (oldData) => {
                if (!oldData) {
                  return undefined;
                }

                return {
                  ...oldData,
                  items: oldData.items.map((value) =>
                    value.metadata.name === updatedObject.metadata.name
                      ? updatedObject
                      : value
                  ),
                };
              }
            );
            enqueueSnackbar(Messages.responseMessages.restart, {
              variant: 'success',
            });
          },
        }
      );
    }
  };

  const handleDeleteDbCluster = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = (redirect?: string) => {
    setOpenDeleteDialog(false);

    if (redirect) {
      navigate(redirect);
    }
  };

  const handleConfirmDelete = (dbClusterName: string, redirect?: string) => {
    deleteDbCluster(
      { dbClusterName },
      {
        onSuccess: (_, variables) => {
          queryClient.setQueryData<GetDbClusterPayload | undefined>(
            DB_CLUSTERS_QUERY_KEY,
            (oldData) => {
              if (!oldData) {
                return undefined;
              }

              return {
                ...oldData,
                items: oldData.items.filter(
                  (value) => value.metadata.name !== variables.dbClusterName
                ),
              };
            }
          );
          handleCloseDeleteDialog(redirect);
        },
      }
    );
  };

  return {
    openDeleteDialog,
    handleDbSuspendOrResumed,
    handleDbRestart,
    handleDeleteDbCluster,
    handleConfirmDelete,
    handleCloseDeleteDialog,
    isPaused,
  };
};
