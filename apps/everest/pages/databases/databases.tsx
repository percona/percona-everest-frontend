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

import AddIcon from '@mui/icons-material/Add';
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
import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { DbClusterView } from '../../components/db-cluster-view/DbClusterView';
import { K8Context } from '../../contexts/kubernetes/kubernetes.context';
import { Messages } from './databases.messages';
import { CodeCopyBlock } from '../../components/code-copy-block/code-copy-block';
import { CodeBlock } from '../../components/code-block/code-block';

export const DatabasesPage = () => {
  const { clusters } = useContext(K8Context);
  const noKubernetesClusters = !clusters?.data?.length;
  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return noKubernetesClusters ? (
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
      <List
        sx={{
          listStyleType: 'decimal',
          pt: 0,
          '& .MuiListItem-root': {
            display: 'list-item',
            pt: 0,
            pb: 0,
          },
        }}
      >
        <ListItem>
          <Typography variant="body2">
            {Messages.firstLine1}
            <Link href="https://github.com/percona/percona-everest-cli/releases">
              {Messages.firstLineLink}
            </Link>
            {Messages.firstLine2}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body2">
            {Messages.secondLine1}
            <CodeBlock message="everestctl-darwin-amd64" />
            {Messages.secondLine2}
          </Typography>
          <CodeCopyBlock message={Messages.secondLineCommand} />
        </ListItem>
        <ListItem>
          <Typography variant="body2">{Messages.thirdLine}</Typography>
          <CodeCopyBlock message={Messages.thirdLineCommand} />
        </ListItem>
        <ListItem>
          <Typography variant="body2">{Messages.forthLine}</Typography>
        </ListItem>
      </List>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mx: 2 }}>
        <CodeCopyBlock message={Messages.noKubernetesCommand} />
        <Typography variant="caption">
          {Messages.captionPart1}
          <CodeBlock message="~/.kube/config'" />
          {Messages.captionPart2}
          <CodeBlock message="KUBECONFIG" />
          {Messages.captionPart3}
        </Typography>
      </Box>
    </Box>
  ) : (
    <DbClusterView
      customHeader={
        <Button
          size="small"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/databases/new"
          variant="contained"
        >
          {Messages.createDatabase}
        </Button>
      }
    />
  );
};
