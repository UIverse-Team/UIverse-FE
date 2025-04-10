import { HelperLabel } from '@/components/common/HelperLabel/HelperLabel'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof HelperLabel> = {
  title: 'Components/HelperLabel',
  component: HelperLabel,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'error', 'success'],
    },
    children: {
      control: 'text',
    },
  },
}
export default meta

type Story = StoryObj<typeof HelperLabel>

export const Default: Story = {
  args: {
    variant: 'default',
    children: '이 필드는 선택 사항입니다.',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    children: '유효하지 않은 이메일 형식입니다.',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: '사용 가능한 이름입니다.',
  },
}
