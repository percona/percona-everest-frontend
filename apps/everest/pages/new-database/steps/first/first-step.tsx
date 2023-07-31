import React, { useEffect, useState } from 'react';
import { FormGroup, MenuItem, Skeleton, Typography } from '@mui/material';

import { DbToggleCard, DbType } from '@percona/ui-lib.db-toggle-card';
import { SelectInput } from '@percona/ui-lib.form.inputs.select';
import { TextInput } from '@percona/ui-lib.form.inputs.text';
import { ToggleButtonGroupInput } from '@percona/ui-lib.form.inputs.toggle-button-group';
import { useFormContext } from 'react-hook-form';
import { useDbEngines } from '../../../../hooks/api/db-engines/useDbEngines';
import { DbEngineToolStatus } from '../../../../types/dbEngines.types';
import { dbEngineToDbType, dbTypeToDbEngine } from '../../../../utils/db';
import { DbWizardFormFields } from '../../new-database.types';
import { Messages } from './first-step.messages';
import { generateShortUID } from './utils';

export const FirstStep = () => {
  const { control, watch, setValue, getValues, getFieldState } =
    useFormContext();
  const { data: dbEngines = [], isFetching: dbEnginesFetching } =
    useDbEngines();

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
  const dbEngine = dbTypeToDbEngine(dbType);
  const [dbVersions, setDbVersions] = useState(
    dbEngines.find((engine) => engine.type === dbEngine)
  );

  useEffect(() => {
    if (!dbType) {
      return;
    }
    const dbName = getValues(DbWizardFormFields.dbName);
    const { isTouched } = getFieldState(DbWizardFormFields.dbName);

    if (!isTouched || !dbName) {
      setValue(DbWizardFormFields.dbName, `${dbType}-${generateShortUID()}`, {
        shouldValidate: true,
      });
    }

    const newVersions = dbEngines.find((engine) => engine.type === dbEngine);

    // Safety check
    if (!newVersions || !newVersions.availableVersions.engine.length) {
      return;
    }

    const recommendedVersion = newVersions.availableVersions.engine.find(
      (version) => version.status === DbEngineToolStatus.RECOMMENDED
    );

    setValue(
      DbWizardFormFields.dbVersion,
      recommendedVersion
        ? recommendedVersion.version
        : newVersions.availableVersions.engine[0].version
    );
    setDbVersions(newVersions);
  }, [dbType, dbEngines]);

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
          <ToggleButtonGroupInput
            name={DbWizardFormFields.dbType}
            control={control}
          >
            {dbEngines.map(({ type }) => (
              <DbToggleCard key={type} value={dbEngineToDbType(type)} />
            ))}
          </ToggleButtonGroupInput>
        )}
        <TextInput
          control={control}
          name={DbWizardFormFields.dbName}
          label={Messages.labels.dbName}
          textFieldProps={{
            placeholder: Messages.placeholders.dbName,
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
          control={control}
          name={DbWizardFormFields.dbVersion}
          label={Messages.labels.dbVersion}
        >
          {dbVersions?.availableVersions.engine.map((version) => (
            <MenuItem value={version.version} key={version.version}>
              {version.version}
            </MenuItem>
          ))}
        </SelectInput>
      </FormGroup>
    </>
  );
};
