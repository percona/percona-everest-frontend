import {
  Box,
  Stack,
  FormGroup,
  Typography,
  useMediaQuery,
  FormHelperText,
  useTheme,
} from '@mui/material';
import { ToggleButtonGroupInput } from '@percona/ui-lib.form.inputs.toggle-button-group';
import { ToggleCard } from '@percona/ui-lib.toggle-card';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@percona/ui-lib.input';
import { DEFAULT_SIZES } from './second-step.const';
import { Messages } from './second-step.messages';
import { NumberOfNodes, ResourceSize } from './second-step.types';
import {
  checkSwitchToCustom,
  humanizeResourceSizeMap,
} from './second-step.utils';
import { DbWizardFormFields } from '../../database-form.types';
import { useDatabasePageMode } from '../../useDatabasePageMode';
import { useKubernetesClusterResourcesInfo } from '../../../../hooks/api/kubernetesClusters/useKubernetesClusterResourcesInfo';

export const SecondStep = () => {
  const { watch, setValue, setError, clearErrors } = useFormContext();
  const mode = useDatabasePageMode();
  const { data: resourcesInfo, isFetching: resourcesInfoLoading } =
    useKubernetesClusterResourcesInfo();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const checkResourceText = (
    value: string | number | undefined,
    units: string,
    fieldLabel: string,
    exceedFlag: boolean
  ) => {
    if (value) {
      const processedValue =
        fieldLabel === Messages.labels.cpu
          ? Math.floor(+value / 1000)
          : Math.floor(+value / 1024**3);

      if (exceedFlag) {
        return Messages.alerts.resourcesCapacityExceeding(
          fieldLabel,
          processedValue,
          units
        );
      } return Messages.labels.estimated(processedValue, units);
    }
    return '';
  };

  const resourceSizePerNode: ResourceSize = watch(
    DbWizardFormFields.resourceSizePerNode
  );
  const cpu = watch(DbWizardFormFields.cpu);
  const memory = watch(DbWizardFormFields.memory);
  const disk = watch(DbWizardFormFields.disk);

  const cpuCapacityExceeded = resourcesInfo
    ? cpu * 1000 > resourcesInfo?.available.cpuMillis
    : !resourcesInfoLoading;
  const memoryCapacityExceeded = resourcesInfo
    ? memory * 1024**3 > resourcesInfo?.available.memoryBytes
    : !resourcesInfoLoading;
  const diskCapacityExceeded = resourcesInfo?.available?.diskSize
    ? disk * 1024**3 > resourcesInfo?.available.diskSize
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
      setError(DbWizardFormFields.disk, { type: 'custom', message: 'fff' });
    } else clearErrors(DbWizardFormFields.disk);
  }, [diskCapacityExceeded]);

  return (
    <>
      <Typography variant="h5">{Messages.pageTitle}</Typography>
      <Typography variant="subtitle2">{Messages.pageDescription}</Typography>
      <FormGroup sx={{ mt: 2 }}>
        <ToggleButtonGroupInput
          name={DbWizardFormFields.numberOfNodes}
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              marginTop: -1,
              gap: 2,
            }}
          >
            <Stack sx={{ flex: '1 1' }}>
              <Typography variant="sectionHeading">
                {Messages.labels.cpu.toUpperCase()}
              </Typography>
              <Input
                value={cpu}
                setValue={(value: number) => {
                  setValue(DbWizardFormFields.cpu, value);
                  checkSwitchToCustom(
                    DbWizardFormFields.cpu,
                    value,
                    resourceSizePerNode,
                    setValue
                  );
                }}
                units="CPU"
                dataTestId="cpu"
              />
              <FormHelperText>
                {checkResourceText(
                  resourcesInfo?.available?.cpuMillis,
                  "CPU",
                  Messages.labels.cpu,
                  cpuCapacityExceeded
                )}
              </FormHelperText>
            </Stack>
            <Stack sx={{ flex: '1 1' }}>
              <Typography variant="sectionHeading">
                {Messages.labels.memory.toUpperCase()}
              </Typography>
              <Input
                value={memory}
                setValue={(value: number) => {
                  setValue(DbWizardFormFields.memory, value);
                  checkSwitchToCustom(
                    DbWizardFormFields.memory,
                    value,
                    resourceSizePerNode,
                    setValue
                  );
                }}
                units="GB"
                dataTestId="memory"
              />
              <FormHelperText>
                {checkResourceText(
                  resourcesInfo?.available?.memoryBytes,
                  "GB",
                  Messages.labels.memory,
                  memoryCapacityExceeded
                )}
              </FormHelperText>
            </Stack>
            <Stack sx={{ flex: '1 1' }}>
              <Typography variant="sectionHeading">
                {Messages.labels.disk.toUpperCase()}
              </Typography>
              <Input
                value={disk}
                setValue={(value: number) => {
                  setValue(DbWizardFormFields.disk, value);
                  checkSwitchToCustom(
                    DbWizardFormFields.disk,
                    value,
                    resourceSizePerNode,
                    setValue
                  );
                }}
                error={diskCapacityExceeded}
                units="GB"
                dataTestId="disk"
                disabled={mode === 'edit'}
              />
              <FormHelperText>
                {checkResourceText(
                  resourcesInfo?.available?.diskSize,
                  'GB',
                  Messages.labels.disk,
                  diskCapacityExceeded
                )}
              </FormHelperText>
            </Stack>
          </Box>
        </Box>
      </FormGroup>
    </>
  );
};
