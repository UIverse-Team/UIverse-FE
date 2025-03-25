import { KeywordType } from '@/hooks/useSearch'
import SearchIcon from '/public/icons/search.svg?svgr'

interface SuggestionsListProps {
  suggestions: KeywordType[]
  onSelect: (term: string) => void
}

const SuggestionsList = ({ suggestions, onSelect }: SuggestionsListProps) => {
  return (
    <ul className="p-2">
      {suggestions.map((suggestion, index) => (
        <li
          key={`suggestion-${index}-${suggestion}`}
          className="py-2 px-2 hover:bg-neutral rounded cursor-pointer"
        >
          <button
            onClick={() => onSelect(suggestion)}
            className="flex items-center w-full"
            type="button"
          >
            <SearchIcon className="size-5 mr-2 text-assistive" />
            <span className="typo-body2">{suggestion}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default SuggestionsList
