import React, { useEffect } from 'react';
import { Messages } from './second-step.messages';
import {
  Alert,
  Box,
  FormGroup,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { ResourcesDetail } from '../../../../components/resources-detail';
import {
  NumberOfNodes,
  ResourcesFields,
  ResourceSize,
} from './second-step.types';
import { ToggleCard } from '@percona/ui-lib.toggle-card';
import {
  checkSwitchToCustom,
  humanizeNumberOfNodesMap,
} from './second-step.utils';
import { ResourcesLegend } from './resources-legend/resources-legend';
import { DEFAULT_SIZES } from './second-step.const';

export const SecondStep = () => {
  const { control, watch, setValue } = useFormContext();

  //TODO should be set from api
  const TOTAL_SIZES = {
    cpu: 32,
    memory: 50,
    disk: 50,
  };

  const resourceSizePerNode: ResourceSize = watch(ResourcesFields.resourceSizePerNode);
  const cpuCapacityExceeded = watch(ResourcesFields.cpu) > TOTAL_SIZES.cpu;
  const memoryCapacityExceeded = watch(ResourcesFields.memory) > TOTAL_SIZES.memory;
  const diskCapacityExceeded = watch(ResourcesFields.disk) > TOTAL_SIZES.disk;

  useEffect(() => {
    if (resourceSizePerNode && resourceSizePerNode !== ResourceSize.custom) {
      setValue(ResourcesFields.cpu, DEFAULT_SIZES[resourceSizePerNode].cpu);
      setValue(ResourcesFields.disk, DEFAULT_SIZES[resourceSizePerNode].disk);
      setValue(
        ResourcesFields.memory,
        DEFAULT_SIZES[resourceSizePerNode].memory
      );
    }
  }, [resourceSizePerNode]);

  return (
    <>
      <Typography variant="h5">{Messages.pageTitle}</Typography>
      <Typography variant="subtitle2">{Messages.pageDescription}</Typography>
      <FormGroup sx={{ mt: 2 }}>
        <Typography variant="sectionHeading" sx={{ mt: 1, mb: 0.5 }}>
          {Messages.labels.numberOfNodes}
        </Typography>
        <Controller
          name={ResourcesFields.numberOfNodes}
          control={control}
          render={({ field }) => (
            <ToggleButtonGroup
              {...field}
              fullWidth
              exclusive
              sx={{ marginTop: 1 }}
              onChange={(
                event: React.MouseEvent<HTMLElement> | any,
                value: NumberOfNodes
              ) => {
                if (value !== null) {
                  /* eslint-disable no-param-reassign */
                  event.target.value = value;
                  field.onChange(event);
                }
              }}
            >
              <ToggleCard value={NumberOfNodes.oneNode}>
                {humanizeNumberOfNodesMap(NumberOfNodes.oneNode)}
                <br />({NumberOfNodes.twoNodes} node)
              </ToggleCard>
              <ToggleCard value={NumberOfNodes.twoNodes}>
                {humanizeNumberOfNodesMap(NumberOfNodes.twoNodes)}
                <br />({NumberOfNodes.twoNodes} nodes)
              </ToggleCard>
              <ToggleCard value={NumberOfNodes.threeNodes}>
                {humanizeNumberOfNodesMap(NumberOfNodes.threeNodes)}
                <br />({NumberOfNodes.threeNodes} nodes)
              </ToggleCard>
            </ToggleButtonGroup>
          )}
        />
        <Typography variant="sectionHeading" sx={{ mt: 4, mb: 0.5 }}>
          {Messages.labels.resourceSizePerNode}
        </Typography>
        <Controller
          name={ResourcesFields.resourceSizePerNode}
          control={control}
          render={({ field }) => (
            <ToggleButtonGroup
              {...field}
              fullWidth
              exclusive
              sx={{ marginTop: 1 }}
              onChange={(
                event: React.MouseEvent<HTMLElement> | any,
                value: ResourceSize
              ) => {
                if (value !== null) {
                  /* eslint-disable no-param-reassign */
                  event.target.value = value;
                  field.onChange(event);
                }
              }}
            >
              <ToggleCard value={ResourceSize.small}>Small</ToggleCard>
              <ToggleCard value={ResourceSize.medium}>Medium</ToggleCard>
              <ToggleCard value={ResourceSize.large}>Large</ToggleCard>
              <ToggleCard value={ResourceSize.custom}>Custom</ToggleCard>
            </ToggleButtonGroup>
          )}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 4, gap: 1 }}>
          {cpuCapacityExceeded && (
            <Alert severity="warning" sx={{ mb: 1 }}>
              {Messages.alerts.resourcesCapacityExceeding(Messages.labels.cpu)}
            </Alert>
          )}
          {memoryCapacityExceeded && (
            <Alert severity="warning" sx={{ mb: 1 }}>
              {Messages.alerts.resourcesCapacityExceeding(
                Messages.labels.memory
              )}
            </Alert>
          )}
          {diskCapacityExceeded && (
            <Alert severity="warning" sx={{ mb: 1 }}>
              {Messages.alerts.resourcesCapacityExceeding(Messages.labels.disk)}
            </Alert>
          )}
          <ResourcesDetail
            value={1}
            total={TOTAL_SIZES.cpu}
            inputValue={watch(ResourcesFields.cpu)}
            setInputValue={(value: number) => {
              setValue(ResourcesFields.cpu, value);
              checkSwitchToCustom(
                ResourcesFields.cpu,
                value,
                resourceSizePerNode,
                setValue
              );
            }}
            label={Messages.labels.cpu}
            units="CPU"
          />
          <ResourcesDetail
            value={1}
            total={TOTAL_SIZES.memory}
            inputValue={watch(ResourcesFields.memory)}
            setInputValue={(value: number) => {
              setValue(ResourcesFields.memory, value);
              checkSwitchToCustom(
                ResourcesFields.memory,
                value,
                resourceSizePerNode,
                setValue
              );
            }}
            label={Messages.labels.memory}
            units="GB"
          />
          <ResourcesDetail
            value={1}
            total={TOTAL_SIZES.disk}
            inputValue={watch(ResourcesFields.disk)}
            setInputValue={(value: number) => {
              setValue(ResourcesFields.disk, value);
              checkSwitchToCustom(
                ResourcesFields.disk,
                value,
                resourceSizePerNode,
                setValue
              );
            }}
            label={Messages.labels.disk}
            units="GB"
          />
          <ResourcesLegend />
        </Box>
      </FormGroup>
    </>
  );
};
