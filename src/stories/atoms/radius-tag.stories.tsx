import type { Meta, StoryObj } from '@storybook/react';
import RadiusTag from '@/shared/ui/radius-tag';

const meta: Meta<typeof RadiusTag> = {
  title: 'Atoms/RadiusTag',
  component: RadiusTag,
  tags: ['autodocs'],
  args: {
    recruitStatus: 'OPEN', // 기본값
  },
};
export default meta;

type Story = StoryObj<typeof RadiusTag>;

export const Open: Story = {
  args: {
    recruitStatus: 'OPEN',
  },
};

export const Closed: Story = {
  args: {
    recruitStatus: 'CLOSED',
  },
};

export const Before: Story = {
  args: {
    recruitStatus: 'BEFORE',
  },
};

export const Imminent: Story = {
  args: {
    recruitStatus: 'IMMINENT',
  },
};
