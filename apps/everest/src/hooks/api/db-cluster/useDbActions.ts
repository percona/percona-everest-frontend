import { useDeleteDbCluster } from 'hooks/api/db-cluster/useDeleteDbCluster';
import { usePausedDbCluster } from 'hooks/api/db-cluster/usePausedDbCluster';
import { useRestartDbCluster } from 'hooks/api/db-cluster/useRestartDbCluster';
import { DB_CLUSTERS_QUERY_KEY } from 'hooks/api/db-clusters/useDbClusters';
import { enqueueSnackbar } from 'notistack';
import { Messages } from 'pages/databases/dbClusterView.messages';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { DbCluster, GetDbClusterPayload } from 'shared-types/dbCluster.types';

export const useDbActions = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openRestoreDialog, setOpenRestoreDialog] = useState(false);
  const [selectedDbCluster, setSelectedDbCluster] = useState<DbCluster>();
  const [selectedDbClusterNamespace, setSelectedDbClusterNamespace] =
    useState('');
  const { mutate: deleteDbCluster } = useDeleteDbCluster();
  const { mutate: suspendDbCluster } = usePausedDbCluster();
  const { mutate: restartDbCluster } = useRestartDbCluster();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isPaused = (dbCluster: DbCluster) => dbCluster.spec.paused;

  const handleDbSuspendOrResumed = (
    dbCluster: DbCluster,
    namespace: string
  ) => {
    setSelectedDbCluster(dbCluster);
    setSelectedDbClusterNamespace(namespace);
    const shouldBePaused = !isPaused(dbCluster);

    suspendDbCluster(
      { shouldBePaused, dbCluster, namespace },
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
  };

  const handleDbRestart = (dbCluster: DbCluster, namespace: string) => {
    setSelectedDbCluster(dbCluster);
    setSelectedDbClusterNamespace(namespace);
    restartDbCluster(
      { dbCluster, namespace },
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
  };

  const handleDeleteDbCluster = (dbCluster: DbCluster, namespace: string) => {
    setSelectedDbCluster(dbCluster);
    setSelectedDbClusterNamespace(namespace);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = (redirect?: string) => {
    setOpenDeleteDialog(false);

    if (redirect) {
      navigate(redirect);
    }
  };

  const handleConfirmDelete = (redirect?: string) => {
    deleteDbCluster(
      {
        dbClusterName: selectedDbCluster!.metadata.name,
        namespace: selectedDbClusterNamespace,
      },
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

  const handleRestoreDbCluster = (dbCluster: DbCluster, namespace: string) => {
    setSelectedDbCluster(dbCluster);
    setSelectedDbClusterNamespace(namespace);
    setOpenRestoreDialog(true);
  };

  const handleCloseRestoreDialog = () => {
    setOpenRestoreDialog(false);
  };

  return {
    openDeleteDialog,
    openRestoreDialog,
    handleDbSuspendOrResumed,
    handleDbRestart,
    handleDeleteDbCluster,
    handleConfirmDelete,
    handleCloseDeleteDialog,
    isPaused,
    handleRestoreDbCluster,
    handleCloseRestoreDialog,
    selectedDbCluster,
    selectedDbClusterNamespace,
  };
};
