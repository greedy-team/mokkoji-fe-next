// components/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../shared/ui/button';
import KakaoIcon from '../../shared/ui/kakao-icon';

const meta: Meta<typeof Button> = {
  title: 'atoms/Button',
  component: Button,
  args: {
    children: 'Click Me',
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['submit', 'disabled'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Submit: Story = {
  args: {
    variant: 'submit',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'disabled',
  },
};
