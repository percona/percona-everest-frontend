import { useLocation } from 'react-router-dom';
import { DbWizardMode } from './database-form.types';

export const useDatabasePageMode = (): DbWizardMode => {
  const { state } = useLocation();
  return state?.selectedDbCluster ? 'edit' : 'new';
};
