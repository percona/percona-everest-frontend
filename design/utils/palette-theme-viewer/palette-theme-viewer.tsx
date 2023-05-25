import React from 'react';
import { Box, Palette, Stack, Typography, styled } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { getThemeType } from '@percona/design.themes.base';

/**
 * This component was based on https://mui.com/joy-ui/customization/theme-colors/
 */

const RenderSwatch = ({ token }: { token: string }) => (
  <Box
    component="span"
    sx={{
      position: 'relative',
      width: '1em',
      height: '1em',
      borderRadius: '2px',
      backgroundRepeat: 'repeat-x',
      backgroundSize: '100% 50%, 100% 50%',
      backgroundPosition: '0 0, 0 100%',
      marginRight: '5px',
      '&::after': {
        content: '""',
        position: 'absolute',
        display: 'block',
        inset: 0,
        bgcolor: token,
        borderRadius: 'inherit',
        boxShadow: 'inset 0 0 0 1px #bababa',
      },
    }}
  />
);

const traverseObject = (palette: Palette) => {
  const result: Record<string, any> = {};
  const traverse = (object: any, parts: string[] = []) => {
    if (object && typeof object === 'object') {
      for (const key of Object.keys(object)) {
        traverse(object[key], [...parts, key]);
      }
    } else {
      result[parts.join('.')] = object;
    }
  };

  traverse(palette);
  return result;
};

const Table = styled('table')(({ theme }) => ({
  borderCollapse: 'separate',
  borderSpacing: 0,
  width: '100%',
  th: {
    textAlign: 'left',
    fontWeight: '700',
    padding: '8px 6px',
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
  td: {
    verticalAlign: 'top',
    padding: '3px 6px',
  },
  tr: {
    '&:first-of-type': {
      '& td': { paddingTop: 6 },
    },
    '&:nth-child(even)': {
      backgroundColor: theme.palette.grey[300],
    },
  },
}));

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
});

export const PaletteThemeViewer = ({
  getTheme,
}: {
  getTheme: getThemeType;
}) => {
  const light = traverseObject(getTheme('light').palette);
  const dark = traverseObject(getTheme('dark').palette);

  const paletteTokens = Array.from(
    new Set([...Object.keys(dark), ...Object.keys(light)])
  ).sort(collator.compare);

  return (
    <Box
      sx={{
        width: '100%',
        overflowY: 'scroll',
        position: 'relative',
        maxHeight: '500px',
      }}
    >
      <Table>
        <thead>
          <tr>
            <th>
              <Typography>Token</Typography>
            </th>
            <th>
              <Stack direction="row" spacing="2">
                <LightMode />
                <Typography>Light</Typography>
              </Stack>
            </th>
            <th>
              <Stack direction="row" spacing="2">
                <DarkMode />
                <Typography>Dark</Typography>
              </Stack>
            </th>
          </tr>
        </thead>
        <tbody>
          {paletteTokens
            .filter((token) => token !== 'mode')
            .map((token) => (
              <React.Fragment key={token}>
                {typeof light[token] === 'string' ? (
                  <tr>
                    <td>
                      <Typography sx={{ py: 1, display: 'block' }}>
                        {token}
                      </Typography>
                    </td>
                    <td>
                      <Box
                        sx={{
                          fontSize: 'xs',
                          textAlign: 'left',
                          display: 'flex',
                          alignItems: 'center',
                          textTransform: 'uppercase',
                        }}
                      >
                        <RenderSwatch token={token} />
                        {light[token]}
                      </Box>
                    </td>
                    <td>
                      <Box
                        sx={{
                          fontSize: 'xs',
                          textAlign: 'left',
                          display: 'flex',
                          alignItems: 'center',
                          textTransform: 'uppercase',
                        }}
                      >
                        <RenderSwatch token={token} />
                        {dark[token]}
                      </Box>
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>
            ))}
        </tbody>
      </Table>
    </Box>
  );
};
