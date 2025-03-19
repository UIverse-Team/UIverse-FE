import type { Meta, StoryObj } from '@storybook/react'
import RadioGroup from '@/components/common/Radio/RadioGroup'
import RadioGroupItem from '@/components/common/Radio/RadioGroupItem'

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <RadioGroupItem id="option1" value="option1" label="Option 1" />
      <RadioGroupItem id="option2" value="option2" label="Option 2" />
      <RadioGroupItem id="option3" value="option3" label="Option 3" />
    </RadioGroup>
  ),
}

export const WithSizeMd: Story = {
  render: () => (
    <RadioGroup defaultValue="md-option1">
      <RadioGroupItem id="md-option1" value="md-option1" label="md-Option 1" size="md" />
      <RadioGroupItem id="md-option2" value="md-option2" label="md-Option 2" size="md" />
      <RadioGroupItem id="md-option3" value="md-option3" label="md-Option 3" size="md" />
    </RadioGroup>
  ),
}

export const WithSizeLg: Story = {
  render: () => (
    <RadioGroup defaultValue="lg-option1">
      <RadioGroupItem id="lg-option1" value="lg-option1" label="lg-Option 1" size="lg" />
      <RadioGroupItem id="lg-option2" value="lg-option2" label="lg-Option 2" size="lg" />
      <RadioGroupItem id="lg-option3" value="lg-option3" label="lg-Option 3" size="lg" />
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="dis-option1">
      <RadioGroupItem id="dis-option1" value="dis-option1" label="dis-Option 1" />
      <RadioGroupItem id="dis-option2" value="dis-option2" label="dis-Option 2" disabled />
      <RadioGroupItem id="dis-option3" value="dis-option3" label="dis-Option 3" />
    </RadioGroup>
  ),
}

export const DisabledGroup: Story = {
  render: () => (
    <RadioGroup defaultValue="disgroup-option1" disabled>
      <RadioGroupItem id="disgroup-option1" value="disgroup-option1" label="disgroup-Option 1" />
      <RadioGroupItem id="disgroup-option2" value="disgroup-option2" label="disgroup-Option 2" />
      <RadioGroupItem id="disgroup-option3" value="disgroup-option3" label="disgroup-Option 3" />
    </RadioGroup>
  ),
}

export const WithCustomClass: Story = {
  render: () => (
    <RadioGroup defaultValue="cus-option1" className="grid-cols-2">
      <RadioGroupItem id="cus-option1" value="cus-option1" label="cus-Option 1" />
      <RadioGroupItem id="cus-option2" value="cus-option2" label="cus-Option 2" />
      <RadioGroupItem id="cus-option3" value="cus-option3" label="cus-Option 3" />
      <RadioGroupItem id="cus-option4" value="cus-option4" label="cus-Option 4" />
    </RadioGroup>
  ),
}
