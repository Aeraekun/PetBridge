import {useLocation, Outlet, NavLink} from "react-router-dom"

const categories = [
  {id: 0, title: "실종동물지도", path: "/lost-and-found"},
  {id: 1, title: "실종동물 제보하기", path: "/lost-and-found/report"},
]

const CategoryNavbar = () => {
  const location = useLocation()
  return (
    <nav className="my-2 flex h-12 items-center">
      {categories.map((category) => (
        <NavLink
          key={category.id}
          className={({isActive}) =>
            `flex h-12 items-center px-2.5 text-xl ${
              (isActive &&
                category.id === 0 &&
                location.pathname === "/lost-and-found") ||
              (isActive &&
                category.id !== 0 &&
                location.pathname === `/lost-and-found/report`)
                ? "border-b-4 border-mild font-bold"
                : "border-b-2"
            }`
          }
          to={category.path}
          isActive={() => {
            return location.pathname === category.path
          }}
        >
          {category.title}
        </NavLink>
      ))}
    </nav>
  )
}

const LostAndFoundPage = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="w-[1000px]">
        {/* 1000px 고정 너비 설정 */}
        <CategoryNavbar /> {/* 카테고리 네비게이션 추가 */}
        <div className="flex flex-col items-center space-y-3">
          <section className="flex w-full justify-center">
            <Outlet />
          </section>
        </div>
      </div>
    </div>
  )
}

export default LostAndFoundPage
