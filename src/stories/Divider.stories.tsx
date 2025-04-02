import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Divider from '../components/common/Divider/Divider'

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    weight: {
      description: '가로선의 진함 정도',
    },
  },
}

export default meta
type Story = StoryObj<typeof Divider>

// 모든 크기
export const AllWeight: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-100">
      <Divider weight="xs" />
      <Divider weight="sm" />
      <Divider weight="md" />
      <Divider weight="lg" />
    </div>
  ),
}
