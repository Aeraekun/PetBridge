import {useNavigate, Routes, Route} from "react-router-dom"

import Kakao from "components/map/Kakao"

const categories = [
  {id: 0, title: "실종동물지도", path: "/lost-and-found"},
  {id: 1, title: "실종동물 제보하기", path: "/lost-and-found/report"},
]

const CategoryNavbar = () => {
  const navigate = useNavigate()
  const handleNavigation = (path) => {
    navigate(path)
  }

  return (
    <ul className="flex h-12 items-center justify-start space-x-6 text-xl">
      {categories.map((category) => (
        <li key={category.id} className="flex h-12 items-center">
          <button
            onClick={() => handleNavigation(category.path)}
            className="flex h-12 items-center px-2.5 text-xl hover:text-blue-500"
          >
            {category.title}
          </button>
        </li>
      ))}
    </ul>
  )
}

const LostAndFoundPage = () => {
  return (
    <>
      <div className="mt-10 flex w-[1000px] flex-col">
        <CategoryNavbar /> {/* 카테고리 네비게이션 추가 */}
      </div>
      <div className="flex w-full flex-col items-center space-y-3">
        <hr className="w-full max-w-[1000px] border-gray-300" />
        <section className="flex w-full max-w-[1000px] justify-center">
          <Routes>
            <Route path="/" element={<Kakao />} />
          </Routes>
        </section>
      </div>
    </>
  )
}

export default LostAndFoundPage
