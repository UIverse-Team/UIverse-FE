import React from 'react'
import Button from '../common/Button/Button'
import TextButton from '../common/Button/TextButton'

const ButtonTest = () => {
  const defaultButtonVars = ['primary', 'secondary', 'tertiary', 'outline']
  const defaultButtonSizes = ['lg', 'md', 'sm']

  const textButtonSizes = ['xl', 'lg', 'md', 'sm', 'xs']

  return (
    <section className="space-y-8">
      <h2 className="typo-h2 mb-4">기본 버튼</h2>
      {defaultButtonVars.map((variant, index) => (
        <div key={variant} className="space-y-2">
          <p className="typo-h3">{variant}</p>
          <div className="grid grid-cols-6 gap-2 items-start" key={index}>
            {defaultButtonSizes.map((s) => (
              <>
                <Button variant={variant} size={s}>
                  버튼입니다
                </Button>
                <Button variant={variant} size={s} disabled>
                  버튼입니다
                </Button>
              </>
            ))}
          </div>
        </div>
      ))}

      <h2 className="typo-h2 mb-4">텍스트 버튼</h2>
      {textButtonSizes.map((size) => (
        <div key={size} className="space-y-2">
          <p className="typo-h3">{size}</p>
          <div className="flex gap-10 justify-start">
            <TextButton size={size}>텍스트버튼(아이콘x)</TextButton>
            <TextButton size={size} iconPosition="left">
              텍스트버튼(좌측아이콘)
            </TextButton>
            <TextButton size={size} iconPosition="right">
              텍스트버튼(우측아이콘)
            </TextButton>
          </div>
        </div>
      ))}
    </section>
  )
}

export default ButtonTest
