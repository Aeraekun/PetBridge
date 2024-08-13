// import {useNavigate, Outlet, NavLink} from "react-router-dom"
import {Outlet, NavLink, useLocation} from "react-router-dom"

// import ArticleBoardList from "../components/board/ArticleBoardList"

const categories = [
  {id: 0, title: "홈"},
  {id: 1, title: "입양홍보"},
  {id: 2, title: "입양후기"},
  {id: 3, title: "자유게시판"},
  {id: 4, title: "공지사항"},
]

const BoardNavbar = () => {
  const location = useLocation()

  return (
    <nav className="my-2 flex h-12 items-center">
      {categories.map((category) => (
        <NavLink
          key={category.id}
          to={
            category.id === 0 ? "/communities" : `/communities/${category.id}`
          }
          isActive={() => {
            if (category.id === 0) {
              return location.pathname === "/communities"
            }
            return location.pathname === `/communities/${category.id}`
          }}
          className={({isActive}) =>
            `flex h-12 items-center px-2.5 text-xl ${
              (isActive &&
                category.id === 0 &&
                location.pathname === "/communities") ||
              (isActive &&
                category.id !== 0 &&
                location.pathname === `/communities/${category.id}`)
                ? "border-b-4 border-mild font-bold"
                : "border-b-2"
            }`
          }
        >
          {category.title}
        </NavLink>
      ))}
    </nav>
  )
}

const BoardPage = () => {
  // const [selectedCategory, setSelectedCategory] = useState(categories[0].id)

  return (
    <div className="mb-10 flex min-h-screen w-[400px] max-w-[1000px] flex-col space-y-3 sm:w-11/12 sm:min-w-[900px]">
      <BoardNavbar />

      <Outlet />
    </div>
  )
}

export default BoardPage
