import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { DbClusterView } from '../../components/db-cluster-view/DbClusterView';
export const DatabasesPage = () => {
  return (
    <DbClusterView
      customHeader={
        <Button
          size="small"
          startIcon={<AddIcon />}
          component={Link}
          to="/databases/new"
          variant="outlined"
        >
          Create Database
        </Button>
      }
    />
  );
};
