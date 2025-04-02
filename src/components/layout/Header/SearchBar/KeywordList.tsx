import React from 'react'
import Chip from '@/components/common/Chip/Chip'
import { KeywordType } from '@/hooks/useSearch'

interface KeywordsListProps {
  title: string
  icon: React.ReactNode
  keywords: KeywordType[]
  onSelect: (term: string) => void
  variant?: 'primary' | 'secondary'
  subtitle?: string
}

const KeywordsList = ({
  title,
  icon,
  keywords,
  onSelect,
  variant = 'primary',
  subtitle,
}: KeywordsListProps) => {
  return (
    <div className="space-y-3 py-2">
      <span className="flex items-center gap-2">
        <span
          className={`flex items-center gap-1 typo-button2 ${variant === 'primary' ? 'text-primary' : 'text-alternative'}`}
        >
          {icon}
          {title}
        </span>
        {subtitle && <span className="typo-caption1 text-assistive">{subtitle}</span>}
      </span>
      <ul className="flex flex-wrap gap-2 py-2">
        {keywords.map((keyword, idx) => (
          <li key={`${title}-${idx}-${keyword}`}>
            <Chip
              variant={variant === 'primary' ? 'primary' : 'secondary'}
              onClick={() => onSelect(keyword)}
            >
              {keyword}
            </Chip>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default KeywordsList
