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

import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stack,
  Box,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDbCluster } from '../../../../hooks/api/db-cluster/useDbCluster';
import { useParams } from 'react-router-dom';
import { Messages } from './scheduled-backups-list.messages';
import { getTimeSelectionPreviewMessage } from '../../../database-form/database-preview/database.preview.messages';
import { getFormValuesFromCronExpression } from '../../../../components/time-selection/time-selection.utils';
import { DotsMenu, Option } from '../../../../components/dots-menu/dots-menu';

export const ScheduledBackupsList = () => {
  const { dbClusterName } = useParams();
  const { data } = useDbCluster(dbClusterName!, !!dbClusterName);
  const schedules = data && data?.spec?.backup?.schedules;
  const handleDelete = () => {
    // TODO delete
  };

  const handleEdit = () => {
    // TODO edit
  };

  const options: Option[] = [
    {
      key: 'delete',
      onClick: handleDelete,
      children: Messages.menuItems.delete,
    },
    { key: 'edit', onClick: handleEdit, children: Messages.menuItems.edit },
  ];

  return (
    <>
      <Accordion sx={{ mt: 1 }} disabled={!schedules}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="scheduled-backups-content"
          data-testid="scheduled-backups"
        >
          <Typography variant="body1">
            {schedules
              ? Messages.sectionHeader(schedules?.length)
              : Messages.noSchedules}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack useFlexGap spacing={1}>
            {schedules &&
              schedules.map((item) => (
                <Paper
                  key={`schedule-${item?.schedule}`}
                  sx={{ py: 1, px: 2, borderRadius: 0 }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={{ width: '65%' }}>
                      {' '}
                      <Typography variant="subHead2">
                        {getTimeSelectionPreviewMessage(
                          getFormValuesFromCronExpression(item.schedule)
                        )}
                      </Typography>
                    </Box>
                    <Box sx={{ width: '30%' }}>
                      {item?.retentionCopies
                        ? `Retention copies: ${item.retentionCopies}`
                        : '-'}
                    </Box>
                    <Box
                      sx={{
                        width: '5%',
                        justifyContent: 'flex-end',
                        display: 'flex',
                      }}
                    >
                      <DotsMenu options={options} />
                    </Box>
                  </Box>
                </Paper>
              ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
