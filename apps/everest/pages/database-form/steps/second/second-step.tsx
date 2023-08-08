import React, { useEffect } from 'react';
import {
  Alert,
  Box,
  FormGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { ToggleCard } from '@percona/ui-lib.toggle-card';
import { ToggleButtonGroupInput } from '@percona/ui-lib.form.inputs.toggle-button-group';
import { Messages } from './second-step.messages';
import { ResourcesDetail } from '../../../../components/resources-detail';
import { NumberOfNodes, ResourceSize } from './second-step.types';
import {
  checkSwitchToCustom,
  humanizeResourceSizeMap,
} from './second-step.utils';
import { ResourcesLegend } from './resources-legend/resources-legend';
import { DEFAULT_SIZES } from './second-step.const';
import { DbWizardFormFields } from '../../database-form.types';
import { useDatabasePageMode } from '../../useDatabasePageMode';

export const SecondStep = () => {
  const { control, watch, setValue } = useFormContext();
  const mode = useDatabasePageMode();

  // TODO should be set from api https://jira.percona.com/browse/EVEREST-172
  const totalSizes = {
    cpu: 32,
    memory: 40,
    disk: 200,
  };

  const consumedSizes = {
    cpu: 2,
    memory: 12,
    disk: 77,
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const resourceSizePerNode: ResourceSize = watch(
    DbWizardFormFields.resourceSizePerNode
  );
  const cpu = watch(DbWizardFormFields.cpu);
  const memory = watch(DbWizardFormFields.memory);
  const disk = watch(DbWizardFormFields.disk);

  const cpuCapacityExceeded = cpu > totalSizes.cpu;
  const memoryCapacityExceeded = memory > totalSizes.memory;
  const diskCapacityExceeded = disk > totalSizes.disk;

  const alertLabels: string[] = [];

  if (cpuCapacityExceeded) {
    alertLabels.push(Messages.labels.cpu);
  }

  if (memoryCapacityExceeded) {
    alertLabels.push(Messages.labels.memory);
  }

  if (diskCapacityExceeded) {
    alertLabels.push(Messages.labels.disk);
  }

  useEffect(() => {
    if (resourceSizePerNode && resourceSizePerNode !== ResourceSize.custom) {
      setValue(DbWizardFormFields.cpu, DEFAULT_SIZES[resourceSizePerNode].cpu);
      if (mode !== 'edit') {
        setValue(
          DbWizardFormFields.disk,
          DEFAULT_SIZES[resourceSizePerNode].disk
        );
      }
      setValue(
        DbWizardFormFields.memory,
        DEFAULT_SIZES[resourceSizePerNode].memory
      );
    }
  }, [resourceSizePerNode]);

  return (
    <>
      <Typography variant="h5">{Messages.pageTitle}</Typography>
      <Typography variant="subtitle2">{Messages.pageDescription}</Typography>
      <FormGroup sx={{ mt: 2 }}>
        <ToggleButtonGroupInput
          name={DbWizardFormFields.numberOfNodes}
          control={control}
          label={Messages.labels.numberOfNodes}
        >
          <ToggleCard
            value={NumberOfNodes.oneNode}
            data-testid="toggle-button-one-node"
          >
            {Messages.labels.standalone}
          </ToggleCard>
          <ToggleCard
            value={NumberOfNodes.twoNodes}
            data-testid="toggle-button-two-nodes"
            sx={{
              '&.MuiButtonBase-root': {
                wordWrap: 'break-word',
                whiteSpace: 'pre-wrap',
              },
            }}
          >
            {Messages.labels.sourceReplica}
          </ToggleCard>
          <ToggleCard
            value={NumberOfNodes.threeNodes}
            data-testid="toggle-button-three-nodes"
          >
            {Messages.labels.sourceReplicaReplica}
          </ToggleCard>
        </ToggleButtonGroupInput>
        <ToggleButtonGroupInput
          name={DbWizardFormFields.resourceSizePerNode}
          control={control}
          label={Messages.labels.resourceSizePerNode}
        >
          <ToggleCard
            value={ResourceSize.small}
            data-testid="toggle-button-small"
          >
            {humanizeResourceSizeMap(ResourceSize.small)}
          </ToggleCard>
          <ToggleCard
            value={ResourceSize.medium}
            data-testid="toggle-button-medium"
          >
            {humanizeResourceSizeMap(ResourceSize.medium)}
          </ToggleCard>
          <ToggleCard
            value={ResourceSize.large}
            data-testid="toggle-button-large"
          >
            {humanizeResourceSizeMap(ResourceSize.large)}
          </ToggleCard>
          <ToggleCard
            value={ResourceSize.custom}
            data-testid="toggle-button-custom"
          >
            {humanizeResourceSizeMap(ResourceSize.custom)}
          </ToggleCard>
        </ToggleButtonGroupInput>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', mt: 4, gap: 1 }}
          data-testid="resources-box"
        >
          {alertLabels.length > 0 && (
            <Alert
              severity="warning"
              sx={{ mb: 1 }}
              data-testid="resources-exceeding-alert"
            >
              {Messages.alerts.resourcesCapacityExceeding(alertLabels)}
            </Alert>
          )}
          <ResourcesDetail
            value={consumedSizes.cpu}
            total={totalSizes.cpu}
            inputProps={{
              value: cpu,
              setValue: (value: number) => {
                setValue(DbWizardFormFields.cpu, value);
                checkSwitchToCustom(
                  DbWizardFormFields.cpu,
                  value,
                  resourceSizePerNode,
                  setValue
                );
              },
              units: 'CPU',
              dataTestId: 'cpu',
            }}
            label={Messages.labels.cpu}
          />
          <ResourcesDetail
            value={consumedSizes.memory}
            total={totalSizes.memory}
            inputProps={{
              value: memory,
              setValue: (value: number) => {
                setValue(DbWizardFormFields.memory, value);
                checkSwitchToCustom(
                  DbWizardFormFields.memory,
                  value,
                  resourceSizePerNode,
                  setValue
                );
              },
              units: 'GB',
              dataTestId: 'memory',
            }}
            label={Messages.labels.memory.toUpperCase()}
          />
          <ResourcesDetail
            total={totalSizes.disk}
            value={consumedSizes.disk}
            inputProps={{
              value: disk,
              setValue: (value: number) => {
                setValue(DbWizardFormFields.disk, value);
                checkSwitchToCustom(
                  DbWizardFormFields.memory,
                  value,
                  resourceSizePerNode,
                  setValue
                );
              },
              units: 'GB',
              dataTestId: 'disk',
              disabled: mode === 'edit',
            }}
            label={Messages.labels.disk.toUpperCase()}
          />
          {!isMobile && <ResourcesLegend />}
        </Box>
      </FormGroup>
    </>
  );
};
