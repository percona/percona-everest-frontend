import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Typography,
  Box,
  Button,
  Switch,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  SubmitHandler,
  useForm,
  Controller,
  FormProvider,
} from 'react-hook-form';
import { Messages } from './default-configurations.messages';
import {
  DefaultConfigurationsFields,
  defaultConfigurationsSchema,
  DefaultConfigurationsType,
} from './default-configurations.types';
import { FormControlLabel } from '../../../components/form-control-label/form-control-label';
import { TimeSelection } from '../../../components/time-selection/time-selection';
import {
  AmPM,
  TimeValue,
  WeekDays,
} from '../../../components/time-selection/time-selection.types';
import { OutlinedFormControlLabelWrapper } from '../../../components/outlined-form-control-label-wrapper/outlined-form-control-label-wrapper';
import { SourceRanges } from './source-ranges/source-ranges';

export const DefaultConfigurations = () => {
  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));

  const methods = useForm<DefaultConfigurationsType>({
    mode: 'all',
    resolver: zodResolver(defaultConfigurationsSchema),
    defaultValues: {
      // TODO get from api =>
      [DefaultConfigurationsFields.monitoring]: false,
      [DefaultConfigurationsFields.backupsEnabled]: false,
      [DefaultConfigurationsFields.externalAccess]: false,
      [DefaultConfigurationsFields.timeNumbers]: '1',
      [DefaultConfigurationsFields.selectTime]: TimeValue.hours,
      [DefaultConfigurationsFields.minute]: 0,
      [DefaultConfigurationsFields.minuteHour]: 0,
      [DefaultConfigurationsFields.hour]: 12,
      [DefaultConfigurationsFields.amPm]: AmPM.AM,
      [DefaultConfigurationsFields.weekDay]: WeekDays.Mo,
      [DefaultConfigurationsFields.onDay]: 1,
      [DefaultConfigurationsFields.sourceRanges]: [
        { sourceRange: '181.170.213.40/32' },
        { sourceRange: '181.170.213.40/31' },
      ],
    },
  });

  const backupsEnabled: boolean = methods.watch(
    DefaultConfigurationsFields.backupsEnabled
  );
  const externalAccess: boolean = methods.watch(
    DefaultConfigurationsFields.externalAccess
  );

  const onSubmit: SubmitHandler<DefaultConfigurationsType> = (data) => {
    /* eslint-disable no-console */
    console.log(data);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              data-testid="default-configurations-info"
              sx={{ my: 2, mx: 1 }}
              variant="body1"
            >
              {Messages.pageDescription}
            </Typography>
            <FormControlLabel
              labelHeader={Messages.monitoring}
              labelMessage={Messages.monitoringMessage}
              outlined
              data-testid="monitoring-control"
              sx={{ mb: 2 }}
              control={
                <Controller
                  control={methods.control}
                  name={DefaultConfigurationsFields.monitoring}
                  render={({ field }) => (
                    <Switch
                      data-testid="monitoring-control-checkbox"
                      {...field}
                      checked={field.value}
                    />
                  )}
                />
              }
            />
            <OutlinedFormControlLabelWrapper
              labelHeader={Messages.backups}
              labelMessage={Messages.backupsMessage}
              boxSx={{ mb: 2 }}
              data-testid="backup-control"
              control={
                <Controller
                  control={methods.control}
                  name={DefaultConfigurationsFields.backupsEnabled}
                  render={({ field }) => (
                    <Switch
                      data-testid="backup-control-checkbox"
                      {...field}
                      checked={field.value}
                    />
                  )}
                />
              }
            >
              {backupsEnabled && (
                <Box
                  sx={{
                    display: 'inline-flex',
                    width: '100%',
                    alignItems: 'center',
                    gap: 2,
                    px: 2,
                    justifyContent: 'end',
                    ...(isLaptop && {
                      justifyContent: 'start',
                      pl: '65px',
                      flexWrap: 'wrap',
                    }),
                  }}
                >
                  <Box>
                    <Typography
                      sx={{ whiteSpace: 'pre' }}
                      variant="sectionHeading"
                    >
                      {Messages.repeatsEvery}
                    </Typography>
                  </Box>
                  <TimeSelection
                    sx={{
                      flexWrap: 'nowrap',
                      ...(isLaptop && { flexWrap: 'wrap' }),
                    }}
                    sxTimeFields={{
                      flexWrap: 'nowrap',
                      ...(isLaptop && { flexWrap: 'wrap' }),
                    }}
                  />
                </Box>
              )}
            </OutlinedFormControlLabelWrapper>
            <OutlinedFormControlLabelWrapper
              labelHeader={Messages.externalAccess}
              labelMessage={Messages.externalAccessMessage}
              boxSx={{ mb: 2 }}
              data-testid="external-access-control"
              control={
                <Controller
                  control={methods.control}
                  name={DefaultConfigurationsFields.externalAccess}
                  render={({ field }) => (
                    <Switch
                      data-testid="external-access-control-checkbox"
                      {...field}
                      checked={field.value}
                    />
                  )}
                />
              }
            >
              {externalAccess && (
                <Box
                  sx={{
                    flexDirection: 'column',
                    display: 'flex',
                    p: 2,
                    gap: 1,
                    justifyContent: 'end',
                    ...(isLaptop && {
                      justifyContent: 'start',
                      pl: '65px',
                      flexWrap: 'wrap',
                      flex: '1 1 auto',
                    }),
                  }}
                  data-testid="source-ranges"
                >
                  <SourceRanges methods={methods} />
                </Box>
              )}
            </OutlinedFormControlLabelWrapper>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: 1,
              }}
            >
              <Button onClick={() => {}} variant="text">
                {Messages.cancel}
              </Button>
              <Button
                onClick={methods.handleSubmit(onSubmit)}
                variant="contained"
              >
                {Messages.save}
              </Button>
            </Box>
          </Box>
        </form>
      </FormProvider>
    </div>
  );
};
