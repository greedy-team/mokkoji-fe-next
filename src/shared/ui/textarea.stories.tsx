import type { Meta, StoryObj } from '@storybook/react';
import Textarea from './textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'error'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: '기본 텍스트에어리어',
    variant: 'default',
  },
};

export const Error: Story = {
  args: {
    placeholder: '에러 상태',
    variant: 'error',
  },
};
