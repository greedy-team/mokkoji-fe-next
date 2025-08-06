// components/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../shared/ui/button';
import KakaoIcon from '../../shared/ui/kakao-icon';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Click Me',
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['default', 'outline', 'submit', 'options', 'kakao'],
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

export const Submit: Story = {
  args: {
    variant: 'submit',
  },
};

export const Options: Story = {
  args: {
    variant: 'options',
  },
};

export const KakaoLogin: Story = {
  args: {
    variant: 'kakao',
    children: (
      <>
        <KakaoIcon />
        카카오 로그인
      </>
    ),
    className: 'w-full max-w-sm',
  },
};
