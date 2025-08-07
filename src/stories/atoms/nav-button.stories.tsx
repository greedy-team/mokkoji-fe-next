import type { Meta, StoryObj } from '@storybook/react';
import NavButton from '../../shared/ui/nav-button';

const meta: Meta<typeof NavButton> = {
  title: 'atoms/NavButton',
  component: NavButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NavButton>;

export const Active: Story = {
  args: {
    label: '모집 공고',
    href: '#',
  },
};

export const Inactive: Story = {
  args: {
    label: '모집 공고',
    href: '#',
  },
};
