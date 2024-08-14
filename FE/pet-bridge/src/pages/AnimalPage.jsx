import {Outlet, NavLink} from "react-router-dom"

// import ArticleBoardList from "../components/board/ArticleBoardList"

const categories = [
  {id: 0, title: "보호소 동물"},
  {id: 1, title: "임시 보호 동물"},
]

const BoardNavbar = () => {
  return (
    <nav className="my-2 flex h-12 items-center">
      {categories.map((category) => (
        <NavLink
          key={category.id}
          to={`/shelter/${category.id}`}
          className={({isActive}) =>
            `flex h-12 items-center px-2.5 text-xl ${isActive ? "border-mild border-b-4 font-bold" : "border-b-2"}`
          }
        >
          {category.title}
        </NavLink>
      ))}
    </nav>
  )
}

const AnimalPage = () => {
  // const [selectedCategory, setSelectedCategory] = useState(categories[0].id)

  return (
    <div className="mb-10 flex min-h-screen w-[400px] max-w-[1000px] flex-col space-y-3 sm:w-11/12 sm:min-w-[900px] ">
      <BoardNavbar />

      <Outlet className="" />
    </div>
  )
}

export default AnimalPage
