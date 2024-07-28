import data from "./articledata"
import ArticleItem from "./ArticleItem"

import {useParams} from "react-router-dom"

const categories = [
  {id: 0, title: "홈"},
  {id: 1, title: "입양홍보"},
  {id: 2, title: "입양후기"},
  {id: 3, title: "자유게시판"},
  {id: 4, title: "공지사항"},
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

const ArticleBoardList = () => {
  const {bcode} = useParams()
  const matchingCategory = categories.find(
    (category) => category.id === Number(bcode)
  )

  return (
    <>
      <Search />
      {matchingCategory ? <h2>{matchingCategory.title}</h2> : <p>홈</p>}

      <ul className="flex flex-wrap justify-between w-full">
        {data
          //bcode가 없는경우 (홈) 일때는 모두 보여줌
          // category와 bcode가 일치하는것만 필터링
          .filter((article) => {
            if (bcode === undefined || bcode === "0") {
              return true
            }
            return article.category === Number(bcode)
          })
          .map((data, index) => (
            <li key={index}>
              <ArticleItem data={data} />
            </li>
          ))}
      </ul>
    </>
  )
}
export default ArticleBoardList
