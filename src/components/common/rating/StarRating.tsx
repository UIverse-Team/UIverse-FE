'use client'

import Star from '/public/icons/star.svg?svgr'

interface StarRatingProps {
  rating: number
  size: string
  showRatingValue: boolean
  filedColor: string
  textColor: string
  length: number
}

export const StarRating = ({
  rating,
  size = 'md',
  showRatingValue = true,
  filedColor,
  textColor,
  length = 5,
}: StarRatingProps) => {
  const roundedRating = Math.round(rating * 2) / 2

  const sizeClasses: Record<string, string> = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }

  const filledStarColor = filedColor

  const renderStars = () => {
    const stars = []

    for (let i = 1; i <= length; i++) {
      if (i <= Math.floor(roundedRating)) {
        // 꽉 찬 별
        stars.push(
          <Star key={i} className={`${sizeClasses[size]} ${filledStarColor}  ${textColor}`} />,
        )
      } else if (i - 0.5 === roundedRating) {
        // 반 별 (CSS로 반만 보이게 처리)
        stars.push(
          <div key={i} className="relative">
            {/* 배경으로 빈 별 */}
            <Star className={`${sizeClasses[size]} fill-gray-100 text-gray-75`} />
            {/* 반쪽만 보이는 채워진 별 */}
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <Star className={`${sizeClasses[size]} ${filledStarColor} ${textColor} `} />
            </div>
          </div>,
        )
      } else {
        // 빈 별
        stars.push(<Star key={i} className={`${sizeClasses[size]} ${textColor}`} />)
      }
    }

    return stars
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex">{renderStars()}</div>
      {showRatingValue && <span className="ml-2 font-medium "></span>}
    </div>
  )
}
