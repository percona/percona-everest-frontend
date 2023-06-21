import React, { useEffect } from 'react';
import {
  ToggleButtonGroup,
  Typography,
  FormGroup,
  TextField,
  Select,
  MenuItem,
  Skeleton,
} from '@mui/material';

import { DbToggleCard, DbType } from '@percona/ui-lib.db-toggle-card';
import { Controller, useFormContext } from 'react-hook-form';
import { Messages } from './first-step.messages';
import { BasicInformationFields } from './first-step.types';
import { generateShortUID } from './utils';
import { useDbEngines } from '../../../../hooks/db-engines/useDbEngines';
import { dbEngineToDbType } from '../../../../utils/db';

export const FirstStep = () => {
  const { control, watch, setValue } = useFormContext();
  const { data: dbEngines, isFetching: dbEnginesFetching } = useDbEngines();

  // TODO change to api request's result
  const k8sNamespacesOptions = [
    {
      value: 'namespaceOne',
      label: 'namespaceOneLabel',
    },
    {
      value: 'namespaceTwo',
      label: 'namespaceTwoLabel',
    },
  ];
  const dbEnvironmentOptions = [
    {
      value: 'dbEnvironmentOne',
      label: 'dbEnvironmentOneLabel',
    },
    {
      value: 'dbEnvironmentTwo',
      label: 'dbEnvironmentTwoLabel',
    },
  ];
  const dbVersionOptions = [
    {
      value: 'dbVersionOne',
      label: 'dbVersionOneLabel',
    },
    {
      value: 'dbVersionTwo',
      label: 'dbVersionTwoLabel',
    },
  ];

  const dbType = watch(BasicInformationFields.dbType);

  useEffect(() => {
    setValue(
      BasicInformationFields.dbName,
      dbType ? `${dbType}-${generateShortUID()}` : undefined
    );
  }, [dbType]);

  return (
    <>
      <Typography variant="h5">{Messages.pageTitle}</Typography>
      <Typography variant="subtitle2">{Messages.pageDescription}</Typography>
      <FormGroup sx={{ mt: 2 }}>
        <Typography variant="sectionHeading" sx={{ mt: 1, mb: 0.5 }}>
          {Messages.labels.dbType}
        </Typography>
        {dbEnginesFetching ? (
          // This is roughly the height of the buttons
          <Skeleton height={57} variant="rectangular" />
        ) : (
          <Controller
            name={BasicInformationFields.dbType}
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
                {dbEngines?.items.map(({ spec: { type } }) => (
                  <DbToggleCard value={dbEngineToDbType(type)} />
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
          name={BasicInformationFields.dbName}
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
        <Typography variant="sectionHeading" sx={{ mt: 4, mb: 0.5 }}>
          {Messages.labels.k8sNamespace}
        </Typography>
        <Controller
          control={control}
          defaultValue={
            k8sNamespacesOptions && k8sNamespacesOptions[0]?.value
              ? k8sNamespacesOptions[0]?.value
              : undefined
          }
          name={BasicInformationFields.k8sNamespace}
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
          name={BasicInformationFields.dbEnvironment}
          defaultValue={
            dbEnvironmentOptions && dbEnvironmentOptions[0]?.value
              ? dbEnvironmentOptions[0]?.value
              : undefined
          }
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
        />
        <Typography variant="sectionHeading" sx={{ mt: 4, mb: 0.5 }}>
          {Messages.labels.dbVersion}
        </Typography>
        <Controller
          control={control}
          name={BasicInformationFields.dbVersion}
          defaultValue={
            dbVersionOptions && dbVersionOptions[0]?.value
              ? dbVersionOptions[0].value
              : undefined
          }
          render={({ field, fieldState: { error } }) => (
            <Select
              {...field}
              variant="outlined"
              error={error !== undefined}
              inputProps={{
                'data-testid': 'text-dbVersion',
              }}
            >
              {dbVersionOptions.map((item) => (
                <MenuItem value={item.value} key={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormGroup>
    </>
  );
};
