import { Box, FormGroup, Typography } from '@mui/material';
import { DbType } from '@percona/ui-lib.db-toggle-card';
import { ToggleButtonGroupInput } from '@percona/ui-lib.form.inputs.toggle-button-group';
import { ToggleCard } from '@percona/ui-lib.toggle-card';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useKubernetesClusterResourcesInfo } from '../../../../hooks/api/kubernetesClusters/useKubernetesClusterResourcesInfo';
import { useActiveBreakpoint } from '../../../../hooks/utils/useActiveBreakpoint';
import { DbWizardFormFields } from '../../database-form.types';
import { useDatabasePageMode } from '../../useDatabasePageMode';
import { ResourceInput } from './resource-input/resource-input';
import { DEFAULT_SIZES, NODES_DB_TYPE_MAP } from './second-step.const';
import { Messages } from './second-step.messages';
import { ResourceSize } from './second-step.types';
import { humanizeResourceSizeMap } from './second-step.utils';

export const SecondStep = () => {
  const { watch, setValue, setError, clearErrors } = useFormContext();
  const mode = useDatabasePageMode();
  const { data: resourcesInfo, isFetching: resourcesInfoLoading } =
    useKubernetesClusterResourcesInfo();

  const { isMobile } = useActiveBreakpoint();
  const checkResourceText = (
    value: string | number | undefined,
    units: string,
    fieldLabel: string,
    exceedFlag: boolean
  ) => {
    if (value) {
      const parsedNumber = Number(value);

      if (Number.isNaN(parsedNumber)) {
        return '';
      }

      const processedValue =
        fieldLabel === Messages.labels.cpu
          ? parsedNumber / 1000
          : parsedNumber / 10 ** 9;

      if (exceedFlag) {
        return Messages.alerts.resourcesCapacityExceeding(
          fieldLabel,
          processedValue,
          units
        );
      }
      return Messages.labels.estimated(processedValue, units);
    }
    return '';
  };

  const resourceSizePerNode: ResourceSize = watch(
    DbWizardFormFields.resourceSizePerNode
  );
  const cpu: number = watch(DbWizardFormFields.cpu);
  const memory: number = watch(DbWizardFormFields.memory);
  const disk: number = watch(DbWizardFormFields.disk);
  const dbType: DbType = watch(DbWizardFormFields.dbType);

  const cpuCapacityExceeded = resourcesInfo
    ? cpu * 1000 > resourcesInfo?.available.cpuMillis
    : !resourcesInfoLoading;
  const memoryCapacityExceeded = resourcesInfo
    ? memory * 1000 ** 3 > resourcesInfo?.available.memoryBytes
    : !resourcesInfoLoading;
  const diskCapacityExceeded = resourcesInfo?.available?.diskSize
    ? disk * 1000 ** 3 > resourcesInfo?.available.diskSize
    : false;

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

  useEffect(() => {
    if (diskCapacityExceeded) {
      setError(DbWizardFormFields.disk, { type: 'custom' });
    } else clearErrors(DbWizardFormFields.disk);
  }, [diskCapacityExceeded]);

  useEffect(() => {
    if (
      resourceSizePerNode !== ResourceSize.custom &&
      cpu !== DEFAULT_SIZES[resourceSizePerNode].cpu
    ) {
      setValue(DbWizardFormFields.resourceSizePerNode, ResourceSize.custom);
    }
  }, [cpu, resourceSizePerNode]);

  useEffect(() => {
    if (
      resourceSizePerNode !== ResourceSize.custom &&
      disk !== DEFAULT_SIZES[resourceSizePerNode].disk
    ) {
      setValue(DbWizardFormFields.resourceSizePerNode, ResourceSize.custom);
    }
  }, [disk, resourceSizePerNode]);

  useEffect(() => {
    if (
      resourceSizePerNode !== ResourceSize.custom &&
      memory !== DEFAULT_SIZES[resourceSizePerNode].memory
    ) {
      setValue(DbWizardFormFields.resourceSizePerNode, ResourceSize.custom);
    }
  }, [memory, resourceSizePerNode]);

  return (
    <>
      <Typography variant="h5">{Messages.pageTitle}</Typography>
      <Typography variant="subtitle2">{Messages.pageDescription}</Typography>
      <FormGroup sx={{ mt: 2 }}>
        <ToggleButtonGroupInput
          name={DbWizardFormFields.numberOfNodes}
          label={Messages.labels.numberOfNodes}
        >
          {NODES_DB_TYPE_MAP[dbType].map((value) => (
            <ToggleCard
              value={value}
              data-testid={`toggle-button-nodes-${value}`}
              key={value}
            >
              {`${value} node${+value > 1 ? 's' : ''}`}
            </ToggleCard>
          ))}
        </ToggleButtonGroupInput>
        <ToggleButtonGroupInput
          name={DbWizardFormFields.resourceSizePerNode}
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
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            marginTop: 4,
            gap: isMobile ? 3 : 2,
            '& > *': {
              width: isMobile ? '100%' : '33%',
            },
          }}
        >
          <ResourceInput
            name={DbWizardFormFields.cpu}
            label={Messages.labels.cpu.toUpperCase()}
            helperText={checkResourceText(
              resourcesInfo?.available?.cpuMillis,
              'CPU',
              Messages.labels.cpu,
              cpuCapacityExceeded
            )}
            endSuffix="CPU"
          />
          <ResourceInput
            name={DbWizardFormFields.memory}
            label={Messages.labels.memory.toUpperCase()}
            helperText={checkResourceText(
              resourcesInfo?.available?.memoryBytes,
              'GB',
              Messages.labels.memory,
              memoryCapacityExceeded
            )}
            endSuffix="GB"
          />
          <ResourceInput
            name={DbWizardFormFields.disk}
            label={Messages.labels.disk.toUpperCase()}
            helperText={checkResourceText(
              resourcesInfo?.available?.diskSize,
              'GB',
              Messages.labels.disk,
              diskCapacityExceeded
            )}
            endSuffix="GB"
          />
        </Box>
      </FormGroup>
    </>
  );
};
