import React, {useEffect} from 'react';
import { ToggleButtonGroup } from '@mui/material';
import {
  Typography,
  FormGroup,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';
import { DbToggleCard, DbType } from '@percona/ui-lib.db-toggle-card';
import { Controller, useFormContext } from 'react-hook-form';
import { Messages } from './first-step.messages';
import { BasicInformationFields } from './first-step.types';
import { generateShortUID } from "./utils";

export const FirstStep = () => {
  const { control, watch, handleSubmit, setValue } = useFormContext();
  handleSubmit((e) => console.log(e));

  //TODO change to api request's result
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

  useEffect(()=> {
    setValue(BasicInformationFields.dbName, dbType ? `${dbType}-${generateShortUID()}`: undefined);
  },[dbType])

  return (
    <>
      <Typography variant="h5">{Messages.pageTitle}</Typography>
      <Typography variant="subtitle2">{Messages.pageDescription}</Typography>
      <FormGroup sx={{ mt: 2 }}>
        <Typography variant="h6" sx={{ mt: 5 }}>
          {Messages.labels.dbType}
        </Typography>
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
                  event.target.value = value;
                  field.onChange(event);
                }
              }}
            >
              <DbToggleCard value={DbType.Postresql} />
              <DbToggleCard value={DbType.Mongo} />
              <DbToggleCard value={DbType.Mysql} />
            </ToggleButtonGroup>
          )}
        />
        <Typography variant="h6" sx={{ mt: 5 }}>
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
        <Typography variant="h6" sx={{ mt: 5 }}>
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
        <Typography variant="h6" sx={{ mt: 5 }}>
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
        <Typography variant="h6" sx={{ mt: 5 }}>
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
