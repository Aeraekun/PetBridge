import data from "./animaldata"
import AnimalItem from "./AnimalItem"

import {useParams} from "react-router-dom"

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
        className="border-2 border-stroke p-2 w-72 rounded-xl h-12"
      />
      <button className="flex w-16 bg-green-600 justify-center items-center rounded-xl h-10 text-white ">
        조회
      </button>
    </div>
  )
}

const AnimalBoardList = () => {
  const {bcode} = useParams()
  const matchingCategory = categories.find(
    (category) => category.id === Number(bcode)
  )

  return (
    <>
      <Search />
      {matchingCategory ? <h2>{matchingCategory.title}</h2> : <p>보호소동물</p>}
      <ul className="flex flex-wrap justify-between w-full">
        {data
          // category와 bcode가 일치하는것만 필터링
          .filter((animal) => {
            return animal.category === Number(bcode)
          })
          .map((data, index) => (
            <li key={index}>
              <AnimalItem data={data} />
            </li>
          ))}
      </ul>
    </>
  )
}
export default AnimalBoardList
