// percona-everest-frontend
// Copyright (C) 2023 Percona LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
  Box,
  Button,
  Link,
  List,
  ListItem,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Messages } from './no-kubernetes.messages';
import { CodeBlock } from '../../../components/code-block/code-block';
import { CodeCopyBlock } from '../../../components/code-copy-block/code-copy-block';

export const NoKubernetes = () => {
  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        padding: isMobile ? 1 : isLaptop ? 2 : '52px 212px 52px 212px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography sx={{ mb: 3 }} variant="h5">
        {Messages.noKubernetesClusters}
      </Typography>
      <Typography variant="body2">{Messages.letsCreate}</Typography>
      <List
        sx={{
          listStyleType: 'decimal',
          pl: '18px',
          pt: 0,
          '& .MuiListItem-root': {
            display: 'list-item',
            pt: 0,
            pb: 1,
          },
        }}
      >
        <ListItem>
          <Typography variant="body2">
            {Messages.downloadTheLatest}
            <Link href="https://github.com/percona/percona-everest-cli/releases">
              {Messages.everestctl}
            </Link>
            {Messages.toProvisionPercona}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body2">
            {Messages.renameTheFile}
            <CodeBlock message="everestctl-darwin-amd64" />
            {Messages.toMatchTheFile}
          </Typography>
          <CodeCopyBlock message={Messages.moveCommand} />
        </ListItem>
        <ListItem>
          <Typography variant="body2">{Messages.modifyPermissions}</Typography>
          <CodeCopyBlock message={Messages.modifyPermissionsCommand} />
        </ListItem>
        <ListItem>
          <Typography variant="body2">
            {Messages.fromTheInstallationWizard}
          </Typography>
          <Typography variant="body2">
            {Messages.everestWillSearch}
            <CodeBlock message={Messages.kubeconfig} />
            {Messages.ifYourFileIsLocated}
            <CodeBlock message="KUBECONFIG" />
            {Messages.beforeRunningTheCommand}
          </Typography>
          <CodeCopyBlock message={Messages.exportKubeConfig} />

          <CodeCopyBlock message={Messages.everestctlInstall} />
          <Typography variant="caption">
            {Messages.note}
            <List
              sx={{
                listStyleType: 'circle',
                pt: 0,
                '& .MuiListItem-root': {
                  display: 'list-item',
                  listStylePosition: 'inside',
                  pl: 0,
                  pb: 0,
                },
              }}
            >
              <ListItem>{Messages.makeSure}</ListItem>
              <ListItem>{Messages.usingPMMServerInstanceCase}</ListItem>
            </List>
          </Typography>
        </ListItem>
      </List>
      <Box sx={{ display: 'flex', flexDirection: 'column', mx: 2, pl: '18px' }}>
        <Button
          variant="outlined"
          sx={{ alignSelf: 'flex-end' }}
          onClick={() => navigate(0)}
        >
          {Messages.recheck}
        </Button>
      </Box>
    </Box>
  );
};
