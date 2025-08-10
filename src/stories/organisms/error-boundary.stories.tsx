import type { Meta, StoryObj } from '@storybook/react';
import ErrorBoundaryStory from '../../shared/ui/error-boundary-ui-story';

const meta: Meta<typeof ErrorBoundaryStory> = {
  title: 'organisms/ErrorBoundary',
  component: ErrorBoundaryStory,
  tags: ['autodocs'],
  args: {
    message: '데이터를 불러오는 중 오류가 발생했습니다.',
  },
};

export default meta;

type Story = StoryObj<typeof ErrorBoundaryStory>;

export const Default: Story = {};

export const LongMessage: Story = {
  args: {
    message:
      '토큰이 만료되어 다시 로그인해야 합니다. 토큰이 만료되어 다시 로그인해야 합니다. 토큰이 만료되어 다시 로그인해야 합니다.',
  },
};
