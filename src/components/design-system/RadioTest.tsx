import React from 'react'
import RadioGroup from '../common/Radio/RadioGroup'
import RadioGroupItem from '../common/Radio/RadioGroupItem'

const RadioTest = () => {
  return (
    <div>
      <RadioGroup defaultValue="default-md">
        <RadioGroupItem size="md" value="default-md" id="r1" label="Default-md" />
        <RadioGroupItem size="lg" value="default-lg" id="r2" label="Default-lg" />
        <RadioGroupItem size="md" value="disabled-md" id="r3" label="Disabled-md" disabled />
        <RadioGroupItem size="lg" value="disabled-lg" id="r4" label="Disabled-lg" disabled />
      </RadioGroup>
    </div>
  )
}

export default RadioTest
