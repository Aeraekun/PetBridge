import {useNavigate, Outlet} from "react-router-dom"

// import ArticleBoardList from "../components/board/ArticleBoardList"

const categories = [
  {id: 0, title: "보호소 동물"},
  {id: 1, title: "임시 보호 동물"},
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
// }variables

const BoardNavbar = () => {
  const navigate = useNavigate()
  const handleNavigation = (bcode) => {
    if (bcode === 0) {
      navigate(`/shelter/0`)
    }
    if (bcode === 1) {
      navigate(`/shelter/1`)
    }
  }
  return (
    <ul className="flex h-12 items-center  ">
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

const AnimalPage = () => {
  // const [selectedCategory, setSelectedCategory] = useState(categories[0].id)

  return (
    <div className="my-10 flex min-h-screen w-[400px] max-w-[1000px] flex-col space-y-3 sm:w-11/12 ">
      <BoardNavbar />
      <hr className="" />

      <Outlet className="" />
    </div>
  )
}

export default AnimalPage
