// src/shared/ui/input.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Input from '../../shared/ui/input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'error'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: '기본 입력',
    variant: 'default',
  },
};

export const Error: Story = {
  args: {
    placeholder: '에러 상태 입력',
    variant: 'error',
  },
};
