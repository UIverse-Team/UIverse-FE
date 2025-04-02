import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface BrandProfile {
  id: number
  name: string
  image: string
}

const BrandProfile = ({ brand }: { brand: BrandProfile }) => {
  return (
    <Link href={`brand/${brand.id}`}>
      <div className="flex flex-col gap-2 w-24 h-[110px] items-center">
        <div className="w-20 h-20 rounded-full border border-assist-line">
          <Image
            src={brand.image}
            alt="브랜드 이미지"
            className="rounded-full w-full h-full object-cover"
            width={180}
            height={180}
          />
        </div>
        <div className="typo-body3">{brand.name}</div>
      </div>
    </Link>
  )
}

export default BrandProfile
