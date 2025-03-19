'use client'
// import Button from '../Button/Button'
import { useState } from 'react'
import Add from '/public/Add.svg'
import Minus from '/public/Minus.svg'
import IconButton from '../Button/IconButton'

export const NumbericFiled = () => {
  const [productNum, setProductNum] = useState(1)

  const increase = () => setProductNum((prev) => prev + 1)
  const decrease = () => setProductNum((prev) => Math.max(1, prev - 1))
  return (
    <div className="flex items-center border-assist-line bg-white border-2 rounded-[4px] p-2">
      <IconButton onClick={decrease} className="bg-gray-50 rounded-[2px] p-[9px]">
        <Minus className="w-3 h-3 text-center flex" />
      </IconButton>
      <span className="typo-body3 px-5">{productNum}</span>
      <IconButton onClick={increase} className="bg-gray-50  p-[9px] rounded-[2px]">
        <Add className="w-3 h-3 text-center flex" />
      </IconButton>
    </div>
  )
}
