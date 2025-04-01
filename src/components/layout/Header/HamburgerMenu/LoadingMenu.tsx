const HamburgerLoadingMenu = () => {
  return (
    <div className="absolute left-0 top-full w-56">
      <ul className={`bg-white w-56 py-5 z-10 relative rounded-b-lg`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <li key={i} className="px-3">
            <div className="flex items-center justify-between py-2 pl-5 pr-2">
              <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="size-3 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HamburgerLoadingMenu
