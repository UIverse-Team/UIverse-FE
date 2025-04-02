import { ReactElement, useState } from 'react'

interface Step {
  mainTitle: string
  subTitle?: string
  element: (props: { next: () => void }) => ReactElement
}

export const useMultiStepForm = (steps: Step[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const next = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1)
    }
  }

  return {
    currentMainTitle: steps[currentStepIndex].mainTitle,
    currentSubTitle: steps[currentStepIndex].subTitle,
    currentStep: steps[currentStepIndex].element({
      next,
    }),
    isLastStep: currentStepIndex === steps.length - 1,
  }
}
