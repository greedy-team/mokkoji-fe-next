import ClubSearchItem from '@/entities/search/club-search-item';
import type { Meta, StoryObj } from '@storybook/react';
import { ClubAffiliation, ClubCategory } from '@/shared/model/type';

const meta: Meta<typeof ClubSearchItem> = {
  title: 'molecules/ClubSearchItem',
  component: ClubSearchItem,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof ClubSearchItem>;

export const Default: Story = {
  args: {
    club: {
      id: 184,
      name: '모꼬지',
      category: ClubCategory.OTHER,
      description: '우리 동아리에서 함께할 신입 멤버를 모집합니다!',
      affiliation: ClubAffiliation.CENTRAL_CLUB,
      recruitStartDate: '',
      recruitEndDate: '',
      logo: '',
      isFavorite: undefined,
    },
  },
};

export const WithCategory: Story = {
  args: {
    club: {
      id: 201,
      name: '알고리즘 연구회',
      category: ClubCategory.ACADEMIC_CULTURAL,
      description: '주 2회 스터디와 월 1회 알고리즘 대회 준비를 함께합니다.',
      affiliation: ClubAffiliation.CENTRAL_CLUB,
      recruitStartDate: '',
      recruitEndDate: '',
      logo: '',
      isFavorite: undefined,
    },
  },
};

export const WithoutCategory: Story = {
  args: {
    club: {
      id: 202,
      name: '런앤펀',
      category: ClubCategory.SPORTS,
      description: '매주 토요일 오전 러닝 모임. 초보 환영!',
      affiliation: ClubAffiliation.CENTRAL_CLUB,
      recruitStartDate: '',
      recruitEndDate: '',
      logo: '',
      isFavorite: undefined,
    },
  },
};

export const LongDescription: Story = {
  args: {
    club: {
      id: 203,
      name: '창업 동아리 SPARK',
      category: ClubCategory.OTHER,
      description:
        '아이디어 발굴 → 프로토타입 제작 → 사용자 인터뷰 → 피봇을 반복하며 실제 서비스 출시를 목표로 활동합니다. ' +
        '외부 네트워킹과 멘토링, 스터디도 함께 진행해요.',
      affiliation: ClubAffiliation.CENTRAL_CLUB,
      recruitStartDate: '',
      recruitEndDate: '',
      logo: '',
      isFavorite: undefined,
    },
  },
};
