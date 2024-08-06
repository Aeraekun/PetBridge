import ArticleItem from "./ArticleItem"
import Button from "components/common/Button"
import {useNavigate, useParams} from "react-router-dom"
import {getArticle} from "api/boards-api"
import React, {useEffect, useState} from "react"

const categories = [
  {id: 0, name: "HOME", title: "홈"},
  {id: 1, name: "PROMOTION", title: "입양홍보"},
  {id: 2, name: "REVIEW", title: "입양후기"},
  {id: 3, name: "FREE", title: "자유게시판"},
  {id: 4, name: "NOTICE", title: "공지사항"},
]

// 페이지 네이션 컴포넌트
const Pagination = ({currentPage, totalPages, onPageChange}) => {
  const pages = []
  for (let i = 0; i < totalPages; i++) {
    pages.push(i)
  }

  return (
    <div className="mt-4 flex justify-center">
      {pages.map((page) => (
        <button
          key={page + 1}
          className={`mx-1 rounded border px-3 py-1 ${currentPage === page ? "bg-green-600 text-white" : "bg-white text-black"}`}
          onClick={() => onPageChange(page)}
        >
          {page + 1}
        </button>
      ))}
    </div>
  )
}

const Search = ({searchform}) => {
  const [inputKeyword, setInputKeyword] = useState("")
  const [type, setType] = useState("")

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSearch()
    }
  }

  const handleButtonClick = () => {
    handleSearch()
  }

  const handleSearch = () => {
    let params = {}
    if (type === "") {
      params = {title: inputKeyword, usernickname: inputKeyword}
    } else {
      params[type] = inputKeyword
    }
    console.log(params, "params")
    searchform(params) // 새로운 검색 조건을 부모로 전달
  }

  return (
    <div className="flex w-full justify-between px-10">
      <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">전체</option>
        <option value="title">제목</option>
        <option value="usernickname">닉네임</option>
      </select>
      <input
        type="text"
        placeholder="검색어를 입력하세요."
        value={inputKeyword}
        className="h-12 w-72 rounded-xl border-2 border-stroke p-2"
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
  const [currentPage, setCurrentPage] = useState(0)
  const [totalSize, setTotalSize] = useState(20) // 총 페이지 수를 20으로 설정
  const [pageSize] = useState(12) // 페이지당 항목 수
  const [searchParams, setSearchParams] = useState({})

  const fetchArticles = async (params) => {
    console.log(params)
    try {
      const data = await getArticle(params)
      let total = 20
      console.log(data)
      setArticles(data)
      setTotalSize(total) // 총 항목 수 업데이트
    } catch (error) {
      console.error("게시글 가져오기 오류:", error)
    }
  }

  useEffect(() => {
    fetchArticles(searchParams)
  }, [searchParams])

  useEffect(() => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      page: currentPage,
    }))
  }, [currentPage])

  useEffect(() => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      type:
        categories.find((category) => category.id === Number(bcode))?.name ||
        "",
    }))
  }, [bcode])

  const goDetail = (article) => {
    const id = article.id
    let path = `/communities/details/${id}`
    navigate(path)
  }

  const matchingCategory = categories.find(
    (category) => category.id === Number(bcode)
  )

  const goWrite = () => {
    setCurrentPage(0) // 페이지 번호를 초기화
    let path = `/communities/write`
    navigate(path)
  }

  const handleSearchForm = (data) => {
    setSearchParams(() => ({
      ...data,
      page: 0,
    }))
  }

  const totalPages = Math.ceil(totalSize / pageSize) // 총 페이지 수 계산

  return (
    <>
      <Search searchform={handleSearchForm} />
      {matchingCategory ? <h2>{matchingCategory.title}</h2> : <p>홈</p>}
      <Button text={"글쓰기"} onClick={goWrite} />
      <ul className="flex w-full flex-wrap justify-between">
        {articles &&
          articles.map((article) => (
            <li key={article.id}>
              <ArticleItem data={article} onSelectArticle={goDetail} />
            </li>
          ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page)
          console.log(page)
        }}
      />
    </>
  )
}

export default ArticleBoardList
