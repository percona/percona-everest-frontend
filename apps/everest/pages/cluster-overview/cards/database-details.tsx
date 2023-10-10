import React from 'react';
import { Grid } from '@mui/material';
import { Card } from '@percona/ui-lib.card';
import { Messages } from '../cluster-overview.messages';
import { OverviewSection, OverviewSectionText } from '../overview-section/overview-section';
import { DatabaseDetailsOverviewCardProps } from './card.types';
import { beautifyDbTypeName } from '../../../utils/db';

export const DatabaseDetails = ({
  loading,
  type,
  name,
  namespace,
  version,
  numberOfNodes,
  cpu,
  externalAccess,
  monitoring,
}: DatabaseDetailsOverviewCardProps) => (
  <Card
    title={Messages.titles.dbDetails}
    dataTestId='database-details'
    content={
      <Grid container spacing={2}>
        <OverviewSection title={Messages.titles.basicInformation} loading={loading}>
          <OverviewSectionText>{Messages.fields.type(beautifyDbTypeName(type))}</OverviewSectionText>
          <OverviewSectionText>{Messages.fields.name(name)}</OverviewSectionText>
          <OverviewSectionText>{Messages.fields.namespace(namespace)}</OverviewSectionText>
          <OverviewSectionText>{Messages.fields.version(version)}</OverviewSectionText>
        </OverviewSection>
        <OverviewSection title={Messages.titles.resources} loading={loading}>
          <OverviewSectionText>{Messages.fields.numberOfNodes(numberOfNodes)}</OverviewSectionText>
          <OverviewSectionText>{Messages.fields.cpu(cpu)}</OverviewSectionText>
        </OverviewSection>
        <OverviewSection title={Messages.titles.externalAccess} loading={loading}>
          <OverviewSectionText>{externalAccess ? Messages.fields.enabled : Messages.fields.disabled}</OverviewSectionText>
        </OverviewSection>
        <OverviewSection title={Messages.titles.monitoring} loading={loading}>
          <OverviewSectionText>{monitoring ? Messages.fields.enabled : Messages.fields.disabled}</OverviewSectionText>
        </OverviewSection>
      </Grid>
    }
  />
);
