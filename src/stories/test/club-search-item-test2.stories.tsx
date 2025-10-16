import type { Meta, StoryObj } from '@storybook/react';
import {
  ClubAffiliation,
  ClubCategory,
  type ClubType,
} from '@/shared/model/type';
import ClubSearchItemTest2 from '@/stories/test/components/club-search-item-test2';

const meta: Meta<typeof ClubSearchItemTest2> = {
  title: 'test/ClubSearchItem2Test',
  component: ClubSearchItemTest2,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ClubSearchItemTest2>;

const sampleClub: ClubType = {
  id: 1,
  name: '모꼬지 개발 동아리',
  logo: 'https://avatars.githubusercontent.com/u/9919?s=200&v=4',
  description:
    '세종대학교 모꼬지 개발 동아리입니다. 다양한 웹 기술을 탐구하며 서비스 개발을 진행합니다.',
  category: ClubCategory.CULTURAL_ART,
  affiliation: ClubAffiliation.CENTRAL_CLUB,
  recruitStartDate: '',
  recruitEndDate: '',
  isFavorite: undefined,
};

export const Default: Story = {
  args: {
    club: sampleClub,
  },
};

export const LongDescription: Story = {
  args: {
    club: {
      ...sampleClub,
      name: 'SJU Robotics',
      description:
        '세종대학교 로봇 연구회입니다. 하드웨어 제어, 인공지능, 컴퓨터 비전, 자율주행 등 다양한 기술을 융합하여 프로젝트를 진행하고 있습니다. 각종 공모전과 경진대회에 참여하며 기술 역량을 키워갑니다. 새로운 기술 도전을 좋아하는 분들을 환영합니다!',
    },
  },
};
