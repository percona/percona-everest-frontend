import type { Meta, StoryObj } from '@storybook/react';
import DbToggleCard from '../db-toggle-card';
import { DbType } from '@percona/types';

const meta = {
  title: 'DbToggleCard',
  component: DbToggleCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DbToggleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  argTypes: {
    value: {
      options: [DbType.Mysql, DbType.Mongo, DbType.Postresql],
      control: {
        type: 'radio',
      },
    },
  },
  args: {
    value: DbType.Mysql,
  },
};
