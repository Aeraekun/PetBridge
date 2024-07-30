import data from "./animaldata"
import AnimalItem from "./AnimalItem"
import Button from "components/common/Button"

import {useNavigate, useParams} from "react-router-dom"

const categories = [
  {id: 0, title: "보호소 동물"},
  {id: 1, title: "임시 보호 동물"},
]

const Search = () => {
  return (
    <div className="flex w-full justify-between px-10">
      <input
        type="text"
        placeholder="검색어를 입력하세요."
        className="border-stroke h-12 w-72 rounded-xl border-2 p-2"
      />
      <button className="flex h-10 w-16 items-center justify-center rounded-xl bg-green-600 text-white ">
        조회
      </button>
    </div>
  )
}

const AnimalBoardList = () => {
  const {bcode} = useParams()
  const navigate = useNavigate()
  const matchingCategory = categories.find(
    (category) => category.id === Number(bcode)
  )
  const goRegist = () => {
    let path = `/shelter/regist`
    navigate(path)
  }
  const goDetail = (animal) => {
    const id = animal.user_id
    let path = `/shelter/details/${id}`
    navigate(path)
  }
  return (
    <>
      <Search />
      <Button text={"등록하기"} onClick={goRegist} />
      {matchingCategory ? <h2>{matchingCategory.title}</h2> : <p>보호소동물</p>}
      <ul className="flex w-full flex-wrap justify-between">
        {data
          // category와 bcode가 일치하는것만 필터링
          .filter((animal) => {
            return animal.category === Number(bcode)
          })
          .map((data, index) => (
            <li key={index}>
              <AnimalItem data={data} onSelectArticle={goDetail} />
            </li>
          ))}
      </ul>
    </>
  )
}
export default AnimalBoardList
