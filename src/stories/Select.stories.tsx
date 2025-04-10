import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/common/Select/Select'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
      description: '기본 선택 값',
    },
    disabled: {
      control: 'boolean',
    },
  },
}
export default meta

type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    defaultValue: 'option1',
  },
  render: (args) => (
    <Select defaultValue={args.defaultValue}>
      <SelectTrigger size="md">
        <SelectValue placeholder="선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">옵션 1</SelectItem>
        <SelectItem value="option2">옵션 2</SelectItem>
        <SelectItem value="option3">옵션 3</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const LargeSize: Story = {
  args: {
    defaultValue: '',
  },
  render: () => (
    <Select>
      <SelectTrigger size="lg">
        <SelectValue placeholder="사이즈: large" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="lg1">Large 1</SelectItem>
        <SelectItem value="lg2">Large 2</SelectItem>
        <SelectItem value="lg3">Large 3</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Select disabled defaultValue="option1">
      <SelectTrigger size="md">
        <SelectValue placeholder="비활성화됨" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">비활성 옵션 1</SelectItem>
        <SelectItem value="option2">비활성 옵션 2</SelectItem>
      </SelectContent>
    </Select>
  ),
}
