import {useNavigate, Outlet} from "react-router-dom"

// import ArticleBoardList from "../components/board/ArticleBoardList"

const categories = [
  {id: 0, title: "홈"},
  {id: 1, title: "입양홍보"},
  {id: 2, title: "입양후기"},
  {id: 3, title: "자유게시판"},
  {id: 4, title: "공지사항"},
]

// const NavItem = ({category, href}) => {
//   return (
//     <li className="flex h-12 cursor-pointer items-center px-2.5 text-xl">
//       <Link to={href}>{category}</Link>
//     </li>
//   )
// }

// const NavItemList = () => {
//   return (
//     <ul className="flex h-12 items-center">
//       <NavLogo />
//       <NavItem category={"입양홍보"} href={"/adoption-promotion"} />
//       <NavItem category={"입양후기"} href={"/adoption-reviews"} />
//       <NavItem category={"자유게시판"} href={"/freeboard"} />
//       <NavItem category={"공지사항"} href={"/noticeboard"} />
//     </ul>
//   )
// }

const BoardNavbar = () => {
  const navigate = useNavigate()
  const handleNavigation = (bcode) => {
    let path = bcode === 0 ? `/communities` : `/communities/${bcode}`
    navigate(path)
  }
  return (
    <ul className="flex h-12 items-center ">
      {categories.map((category) => (
        <li key={category.id} className="flex h-12 items-center px-2.5 text-xl">
          <button
            onClick={() => handleNavigation(category.id)}
            className="flex h-12 items-center px-2.5 text-xl"
          >
            <div className="cursor-pointer"> </div>
            {category.title}
          </button>
        </li>
      ))}
    </ul>
  )
}

const BoardPage = () => {
  // const [selectedCategory, setSelectedCategory] = useState(categories[0].id)

  return (
    <div className="my-10 flex min-h-screen w-[400px] max-w-[1000px] flex-col space-y-3 sm:w-11/12">
      <BoardNavbar />
      <hr className="" />

      <Outlet />
    </div>
  )
}

export default BoardPage
