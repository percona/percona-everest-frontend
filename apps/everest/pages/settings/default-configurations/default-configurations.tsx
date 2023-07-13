import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Typography,
  Stack,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  SubmitHandler,
  useForm,
  FormProvider,
  useWatch,
} from 'react-hook-form';
import { Messages } from './default-configurations.messages';
import {
  DefaultConfigurationsFields,
  defaultConfigurationsSchema,
  DefaultConfigurationsType,
} from './default-configurations.types';
import { TimeSelection } from '../../../components/time-selection/time-selection';
import {
  AmPM,
  TimeValue,
  WeekDays,
} from '../../../components/time-selection/time-selection.types';
import { SourceRanges } from './source-ranges/source-ranges';
import { SwitchOutlinedBox } from '../../../components/switch-outlined-box/switch-oulined-box';

export const DefaultConfigurations = () => {
  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));

  const methods = useForm<DefaultConfigurationsType>({
    mode: 'onChange',
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

  const [backupsEnabled, externalAccess] = useWatch({
    control: methods.control,
    name: [
      DefaultConfigurationsFields.backupsEnabled,
      DefaultConfigurationsFields.externalAccess,
    ],
  });

  const onSubmit: SubmitHandler<DefaultConfigurationsType> = (data) => {
    /* eslint-disable no-console */
    console.log(data);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Stack>
            <Typography
              data-testid="default-configurations-info"
              sx={{ mt: 2, mx: 1 }}
              variant="body1"
            >
              {Messages.pageDescription}
            </Typography>

            <SwitchOutlinedBox
              name={DefaultConfigurationsFields.monitoring}
              control={methods.control}
              labelHeader={Messages.monitoring}
              labelDescription={Messages.monitoringMessage}
            />
            <SwitchOutlinedBox
              name={DefaultConfigurationsFields.backupsEnabled}
              control={methods.control}
              labelHeader={Messages.backups}
              labelDescription={Messages.backupsMessage}
              childrenSx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
                ...(isLaptop && {
                  justifyContent: 'start',
                  pl: '55px',
                  flexWrap: 'wrap',
                }),
              }}
            >
              {backupsEnabled && (
                <>
                  <Typography
                    sx={{ whiteSpace: 'pre' }}
                    variant="sectionHeading"
                  >
                    {Messages.repeatsEvery}
                  </Typography>
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
                </>
              )}
            </SwitchOutlinedBox>
            <SwitchOutlinedBox
              name={DefaultConfigurationsFields.externalAccess}
              control={methods.control}
              labelHeader={Messages.externalAccess}
              labelDescription={Messages.externalAccessMessage}
              childrenSx={{
                flexDirection: 'column',
                display: 'flex',
                gap: 1,
                justifyContent: 'end',
                ...(isLaptop && {
                  justifyContent: 'start',
                  pl: '55px',
                  flexWrap: 'wrap',
                  flex: '1 1 auto',
                }),
              }}
            >
              {externalAccess && <SourceRanges methods={methods} />}
            </SwitchOutlinedBox>
            <Stack direction="row" justifyContent="flex-end" mt={2} gap={1}>
              <Button onClick={() => {}} variant="text">
                {Messages.cancel}
              </Button>
              <Button
                onClick={methods.handleSubmit(onSubmit)}
                variant="contained"
              >
                {Messages.save}
              </Button>
            </Stack>
          </Stack>
        </form>
      </FormProvider>
    </div>
  );
};
