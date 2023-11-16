import {
  BorderColor,
  DeleteOutline,
  PauseCircleOutline,
} from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { ConfirmDialog } from 'components/confirm-dialog/confirm-dialog';
import { useDbActions } from 'hooks/api/db-cluster/useDbActions';
import { useDeleteDbCluster } from 'hooks/api/db-cluster/useDeleteDbCluster';
import { Messages } from 'pages/databases/dbClusterView.messages';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Messages as ClusterDetailsMessages } from './db-cluster-details.messages';
export const DbActionButton = () => {
  const { dbClusterName } = useParams();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = !!anchorEl;
  const {
    selectedDbCluster,
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

  const handleDelete = (dbName: string) => {
    handleConfirmDelete(dbName, '/databases');
  };
  return (
    <Box>
      <Button
        id="actions-button"
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
            key={2}
            onClick={() => {
              handleDbRestart(dbClusterName!);
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
            key={3}
            onClick={() => {
              handleDbSuspendOrResumed(dbClusterName!);
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
            {isPaused(dbClusterName!)
              ? Messages.menuItems.resume
              : Messages.menuItems.suspend}
          </MenuItem>
          <MenuItem
            data-testid={`${dbClusterName}-delete`}
            key={1}
            onClick={() => {
              handleDeleteDbCluster(dbClusterName!);
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
      {openDeleteDialog && (
        <ConfirmDialog
          isOpen={openDeleteDialog}
          selectedId={selectedDbCluster}
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