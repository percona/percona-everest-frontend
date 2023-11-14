import { Messages } from 'components/db-cluster-view/dbClusterView.messages';
import { useDeleteDbCluster } from 'hooks/api/db-cluster/useDeleteDbCluster';
import { usePausedDbCluster } from 'hooks/api/db-cluster/usePausedDbCluster';
import { useRestartDbCluster } from 'hooks/api/db-cluster/useRestartDbCluster';
import {
  DB_CLUSTERS_QUERY_KEY,
  ExtraDbCluster,
  useDbClusters,
} from 'hooks/api/db-clusters/useDbClusters';
import { useSelectedKubernetesCluster } from 'hooks/api/kubernetesClusters/useSelectedKubernetesCluster';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { useQueryClient } from 'react-query';

export const useDbActions = () => {
  const [selectedDbCluster, setSelectedDbCluster] = useState<string>('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { combinedDbClusters } = useDbClusters();
  const { mutate: deleteDbCluster } = useDeleteDbCluster();
  const { mutate: suspendDbCluster } = usePausedDbCluster();
  const { mutate: restartDbCluster } = useRestartDbCluster();
  const { id: k8sClusterId } = useSelectedKubernetesCluster();

  const queryClient = useQueryClient();

  const isPaused = (dbClusterName: string) =>
    combinedDbClusters.find(
      (dbCluster) => dbCluster.metadata.name === dbClusterName
    )?.spec.paused;

  const handleDbSuspendOrResumed = (dbClusterName: string) => {
    const shouldBePaused = !isPaused(dbClusterName);
    const dbCluster = combinedDbClusters.find(
      (item) => item.metadata.name === dbClusterName
    );
    if (dbCluster) {
      suspendDbCluster(
        { shouldBePaused, k8sClusterId, dbCluster },
        {
          onSuccess: (updatedObject) => {
            queryClient.setQueryData(
              [DB_CLUSTERS_QUERY_KEY, k8sClusterId],
              (oldData: ExtraDbCluster[] = []) =>
                oldData.map((value) =>
                  value.dbCluster.metadata.name === updatedObject.metadata.name
                    ? {
                        dbCluster: updatedObject,
                        k8sClusterName: value.k8sClusterName,
                      }
                    : value
                )
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
    const dbCluster = combinedDbClusters.find(
      (item) => item.metadata.name === dbClusterName
    );
    if (dbCluster) {
      restartDbCluster(
        { k8sClusterId, dbCluster },
        {
          onSuccess: (updatedObject) => {
            queryClient.setQueryData(
              [DB_CLUSTERS_QUERY_KEY, k8sClusterId],
              (oldData: ExtraDbCluster[] = []) =>
                oldData.map((value) =>
                  value.dbCluster.metadata.name === updatedObject.metadata.name
                    ? {
                        dbCluster: updatedObject,
                        k8sClusterName: value.k8sClusterName,
                      }
                    : value
                )
            );
            enqueueSnackbar(Messages.responseMessages.restart, {
              variant: 'success',
            });
          },
        }
      );
    }
  };

  const handleDeleteDbCluster = (dbClusterName: string) => {
    setSelectedDbCluster(dbClusterName);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = (dbClusterName: string) => {
    deleteDbCluster(
      { k8sClusterId, dbClusterName },
      {
        onSuccess: (_, variables) => {
          queryClient.setQueryData(
            [DB_CLUSTERS_QUERY_KEY, k8sClusterId],
            (oldData?: ExtraDbCluster[]) =>
              (oldData || []).filter(
                (value) =>
                  value.dbCluster.metadata.name !== variables.dbClusterName
              )
          );
          handleCloseDeleteDialog();
        },
      }
    );
  };

  return {
    selectedDbCluster,
    openDeleteDialog,
    handleDbSuspendOrResumed,
    handleDbRestart,
    handleDeleteDbCluster,
    handleConfirmDelete,
    handleCloseDeleteDialog,
    isPaused,
  };
};
