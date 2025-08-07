import type { Meta, StoryObj } from '@storybook/react';
import ClubItem from '@/entities/club/ui/club-item';
import { SessionProvider } from 'next-auth/react';

const meta: Meta<typeof ClubItem> = {
  title: 'molecules/ClubItem',
  component: ClubItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <SessionProvider
        session={{
          user: {
            name: '홍길동',
            email: 'test@example.com',
          },
          expires: '2099-01-01T00:00:00.000Z',
        }}
      >
        <Story />
      </SessionProvider>
    ),
  ],
  args: {
    title: '모각코 모집합니다',
    description:
      '함께 공부하고 성장하는 모각코 활동입니다.\n자유롭게 신청해주세요!',
    isFavorite: false,
    logo: 'https://avatars.githubusercontent.com/u/9919?s=200&v=4',
    clubId: '1',
  },
};

export default meta;
type Story = StoryObj<typeof ClubItem>;

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
