import type { Meta } from '@storybook/react'
import { PaginationDemo } from './Pagination'

const meta = {
  title: 'Components/Pagination',
  component: PaginationDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PaginationDemo>

export default meta
