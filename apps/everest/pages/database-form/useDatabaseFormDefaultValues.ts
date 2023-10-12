// percona-everest-frontend
// Copyright (C) 2023 Percona LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDbCluster } from '../../hooks/api/db-cluster/useDbCluster';
import { useMonitoringInstancesList } from '../../hooks/api/monitoring/useMonitoringInstancesList';
import {
  // Backup,
  DbCluster,
} from '../../types/dbCluster.types';
import { DB_WIZARD_DEFAULTS } from './database-form.constants';
import {
  DbWizardFormFields,
  DbWizardMode,
  DbWizardType,
} from './database-form.types';
import { DbClusterPayloadToFormValues } from './database-form.utils';

export const useDatabasePageDefaultValues = (
  mode: DbWizardMode
): {
  defaultValues: DbWizardType;
  dbClusterData: DbCluster | undefined;
  dbClusterStatus: 'error' | 'idle' | 'loading' | 'success';
} => {
  const { state } = useLocation();
  const { data, status } = useDbCluster(state?.selectedDbCluster, {
    enabled:
      (mode === 'edit' || mode === 'restoreFromBackup') &&
      !!state?.selectedDbCluster,
  });
  const { data: monitoringInstances } = useMonitoringInstancesList(
    mode === 'edit'
  );

  const [defaultValues, setDefaultValues] = useState<DbWizardType>(
    mode === 'new'
      ? DB_WIZARD_DEFAULTS
      : status === 'success'
      ? DbClusterPayloadToFormValues(data, monitoringInstances, mode)
      : { ...DB_WIZARD_DEFAULTS, [DbWizardFormFields.dbVersion]: '' }
  );

  useEffect(() => {
    if (mode === 'edit' || mode === 'restoreFromBackup') {
      if (status === 'success' && monitoringInstances)
        setDefaultValues(
          DbClusterPayloadToFormValues(data, monitoringInstances, mode)
        );
    } else setDefaultValues(DB_WIZARD_DEFAULTS);
  }, [data, monitoringInstances]);

  return { defaultValues, dbClusterData: data, dbClusterStatus: status };
};
