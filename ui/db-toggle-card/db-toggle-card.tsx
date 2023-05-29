import React from 'react';
import { ToggleCard } from '@percona/ui.toggle-card';
import { PostgreSqlIcon, MongoIcon, MySqlIcon } from '@percona/ui.icons.db';
import { SvgIconProps, Typography } from '@mui/material';
import { DbToggleCardProps, DbType } from './db-toggle-card.types';
import { humanizeDbType } from './db-toggle-card.utils';

const iconMap: Record<DbType, (props: SvgIconProps) => React.JSX.Element> = {
  [DbType.Postresql]: PostgreSqlIcon,
  [DbType.Mongo]: MongoIcon,
  [DbType.Mysql]: MySqlIcon,
};

const DbIcon = ({ type }: { type: DbType }) => {
  const commonProps: SvgIconProps = {
    fontSize: 'large',
    sx: { mr: 1 },
  };

  const MappedIcon = iconMap[type];

  return <MappedIcon {...commonProps} />;
};

export const DbToggleCard = ({ ...props }: DbToggleCardProps) => (
  <ToggleCard {...props}>
    <DbIcon type={props.value} />
    <Typography variant="body1">{humanizeDbType(props.value)}</Typography>
  </ToggleCard>
);
