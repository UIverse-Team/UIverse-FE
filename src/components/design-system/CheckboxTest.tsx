import Checkbox from '../common/Checkbox/Checkbox'

const CheckboxTest = () => {
  return (
    <div className="flex items-center gap-4">
      <Checkbox id="check1" variant="primary" size="lg" label="동의합니다" labelPosition="right" />
      <Checkbox id="check2" variant="primary" size="md" label="동의합니다" labelPosition="right" />
      <Checkbox
        id="check3"
        variant="secondary"
        size="lg"
        label="동의합니다"
        labelPosition="right"
      />
      <Checkbox
        id="check4"
        variant="secondary"
        size="md"
        label="동의합니다"
        labelPosition="right"
      />
      <Checkbox id="check5" variant="primary" size="lg" label="동의합니다" labelPosition="left" />
      <Checkbox id="check6" variant="primary" size="md" label="동의합니다" labelPosition="left" />
      <Checkbox id="check7" variant="secondary" size="lg" label="동의합니다" labelPosition="left" />
      <Checkbox id="check8" variant="secondary" size="md" label="동의합니다" labelPosition="left" />
      <Checkbox id="check9" size="lg" label="Disabled" disabled />
      <Checkbox id="check9" size="md" label="Disabled" disabled />
    </div>
  )
}

export default CheckboxTest
