import type { Meta, StoryObj } from '@storybook/react';
import Loading from '../../shared/ui/loading';

const meta: Meta<typeof Loading> = {
  title: 'molecules/Loading',
  component: Loading,
};

export default meta;

type Story = StoryObj<typeof Loading>;

export const Default: Story = {};
