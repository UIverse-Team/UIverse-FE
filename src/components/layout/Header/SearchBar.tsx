import SearchIcon from '/public/search.svg?svgr'

const SearchBar = () => {
  return (
    <div className="flex items-center gap-4 py-2 pl-3.5 pr-2.5 border-2 border-primary rounded-sm">
      <input
        placeholder="오늘은 무엇을 찾으시나요?"
        className="text-secondary typo-body2 outline-none placeholder-assistive flex-grow"
      />
      <button>
        <SearchIcon className="text-primary size-8" />
      </button>
    </div>
  )
}

export default SearchBar
