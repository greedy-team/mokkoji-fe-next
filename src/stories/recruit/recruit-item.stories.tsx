// components/RecruitItem.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import RecruitItem from '../../entities/recruit/ui/recruit-item';

const meta: Meta<typeof RecruitItem> = {
  title: 'pages/recruit/RecruitItem',
  component: RecruitItem,
  tags: ['autodocs'],
  args: {
    title: '모각코 모집합니다',
    startDate: '2025-07-01',
    endDate: '2025-07-20',
    description:
      '함께 공부하고 성장하는 모각코 활동입니다.\n자유롭게 신청해주세요!',
    isFavorite: false,
    logo: 'https://avatars.githubusercontent.com/u/9919?s=200&v=4',
  },
};

export default meta;
type Story = StoryObj<typeof RecruitItem>;

export const Default: Story = {};

export const Favorite: Story = {
  args: {
    isFavorite: true,
  },
};

export const LongDescription: Story = {
  args: {
    description:
      '모각코 활동은 매주 정해진 시간에 함께 모여 각자의 공부를 하는 스터디입니다.\n' +
      '온라인과 오프라인 모두 가능하며, 관심 있는 분들은 지금 바로 지원해주세요!\n' +
      '다양한 전공의 친구들과 교류할 수 있는 기회도 있습니다.',
  },
};
