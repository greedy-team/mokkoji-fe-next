import type { Meta, StoryObj } from '@storybook/react';
import ErrorBoundary from './error-boundary-ui';

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Common/ErrorBoundary',
  component: ErrorBoundary,
  tags: ['autodocs'],
  args: {
    message: '데이터를 불러오는 중 오류가 발생했습니다.',
  },
};

export default meta;

type Story = StoryObj<typeof ErrorBoundary>;

export const Default: Story = {};

export const CustomMessage: Story = {
  args: {
    message: '토큰이 만료되어 다시 로그인해야 합니다.',
  },
};
