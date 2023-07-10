import React, { useEffect, useState } from 'react';
import {
  FormGroup,
  MenuItem,
  Skeleton,
  Select,
  TextField,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';

import { DbToggleCard, DbType } from '@percona/ui-lib.db-toggle-card';
import { Controller, useFormContext } from 'react-hook-form';
import { Messages } from './first-step.messages';
import { generateShortUID } from './utils';
import { useDbEngines } from '../../../../hooks/db-engines/useDbEngines';
import { dbEngineToDbType } from '../../../../utils/db';
import { DB_VERSIONS } from './first-step.constants';
import { DbWizardFormFields } from '../../new-database.types';

export const FirstStep = () => {
  const { control, watch, setValue } = useFormContext();
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
  const [dbVersions, setDbVersions] = useState(DB_VERSIONS[dbType]);

  useEffect(() => {
    if (!dbType) {
      return;
    }
    const newVersions = DB_VERSIONS[dbType];

    setValue(DbWizardFormFields.dbName, `${dbType}-${generateShortUID()}`);
    setValue(DbWizardFormFields.dbVersion, newVersions[0]);
    setDbVersions(newVersions);
  }, [dbType]);

  return (
    <>
      <Typography variant="h5">{Messages.pageTitle}</Typography>
      <Typography variant="subtitle2">{Messages.pageDescription}</Typography>
      <FormGroup sx={{ mt: 2 }}>
        <Typography variant="sectionHeading" sx={{ mt: 1, mb: 0.5 }}>
          {Messages.labels.dbType}
        </Typography>
        {dbEnginesFetching || !dbEngines.length ? (
          // This is roughly the height of the buttons
          <Skeleton height={57} variant="rectangular" />
        ) : (
          <Controller
            name={DbWizardFormFields.dbType}
            control={control}
            render={({ field }) => (
              <ToggleButtonGroup
                {...field}
                fullWidth
                exclusive
                sx={{ marginTop: 1 }}
                onChange={(
                  event: React.MouseEvent<HTMLElement> | any,
                  value: DbType
                ) => {
                  if (value !== null) {
                    /* eslint-disable no-param-reassign */
                    event.target.value = value;
                    field.onChange(event);
                  }
                }}
              >
                {dbEngines.map(({ type }) => (
                  <DbToggleCard key={type} value={dbEngineToDbType(type)} />
                ))}
              </ToggleButtonGroup>
            )}
          />
        )}
        <Typography variant="sectionHeading" sx={{ mt: 4, mb: 0.5 }}>
          {Messages.labels.dbName}
        </Typography>
        <Controller
          control={control}
          name={DbWizardFormFields.dbName}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              variant="outlined"
              placeholder={Messages.placeholders.dbName}
              error={error !== undefined}
              helperText={error ? error.message : ''}
              inputProps={{
                'data-testid': 'text-dbName',
              }}
            />
          )}
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
        <Typography variant="sectionHeading" sx={{ mt: 4, mb: 0.5 }}>
          {Messages.labels.dbVersion}
        </Typography>
        <Controller
          control={control}
          name={DbWizardFormFields.dbVersion}
          render={({ field, fieldState: { error } }) => (
            <Select
              {...field}
              variant="outlined"
              error={error !== undefined}
              inputProps={{
                'data-testid': 'text-dbVersion',
              }}
            >
              {/* TODO Replace with API call afterwards */}
              {dbVersions.map((version) => (
                <MenuItem value={version} key={version}>
                  {version}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormGroup>
    </>
  );
};
