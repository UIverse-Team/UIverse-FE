import type { Meta, StoryObj } from '@storybook/react'

import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'Breadcrumb items',
      control: 'object',
    },
    showHomeIcon: {
      description: 'Show home icon',
      control: 'boolean',
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
  args: {
    items: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Settings', href: '/dashboard/settings' },
      { label: 'Profile' },
    ],
  },
}
