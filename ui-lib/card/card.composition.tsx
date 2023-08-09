import React from 'react';
import { everestThemeOptions } from '@percona/design.themes.everest';
import { CompositionViewer } from '@percona/design.composition-viewer';
import { Box, Stack, IconButton } from '@mui/material';
import { Cached } from '@mui/icons-material';
import { Card } from './card';

export const BasicCard = () => {
  return (
    <CompositionViewer themeOptions={everestThemeOptions}>
      <Stack sx={{ flexDirection: 'row', gap: 2, mt: 3, flexWrap: 'wrap' }}>
        <Card dataTestId="no-header" content="card without header" />
        <Card
          dataTestId="no-header-with-actions"
          content="card without header, with actions"
          cardActions={[
            { variant: 'contained', text: 'Send feedback', size: 'small' },
            { variant: 'outlined', text: 'Cancel', size: 'small' },
          ]}
        />
        <Card
          dataTestId="no-actions"
          title="HeadLine"
          content="card with header, without actions"
        />
        <Card
          dataTestId="custom-content"
          content={
            <Box sx={{ backgroundColor: '#FFAADD' }}>
              <p>Custom content as React Node</p>
              <IconButton>
                <Cached />
              </IconButton>
            </Box>
          }
          title="Custom Content"
        />

        <Card
          dataTestId="long-text"
          title="HeadLine"
          content="long text It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters..."
        />

        <Card
          dataTestId="normal"
          title="Card with actions"
          content="Card with headline, content text as string and actions"
          cardActions={[
            { variant: 'contained', text: 'Send feedback', size: 'small' },
            { variant: 'contained', text: 'Close', size: 'small' },
            { variant: 'outlined', text: 'Cancel', size: 'small' },
          ]}
        />
      </Stack>
    </CompositionViewer>
  );
};
