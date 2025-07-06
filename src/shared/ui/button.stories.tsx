// components/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Click Me',
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['default', 'outline'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};
