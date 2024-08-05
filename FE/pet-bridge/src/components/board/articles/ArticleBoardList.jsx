import ArticleItem from "./ArticleItem"
import Button from "components/common/Button"
import {useNavigate, useParams} from "react-router-dom"
import {getArticle} from "api/boards-api"
import React, {useEffect, useState} from "react"
const categories = [
  {id: 0, name: "home", title: "홈"},
  {id: 1, name: "promotion", title: "입양홍보"},
  {id: 2, name: "review", title: "입양후기"},
  {id: 3, name: "free", title: "자유게시판"},
  {id: 4, name: "notice", title: "공지사항"},
]

const Search = ({searchKeyword}) => {
  const [inputKeyword, setInputKeyword] = useState("")

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault() // 기본 동작 방지
      searchKeyword(inputKeyword)
    }
  }

  const handleButtonClick = () => {
    searchKeyword(inputKeyword)
  }

  return (
    <div className="flex w-full justify-between px-10">
      <input
        type="text"
        placeholder="검색어를 입력하세요."
        value={inputKeyword}
        className="border-stroke h-12 w-72 rounded-xl border-2 p-2"
        onKeyDown={handleKeyDown}
        onChange={(e) => setInputKeyword(e.target.value)}
      />
      <button
        className="flex h-10 w-16 items-center justify-center rounded-xl bg-green-600 text-white"
        onClick={handleButtonClick}
      >
        검색
      </button>
    </div>
  )
}

const ArticleBoardList = () => {
  const {bcode} = useParams()
  const navigate = useNavigate()

  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getArticle()
      setArticles(data)
    }

    fetchArticles()
  }, []) // 빈 배열을 두 번째 인자로 전달하여 마운트 시 한 번만 실행

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
        {articles
          //bcode가 없는경우 (홈) 일때는 모두 보여줌
          // category와 bcode가 일치하는것만 필터링
          .filter((article) => {
            if (bcode === undefined || bcode === "home") {
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
