import type { Meta, StoryObj } from '@storybook/react'
import Checkbox from '../components/common/Checkbox/Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
      description: '체크박스의 비주얼 스타일',
      table: {
        defaultValue: { summary: 'secondary' },
      },
    },
    size: {
      control: 'radio',
      options: ['md', 'lg'],
      description: '체크박스 크기',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    label: {
      control: 'text',
      description: '체크박스 Label의 내용',
    },
    labelPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Label 사용 시 Label의 위치',
    },
    disabled: {
      control: 'boolean',
      description: '체크박스 disabled 여부',
    },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

// 기본 story
export const Default: Story = {
  args: {
    id: 'default',
    label: '버튼입니다',
  },
}

// 모든 스타일
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Checkbox id="primary" variant="primary" label="primary" />
      <Checkbox id="secondary" variant="secondary" label="secondary" />
      <Checkbox id="disabled" disabled label="disabled" />
    </div>
  ),
}

// 모든 크기
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Checkbox id="md" size="md" label="md 체크박스" />
      <Checkbox id="lg" size="lg" label="lg 체크박스" />
    </div>
  ),
}

// 모든 아이콘 방향
export const AllLabelPositions: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Checkbox id="left" labelPosition="left" label="왼쪽 텍스트" />
      <Checkbox id="right" labelPosition="right" label="오른쪽 텍스트" />
    </div>
  ),
}
