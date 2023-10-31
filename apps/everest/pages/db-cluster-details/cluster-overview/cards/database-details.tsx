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
import { Grid } from '@mui/material';
import { Card } from '@percona/ui-lib.card';
import { Messages } from '../cluster-overview.messages';
import {
  OverviewSection,
  OverviewSectionText,
} from '../overview-section/overview-section';
import { DatabaseDetailsOverviewCardProps } from './card.types';
import { beautifyDbTypeName } from '../../../../utils/db';

export const DatabaseDetails = ({
  loading,
  type,
  name,
  namespace,
  version,
  numberOfNodes,
  cpu,
  memory,
  disk,
  externalAccess,
  monitoring,
}: DatabaseDetailsOverviewCardProps) => (
  <Card
    title={Messages.titles.dbDetails}
    dataTestId="database-details"
    content={
      <Grid container spacing={2}>
        <OverviewSection
          title={Messages.titles.basicInformation}
          loading={loading}
        >
          <OverviewSectionText>
            {Messages.fields.type(beautifyDbTypeName(type))}
          </OverviewSectionText>
          <OverviewSectionText>
            {Messages.fields.name(name)}
          </OverviewSectionText>
          <OverviewSectionText>
            {Messages.fields.namespace(namespace)}
          </OverviewSectionText>
          <OverviewSectionText>
            {Messages.fields.version(version)}
          </OverviewSectionText>
        </OverviewSection>
        <OverviewSection title={Messages.titles.resources} loading={loading}>
          <OverviewSectionText>
            {Messages.fields.numberOfNodes(numberOfNodes)}
          </OverviewSectionText>
          <OverviewSectionText>{Messages.fields.cpu(cpu)}</OverviewSectionText>
          <OverviewSectionText>
            {Messages.fields.memory(memory)}
          </OverviewSectionText>
          <OverviewSectionText>
            {Messages.fields.disk(disk)}
          </OverviewSectionText>
        </OverviewSection>
        <OverviewSection
          title={Messages.titles.externalAccess}
          loading={loading}
        >
          <OverviewSectionText>
            {externalAccess
              ? Messages.fields.enabled
              : Messages.fields.disabled}
          </OverviewSectionText>
        </OverviewSection>
        <OverviewSection title={Messages.titles.monitoring} loading={loading}>
          <OverviewSectionText>
            {monitoring ? Messages.fields.enabled : Messages.fields.disabled}
          </OverviewSectionText>
        </OverviewSection>
      </Grid>
    }
  />
);
