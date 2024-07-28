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

const ArticleBoardList = () => {
  const {bcode} = useParams()
  const matchingCategory = categories.find(
    (category) => category.id === Number(bcode)
  )

  return (
    <>
      {matchingCategory ? (
        <h2>{matchingCategory.title}</h2>
      ) : (
        <p>Category not found</p>
      )}

      <ul className="flex-auto overflow-auto ">
        {data.map((data, index) => (
          <li key={index}>
            <ArticleItem data={data} />
          </li>
        ))}
      </ul>
    </>
  )
}
export default ArticleBoardList
