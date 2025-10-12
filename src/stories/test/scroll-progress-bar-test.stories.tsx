import type { Meta, StoryObj } from '@storybook/react';
import ScrollProgressBarTest from './components/scroll-progress-bar-test';

// ✅ 스토리 메타 정보
const meta: Meta<typeof ScrollProgressBarTest> = {
  title: 'test/ScrollProgressBarTest',
  component: ScrollProgressBarTest,
  parameters: {
    layout: 'fullscreen', // 상단바가 페이지 전체에 걸쳐보이도록
  },
};

export default meta;
type Story = StoryObj<typeof ScrollProgressBarTest>;

// ✅ 기본 스토리
export const Default: Story = {
  render: () => (
    <div className="relative">
      <ScrollProgressBarTest />
      <div className="space-y-10 p-8">
        <h1 className="text-center text-4xl font-bold">
          Scroll to see the ProgressBar
        </h1>
        {/* 스크롤 테스트용 더미 콘텐츠 */}
        {[...Array(40)].map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <p key={i} className="text-lg text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
            quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
            mauris. Fusce nec tellus sed augue semper porta.
          </p>
        ))}
      </div>
    </div>
  ),
};
