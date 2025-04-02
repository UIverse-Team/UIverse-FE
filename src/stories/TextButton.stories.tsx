import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import TextButton from '../components/common/Button/TextButton'

const meta: Meta<typeof TextButton> = {
  title: 'Components/TextButton',
  component: TextButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: '버튼 크기',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: '아이콘 사용 시 아이콘의 위치',
    },
    asChild: {
      control: false,
    },
    children: {
      control: 'text',
      description: '버튼 내용',
    },
  },
  args: { onClick: fn(() => alert('버튼이 클릭되었습니다.')) },
}

export default meta
type Story = StoryObj<typeof TextButton>

// 기본 story
export const Default: Story = {
  args: {
    children: '버튼입니다',
    size: 'md',
  },
}

// 모든 크기
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <TextButton size="xs">xSmall 버튼</TextButton>
      <TextButton size="sm">Small 버튼</TextButton>
      <TextButton size="md">Medium 버튼</TextButton>
      <TextButton size="lg">Large 버튼</TextButton>
      <TextButton size="xl">xLarge 버튼</TextButton>
    </div>
  ),
}

// 모든 아이콘 방향
export const AllIconPositions: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <TextButton iconPosition="left">아이콘 왼쪽 버튼</TextButton>
      <TextButton>텍스트 버튼</TextButton>
      <TextButton iconPosition="right">아이콘 오른쪽 버튼</TextButton>
    </div>
  ),
}
