import type { Meta, StoryObj } from '@storybook/react';
import colors from '@/shared/lib/theme/colors';

const meta: Meta = {
  title: 'Design System/Colors',
};
export default meta;

type Story = StoryObj;

export const Palette: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-6 sm:grid-cols-3 md:grid-cols-4">
      {Object.entries(colors).map(([groupName, group]) => (
        <div key={groupName}>
          <h3 className="mb-2 text-sm font-semibold capitalize">{groupName}</h3>
          {typeof group === 'string' ? (
            <div className="mb-2 flex items-center gap-2">
              <div
                className="h-12 w-12 rounded-md border"
                style={{ backgroundColor: group }}
              />
              <code className="text-xs">{group}</code>
            </div>
          ) : (
            Object.entries(group).map(([key, value]) => (
              <div key={key} className="mb-2 flex items-center gap-2">
                <div
                  className="h-12 w-12 rounded-md border"
                  style={{ backgroundColor: value as string }}
                />
                <span className="text-xs">{`${groupName}-${key}`}</span>
                <code className="text-xs">{value}</code>
              </div>
            ))
          )}
        </div>
      ))}
      <div>
        <h3 className="mb-2 text-sm font-semibold">Gradient</h3>
        <div className="bg-gradient-primary h-12 w-24 rounded-md border" />
        <code className="mt-1 block text-xs">bg-gradient-primary</code>
      </div>
    </div>
  ),
};
