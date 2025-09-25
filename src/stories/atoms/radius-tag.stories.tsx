import type { Meta, StoryObj } from '@storybook/react';
import RadiusTag from '@/shared/ui/radius-tag';

const meta: Meta<typeof RadiusTag> = {
  title: 'Atoms/RadiusTag',
  component: RadiusTag,
  tags: ['autodocs'],
  args: {
    status: 'OPEN', // 기본값
  },
};
export default meta;

type Story = StoryObj<typeof RadiusTag>;

export const Open: Story = {
  args: {
    status: 'OPEN',
  },
};

export const Closed: Story = {
  args: {
    status: 'CLOSED',
  },
};

export const Before: Story = {
  args: {
    status: 'BEFORE',
  },
};

export const Imminent: Story = {
  args: {
    status: 'IMMINENT',
  },
};
