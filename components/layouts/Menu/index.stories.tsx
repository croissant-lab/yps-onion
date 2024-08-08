import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from '.';

const meta = {
  title: 'layouts/Menu',
  component: Menu,
  args: {
    userName: '山田太郎',
    shops: [
      { id: '1', name: '店舗1' },
      { id: '2', name: '店舗2' },
    ],
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Menu>;
export default meta;

export const Basic: StoryObj<typeof meta> = {};
