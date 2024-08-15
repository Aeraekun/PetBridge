import ArticleItem from "./ArticleItem"
import Button from "components/common/Button"
import {useNavigate, useParams} from "react-router-dom"
import {getArticle} from "api/boards-api"
import React, {useEffect, useState} from "react"
import Pagination from "components/common/Pagination"
import Search from "components/board/articles/Search"

const categories = [
  {id: 0, name: "HOME", title: "홈"},
  {id: 1, name: "PROMOTION", title: "입양홍보"},
  {id: 2, name: "REVIEW", title: "입양후기"},
  {id: 3, name: "FREE", title: "자유게시판"},
  {id: 4, name: "NOTICE", title: "공지사항"},
]
const ArticleBoardList = () => {
  const {bcode} = useParams()
  const navigate = useNavigate()

  const [articles, setArticles] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const pageSize = 12 // 페이지당 항목 수
  const [searchParams, setSearchParams] = useState()

  //게시글 조회 API 호출
  const fetchArticles = async (params) => {
    console.log(params)
    try {
      const data = await getArticle(params)
      setTotalPages(data.totalPages)
      setArticles(data.content)
    } catch (error) {
      console.error("게시글 가져오기 오류:", error)
    }
  }

  //searchParmas가 바뀔때마다 새로 받아옴. (검색조건생겼을때, 페이지 넘어갈때)
  useEffect(() => {
    if (searchParams) {
      fetchArticles(searchParams)
    }
    // console.log(articles)
  }, [searchParams])

  //페이지가 바뀌었을때 searchParmas 업데이트
  useEffect(() => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      page: currentPage,
      size: pageSize,
    }))
  }, [currentPage])

  useEffect(() => {
    setCurrentPage(0)
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

  return (
    <>
      <Search searchform={handleSearchForm} />
      <div
        className="fixed top-20 z-10 flex justify-end"
        style={{left: "calc(50% + 35%)", top: "90%"}}
      >
        <Button text={"글쓰기"} onClick={goWrite} />
      </div>
      <ul className="relative flex w-full flex-wrap justify-start gap-x-10">
        {articles ? (
          articles.map((article) => (
            <li key={article.id} className="w-[300px] grow">
              <ArticleItem data={article} onSelectArticle={goDetail} />
            </li>
          ))
        ) : (
          <div>등록된 게시글이 없습니다.</div>
        )}
        <li className="w-[300px] grow"></li>
        <li className="w-[300px] grow"></li>
        <li className="w-[300px] grow"></li>
      </ul>
      <Pagination
        currentPage={currentPage + 1}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page - 1)
        }}
      />
    </>
  )
}

export default ArticleBoardList
