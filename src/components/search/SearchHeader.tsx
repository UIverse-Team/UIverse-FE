const SearchHeader = ({ keyword }: { keyword: string }) => (
  <div className="w-full bg-white rounded-lg">
    <div className="flex p-6 items-center gap-2 typo-h3">
      &apos;{keyword}&apos; <span className="typo-button1 text-assistive">검색결과</span>
    </div>
  </div>
)

export default SearchHeader
