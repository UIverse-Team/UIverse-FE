import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '../components/common/Input/Input'
import { fn } from '@storybook/test'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'disabled', 'auth', 'authDisabled', 'authError'],
      description: 'Input 스타일',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    type: {
      control: 'select',
      options: ['text', 'password'],
      description: 'Input 타입',
      table: {
        defaultValue: { summary: 'text' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    error: {
      control: 'boolean',
      description: '에러 상태 여부',
    },
    placeholder: {
      control: 'text',
      description: 'placeholder 텍스트',
    },
    showTimer: {
      control: 'boolean',
      description: '타이머 표시 여부',
    },
    duration: {
      control: 'number',
      description: '타이머 지속 시간 (초)',
    },
    onTimerExpired: {
      control: false,
    },
  },
  args: {
    placeholder: '입력해주세요',
    onChange: fn(() => {}),
  },
}

export default meta
type Story = StoryObj<typeof Input>

// 기본 인풋
export const Default: Story = {
  args: {
    variant: 'default',
    type: 'text',
  },
}

// 에러 상태
export const Error: Story = {
  args: {
    variant: 'error',
    error: true,
    type: 'text',
  },
}

// 비활성화 상태
export const Disabled: Story = {
  args: {
    variant: 'disabled',
    disabled: true,
    type: 'text',
  },
}

// 비밀번호 입력 필드
export const Password: Story = {
  args: {
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
  },
}

// 인증 입력 스타일
export const Auth: Story = {
  args: {
    variant: 'auth',
    type: 'text',
    placeholder: '인증 코드를 입력하세요',
  },
}

// 인증 + 에러
export const AuthError: Story = {
  args: {
    variant: 'auth',
    error: true,
    placeholder: '인증 실패',
  },
}

// 타이머 기능 포함
export const WithTimer: Story = {
  args: {
    variant: 'auth',
    showTimer: true,
    duration: 300,
    onTimerExpired: fn(() => {}),
  },
}
