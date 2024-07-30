import data from "./articledata"
import ArticleItem from "./ArticleItem"
import Button from "components/common/Button"
import {useNavigate, useParams} from "react-router-dom"

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
        className="border-stroke h-12 w-72 rounded-xl border-2 p-2"
      />
      <button className="flex h-10 w-16 items-center justify-center rounded-xl bg-green-600 text-white ">
        조회
      </button>
    </div>
  )
}

const ArticleBoardList = () => {
  const {bcode} = useParams()
  const navigate = useNavigate()
  const goDetail = (article) => {
    const id = article.id
    let path = `/communities/details/${id}`
    navigate(path)
  }
  const matchingCategory = categories.find(
    (category) => category.id === Number(bcode)
  )
  const goWrite = () => {
    let path = `/communities/write`
    navigate(path)
  }

  return (
    <>
      <Search />
      {matchingCategory ? <h2>{matchingCategory.title}</h2> : <p>홈</p>}
      <Button text={"글쓰기"} onClick={goWrite} />
      <ul className="flex w-full flex-wrap justify-between">
        {data
          //bcode가 없는경우 (홈) 일때는 모두 보여줌
          // category와 bcode가 일치하는것만 필터링
          .filter((article) => {
            if (bcode === undefined || bcode === "0") {
              return true
            }
            return article.category === Number(bcode)
          })
          .map((article) => (
            <li key={article.id}>
              <ArticleItem data={article} onSelectArticle={goDetail} />
            </li>
          ))}
      </ul>
    </>
  )
}
export default ArticleBoardList
