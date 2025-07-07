import type { Meta, StoryObj } from '@storybook/react';
import NavButton from './nav-button';

const meta: Meta<typeof NavButton> = {
  title: 'Components/NavButton',
  component: NavButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NavButton>;

export const Active: Story = {
  args: {
    label: '모집 공고',
    href: '#',
    active: true,
  },
};

export const Inactive: Story = {
  args: {
    label: '모집 공고',
    href: '#',
    active: false,
  },
};
