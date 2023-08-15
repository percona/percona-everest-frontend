import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CompositionViewer } from '@percona/design.composition-viewer';
import { baseThemeOptions } from '@percona/design.themes.base';
import { Box } from '@mui/material';
import { TextArray } from './text-array';

export const WithoutLabel = () => {
  const methods = useForm({
    defaultValues: {
      people: [{
        person: 'John'
      }]
    }
  });
  return (
    <CompositionViewer themeOptions={baseThemeOptions}>
      <Box padding={1}>
        <FormProvider {...methods}>
          <TextArray fieldName='people' fieldKey='person' placeholder='Person' />
        </FormProvider>
      </Box>
    </CompositionViewer>
  );
}

export const WithLabel = () => {
  const methods = useForm({
    defaultValues: {
      people: [{
        person: 'John'
      }]
    }
  });

  return (
    <CompositionViewer themeOptions={baseThemeOptions}>
      <Box padding={1}>
        <FormProvider {...methods}>
          <TextArray fieldName='people' fieldKey='person' label='People' placeholder='Person' />
        </FormProvider>
      </Box>
    </CompositionViewer>
  );
}
