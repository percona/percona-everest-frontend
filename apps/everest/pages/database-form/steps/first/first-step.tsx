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

import { FormGroup, MenuItem, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { DbToggleCard, DbType } from '@percona/ui-lib.db-toggle-card';
import { SelectInput } from '@percona/ui-lib.form.inputs.select';
import { TextInput } from '@percona/ui-lib.form.inputs.text';
import { ToggleButtonGroupInput } from '@percona/ui-lib.form.inputs.toggle-button-group';
import { useFormContext } from 'react-hook-form';
import { AutoCompleteInput } from '@percona/ui-lib.form.inputs.auto-complete';
import { useDbEngines } from '../../../../hooks/api/db-engines/useDbEngines';
import { DbEngineToolStatus } from '../../../../types/dbEngines.types';
import { dbEngineToDbType, dbTypeToDbEngine } from '../../../../utils/db';
import { DbWizardFormFields } from '../../database-form.types';
import { Messages } from './first-step.messages';
import { generateShortUID } from './utils';
import { useKubernetesClusterInfo } from '../../../../hooks/api/kubernetesClusters/useKubernetesClusterInfo';
import { useDatabasePageMode } from '../../useDatabasePageMode';

export const FirstStep = () => {
  const { watch, setValue, getFieldState } = useFormContext();
  const { data: dbEngines = [], isFetching: dbEnginesFetching } =
    useDbEngines();
  const { data: clusterInfo, isFetching: clusterInfoFetching } =
    useKubernetesClusterInfo();
  // const { data: monitoringCreationRes} = useMonitoringCreation();

  const mode = useDatabasePageMode();

  useEffect(() => {
    if (mode === 'new' && clusterInfo?.storageClassNames.length > 0) {
      setValue(
        DbWizardFormFields.storageClass,
        clusterInfo?.storageClassNames[0]
      );
    }
  }, [clusterInfo]);

  // useEffect(() => {
  //   console.log(monitoringCreationRes);
  //   debugger;
  // }, [monitoringCreationRes]);

  // TODO change to api request's result
  // const k8sNamespacesOptions = [
  //   {
  //     value: 'namespaceOne',
  //     label: 'namespaceOneLabel',
  //   },
  //   {
  //     value: 'namespaceTwo',
  //     label: 'namespaceTwoLabel',
  //   },
  // ];
  // const dbEnvironmentOptions = [
  //   {
  //     value: 'dbEnvironmentOne',
  //     label: 'dbEnvironmentOneLabel',
  //   },
  //   {
  //     value: 'dbEnvironmentTwo',
  //     label: 'dbEnvironmentTwoLabel',
  //   },
  // ];

  const dbType: DbType = watch(DbWizardFormFields.dbType);
  const dbVersion: DbType = watch(DbWizardFormFields.dbVersion);
  const dbEngine = dbTypeToDbEngine(dbType);
  const [dbVersions, setDbVersions] = useState(
    dbEngines.find((engine) => engine.type === dbEngine)
  );

  useEffect(() => {
    if (!dbType) {
      return;
    }
    const { isTouched } = getFieldState(DbWizardFormFields.dbName);

    if (!isTouched && mode === 'new') {
      setValue(DbWizardFormFields.dbName, `${dbType}-${generateShortUID()}`, {
        shouldValidate: true,
      });
    }

    const newVersions = dbEngines.find((engine) => engine.type === dbEngine);

    // Safety check
    if (!newVersions || !newVersions.availableVersions.engine.length) {
      return;
    }

    if (
      ((mode === 'edit' || mode === 'restoreFromBackup') && !dbVersion) ||
      mode === 'new'
    ) {
      const recommendedVersion = newVersions.availableVersions.engine.find(
        (version) => version.status === DbEngineToolStatus.RECOMMENDED
      );
      setValue(
        DbWizardFormFields.dbVersion,
        recommendedVersion
          ? recommendedVersion.version
          : newVersions.availableVersions.engine[0].version
      );
    }
    setDbVersions(newVersions);
  }, [dbType, dbEngines, mode]);

  return (
    <>
      <Typography variant="h5">{Messages.pageTitle}</Typography>
      <Typography variant="subtitle2">{Messages.pageDescription}</Typography>
      <FormGroup sx={{ mt: 2 }}>
        {/* @ts-ignore */}
        <Typography variant="sectionHeading" sx={{ mt: 1, mb: 0.5 }}>
          {Messages.labels.dbType}
        </Typography>
        {dbEnginesFetching || !dbEngines.length ? (
          // This is roughly the height of the buttons
          <Skeleton height={57} variant="rectangular" />
        ) : (
          <ToggleButtonGroupInput name={DbWizardFormFields.dbType}>
            {dbEngines.map(({ type }) => (
              <DbToggleCard
                key={type}
                value={dbEngineToDbType(type)}
                disabled={
                  (mode === 'edit' || mode === 'restoreFromBackup') &&
                  dbType !== dbEngineToDbType(type)
                }
              />
            ))}
          </ToggleButtonGroupInput>
        )}
        <TextInput
          name={DbWizardFormFields.dbName}
          label={Messages.labels.dbName}
          textFieldProps={{
            placeholder: Messages.placeholders.dbName,
            disabled: mode === 'edit',
          }}
        />
        {/* <Typography variant="sectionHeading" sx={{ mt: 4, mb: 0.5 }}>
          {Messages.labels.k8sNamespace}
        </Typography>
        <Controller
          control={control}
          name={DbWizardFormFields.k8sNamespace}
          render={({ field, fieldState: { error } }) => (
            <Select
              {...field}
              variant="outlined"
              error={error !== undefined}
              inputProps={{
                'data-testid': 'text-k8sNamespace',
              }}
            >
              {k8sNamespacesOptions.map((item) => (
                <MenuItem value={item.value} key={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <Typography variant="sectionHeading" sx={{ mt: 4, mb: 0.5 }}>
          {Messages.labels.dbEnvironment}
        </Typography>
        <Controller
          control={control}
          name={DbWizardFormFields.dbEnvironment}
          render={({ field, fieldState: { error } }) => (
            <Select
              {...field}
              variant="outlined"
              error={error !== undefined}
              inputProps={{
                'data-testid': 'text-dbEnvironment',
              }}
            >
              {dbEnvironmentOptions.map((item) => (
                <MenuItem value={item.value} key={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          )}
        /> */}
        <SelectInput
          name={DbWizardFormFields.dbVersion}
          label={Messages.labels.dbVersion}
          selectFieldProps={{
            disabled: mode === 'restoreFromBackup',
          }}
        >
          {dbVersions?.availableVersions.engine.map((version) => (
            <MenuItem value={version.version} key={version.version}>
              {version.version}
            </MenuItem>
          ))}
        </SelectInput>
        <AutoCompleteInput
          name={DbWizardFormFields.storageClass}
          label={Messages.labels.storageClass}
          loading={clusterInfoFetching}
          options={clusterInfo?.storageClassNames || []}
          autoCompleteProps={{
            disableClearable: true,
            disabled: mode === 'edit',
          }}
        />
      </FormGroup>
    </>
  );
};
