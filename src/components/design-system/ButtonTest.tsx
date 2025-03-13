import React from 'react'
import { Button } from '../common/button/Button'

const ButtonTest = () => {
  const variants = ['primary', 'secondary', 'tertiary', 'outline']
  const sizes = ['lg', 'md', 'sm']
  return (
    <section className="space-y-8">
      <h2 className="typo-h2 mb-4">기본 버튼</h2>
      {variants.map((variant) => (
        <div key={variant} className="space-y-2">
          <p className="typo-h3">{variant}</p>
          <div className="grid grid-cols-6 gap-2 items-start">
            {sizes.map((s) => (
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
    </section>
  )
}

export default ButtonTest
