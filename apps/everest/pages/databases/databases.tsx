import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { DbClusterView } from '../../components/db-cluster-view/DbClusterView';
import { Messages } from './databases.messages';
export const DatabasesPage = () => {
  return (
    <DbClusterView
      customHeader={
        <Button
          size="small"
          startIcon={<AddIcon />}
          component={Link}
          to="/databases/new"
          variant="contained"
        >
          {Messages.createDatabase}
        </Button>
      }
    />
  );
};
