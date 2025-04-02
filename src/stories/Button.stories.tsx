import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import Button from '../components/common/Button/Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'outline'],
      description: '버튼의 비주얼 스타일',
      table: {
        defaultValue: { summary: 'secondary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '버튼 크기',
      table: {
        defaultValue: { summary: 'lg' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '버튼 disabled 여부',
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
type Story = StoryObj<typeof Button>

// 기본 story
export const Default: Story = {
  args: {
    children: '버튼입니다',
    variant: 'secondary',
    size: 'lg',
  },
}

// Variant 스토리
export const Primary: Story = {
  args: {
    children: '버튼입니다',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: '버튼입니다',
    variant: 'secondary',
  },
}

export const Tertiary: Story = {
  args: {
    children: '버튼입니다',
    variant: 'tertiary',
  },
}

export const Outline: Story = {
  args: {
    children: '버튼입니다',
    variant: 'outline',
  },
}

// Size 스토리
export const Small: Story = {
  args: {
    children: '버튼입니다',
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    children: '버튼입니다',
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    children: '버튼입니다',
    size: 'lg',
  },
}

// disabled 상태
export const Disabled: Story = {
  args: {
    children: '버튼입니다',
    disabled: true,
  },
}

// 모든 스타일
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Button variant="primary">Primary 버튼</Button>
      <Button variant="secondary">Secondary 버튼</Button>
      <Button variant="tertiary">Tertiary 버튼</Button>
      <Button variant="outline">Outline 버튼</Button>
    </div>
  ),
}

// 모든 크기
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Button size="sm">Small 버튼</Button>
      <Button size="md">Medium 버튼</Button>
      <Button size="lg">Large 버튼</Button>
    </div>
  ),
}

// 모든 상태
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Button>기본 버튼</Button>
      <Button disabled>비활성화 버튼</Button>
    </div>
  ),
}
