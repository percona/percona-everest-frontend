import { DbWizardMode } from './database-form.types';
import { useLocation } from 'react-router-dom';

export const useDatabasePageMode = (): DbWizardMode => {
  const { state } = useLocation();
  return state?.selectedDbCluster ? 'edit' : 'new';
};
