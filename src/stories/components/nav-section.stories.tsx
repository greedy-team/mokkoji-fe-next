import type { Meta, StoryObj } from '@storybook/react';
import NavSection from '../../shared/ui/nav-section';

const meta: Meta<typeof NavSection> = {
  title: 'Components/NavSection',
  component: NavSection,
  tags: ['autodocs'],
  args: {
    href: '/club',
  },
};

export default meta;

type Story = StoryObj<typeof NavSection>;

export const Default: Story = {};
