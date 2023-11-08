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
import { useEffect, useState } from 'react';

import {
  DbToggleCard,
  SelectInput,
  TextInput,
  ToggleButtonGroupInput,
  AutoCompleteInput,
} from '@percona/ui-lib';
import { DbType } from '@percona/types';
import { useFormContext } from 'react-hook-form';
import { useDbEngines } from 'hooks/api/db-engines/useDbEngines';
import { DbEngineToolStatus } from 'shared-types/dbEngines.types';
import { dbEngineToDbType, dbTypeToDbEngine } from '@percona/utils';
import { DbWizardFormFields, StepProps } from '../../database-form.types';
import { Messages } from './first-step.messages';
import { generateShortUID } from './utils';
import { useKubernetesClusterInfo } from 'hooks/api/kubernetesClusters/useKubernetesClusterInfo';
import { useDatabasePageMode } from '../../useDatabasePageMode';
import { DEFAULT_NODES } from './first-steps.constants';
import { NODES_DB_TYPE_MAP } from '../../database-form.constants';

export const FirstStep = ({ loadingDefaultsForEdition }: StepProps) => {
  const { watch, setValue, getFieldState, getValues } = useFormContext();
  const { data: dbEngines = [], isFetching: dbEnginesFetching } =
    useDbEngines();
  const { data: clusterInfo, isFetching: clusterInfoFetching } =
    useKubernetesClusterInfo();

  const mode = useDatabasePageMode();

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
    if (!dbType && mode === 'new' && dbEngines.length > 0) {
      const defaultDbType = dbEngineToDbType(dbEngines[0].type);
      if (defaultDbType) {
        setValue(
          DbWizardFormFields.dbType,
          dbEngineToDbType(dbEngines[0].type)
        );
      }
    }
  }, [dbEngines, mode, setValue, dbType]);

  useEffect(() => {
    const { isTouched: storageClassTouched } = getFieldState(
      DbWizardFormFields.storageClass
    );

    if (
      !storageClassTouched &&
      mode === 'new' &&
      clusterInfo?.storageClassNames &&
      clusterInfo.storageClassNames.length > 0
    ) {
      setValue(
        DbWizardFormFields.storageClass,
        clusterInfo?.storageClassNames[0]
      );
    }
  }, [clusterInfo, mode, setValue]);

  useEffect(() => {
    if (!dbType) {
      return;
    }
    const { isTouched: nameTouched } = getFieldState(DbWizardFormFields.dbName);
    const { isDirty: dbVersionDirty } = getFieldState(
      DbWizardFormFields.dbVersion
    );
    const { isTouched: nodesTouched } = getFieldState(
      DbWizardFormFields.numberOfNodes
    );

    if (!nameTouched && mode === 'new') {
      setValue(DbWizardFormFields.dbName, `${dbType}-${generateShortUID()}`, {
        shouldValidate: true,
      });
    }

    // We need to check if the previously selected number of nodes exists for the current DB type
    // E.g. 2 nodes is only possible for PG
    if (nodesTouched) {
      const numberOfNodes: string = getValues(DbWizardFormFields.numberOfNodes);

      if (!NODES_DB_TYPE_MAP[dbType].find((nodes) => nodes === numberOfNodes)) {
        setValue(DbWizardFormFields.numberOfNodes, DEFAULT_NODES[dbType]);
      }
    } else {
      setValue(DbWizardFormFields.numberOfNodes, DEFAULT_NODES[dbType]);
    }

    const newVersions = dbEngines.find((engine) => engine.type === dbEngine);

    // Safety check
    if (
      dbVersionDirty ||
      !newVersions ||
      !newVersions.availableVersions.engine.length
    ) {
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
  }, [dbType, dbEngines, mode, setValue, getFieldState, dbEngine, dbVersion]);

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
            disabled: mode === 'edit' || loadingDefaultsForEdition,
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
            disabled: mode === 'restoreFromBackup' || mode === 'edit',
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
            disabled: mode === 'edit' || loadingDefaultsForEdition,
          }}
        />
      </FormGroup>
    </>
  );
};
