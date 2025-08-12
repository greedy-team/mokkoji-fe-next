import type { Meta, StoryObj } from '@storybook/react';
import Textarea from '../../shared/ui/textarea';

const meta: Meta<typeof Textarea> = {
  title: 'atoms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
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
