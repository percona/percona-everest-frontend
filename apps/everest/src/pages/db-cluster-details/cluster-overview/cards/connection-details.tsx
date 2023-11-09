import { Grid } from '@mui/material';
import { Card } from '@percona/ui-lib';
import { HiddenPasswordToggle } from 'components/hidden-row';
import { Messages } from '../cluster-overview.messages';
import {
  OverviewSection,
  OverviewSectionText,
} from '../overview-section/overview-section';
import { ConnectionDetailsOverviewCardProps } from './card.types';

export const ConnectionDetails = ({
  loading,
  loadingClusterDetails,
  hostname = '',
  port,
  username,
  password,
}: ConnectionDetailsOverviewCardProps) => (
  <Card
    title={Messages.titles.connectionDetails}
    dataTestId="connection-details"
    content={
      <Grid container spacing={2}>
        <OverviewSection title={Messages.titles.host} loading={loading}>
          <OverviewSectionText>
          {hostname.split(',').map((host) => <div key={host}>{host}</div>)}
          </OverviewSectionText>
        </OverviewSection>
        <OverviewSection title={Messages.titles.port} loading={loading}>
          <OverviewSectionText>{port}</OverviewSectionText>
        </OverviewSection>
        <OverviewSection
          title={Messages.titles.username}
          loading={loadingClusterDetails}
        >
          <OverviewSectionText>{username}</OverviewSectionText>
        </OverviewSection>
        <OverviewSection
          title={Messages.titles.password}
          loading={loadingClusterDetails}
        >
          <OverviewSectionText>
            <HiddenPasswordToggle showCopy value={password} />
          </OverviewSectionText>
        </OverviewSection>
      </Grid>
    }
  />
);
