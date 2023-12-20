import {
  BorderColor,
  DeleteOutline,
  PauseCircleOutline,
} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { ConfirmDialog } from 'components/confirm-dialog/confirm-dialog';
import { useDbActions } from 'hooks/api/db-cluster/useDbActions';
import { useDeleteDbCluster } from 'hooks/api/db-cluster/useDeleteDbCluster';
import { RestoreDbModal } from 'modals';
import { Messages } from 'pages/databases/dbClusterView.messages';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Messages as ClusterDetailsMessages } from './db-cluster-details.messages';
import { DbCluster, DbClusterStatus } from 'shared-types/dbCluster.types';

export const DbActionButton = ({ dbCluster }: { dbCluster: DbCluster }) => {
  const { dbClusterName } = useParams();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openRestoreDbModal, setOpenRestoreDbModal] = useState(false);
  const [isNewClusterMode, setIsNewClusterMode] = useState(false);
  const isOpen = !!anchorEl;
  const restoring = dbCluster.status?.status === DbClusterStatus.restoring;
  const {
    openDeleteDialog,
    handleConfirmDelete,
    handleDbRestart,
    handleDbSuspendOrResumed,
    handleDeleteDbCluster,
    handleCloseDeleteDialog,
    isPaused,
  } = useDbActions();
  const { isLoading: deletingCluster } = useDeleteDbCluster();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleConfirmDelete('/databases');
  };

  return (
    <Box>
      <Button
        id="actions-button"
        data-testid="actions-button"
        aria-controls={isOpen ? 'actions-button-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
        onClick={handleClick}
        variant="text"
        size="large"
        endIcon={<ArrowDropDownIcon />}
      >
        {ClusterDetailsMessages.dbActions}
      </Button>
      <Box>
        <Menu
          id="actions-button-menu"
          anchorEl={anchorEl}
          open={isOpen}
          onClose={closeMenu}
        >
          <MenuItem
            disabled={restoring}
            key={0}
            component={Link}
            to="/databases/edit"
            state={{ selectedDbCluster: dbClusterName }}
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              px: 2,
              py: '10px',
            }}
          >
            <BorderColor fontSize="small" /> {Messages.menuItems.edit}
          </MenuItem>
          <MenuItem
            disabled={restoring}
            key={2}
            onClick={() => {
              handleDbRestart(dbCluster);
              closeMenu();
            }}
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              px: 2,
              py: '10px',
            }}
          >
            <RestartAltIcon /> {Messages.menuItems.restart}
          </MenuItem>
          <MenuItem
            data-testid={`${dbClusterName}-create-new-db-from-backup`}
            disabled={restoring}
            key={1}
            onClick={() => {
              setIsNewClusterMode(true);
              setOpenRestoreDbModal(true);
              closeMenu();
            }}
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              px: 2,
              py: '10px',
            }}
          >
            <AddIcon /> {Messages.menuItems.createNewDbFromBackup}
          </MenuItem>
          <MenuItem
            data-testid={`${dbClusterName}-restore`}
            disabled={restoring}
            key={3}
            onClick={() => {
              setIsNewClusterMode(false);
              setOpenRestoreDbModal(true);
              closeMenu();
            }}
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              px: 2,
              py: '10px',
            }}
          >
            <KeyboardReturnIcon /> {Messages.menuItems.restoreFromBackup}
          </MenuItem>
          <MenuItem
            disabled={restoring}
            key={4}
            onClick={() => {
              handleDbSuspendOrResumed(dbCluster);
              closeMenu();
            }}
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              px: 2,
              py: '10px',
            }}
          >
            <PauseCircleOutline />{' '}
            {isPaused(dbCluster)
              ? Messages.menuItems.resume
              : Messages.menuItems.suspend}
          </MenuItem>
          <MenuItem
            data-testid={`${dbClusterName}-delete`}
            key={5}
            onClick={() => {
              handleDeleteDbCluster(dbCluster);
              closeMenu();
            }}
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              px: 2,
              py: '10px',
            }}
          >
            <DeleteOutline /> {Messages.menuItems.delete}
          </MenuItem>
        </Menu>
      </Box>
      {openRestoreDbModal && (
        <RestoreDbModal
          dbCluster={dbCluster}
          isNewClusterMode={isNewClusterMode}
          isOpen={openRestoreDbModal}
          closeModal={() => setOpenRestoreDbModal(false)}
        />
      )}
      {openDeleteDialog && (
        <ConfirmDialog
          isOpen={openDeleteDialog}
          selectedId={dbCluster.metadata.name}
          closeModal={handleCloseDeleteDialog}
          headerMessage={Messages.deleteModal.header}
          handleConfirm={handleDelete}
          disabledButtons={deletingCluster}
        >
          {Messages.deleteModal.content}
        </ConfirmDialog>
      )}
    </Box>
  );
};
