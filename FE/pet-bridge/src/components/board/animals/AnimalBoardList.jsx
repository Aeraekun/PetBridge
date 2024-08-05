import {useEffect, useState} from "react"
import AnimalItem from "./AnimalItem"
import Button from "components/common/Button"

import {useNavigate, useParams} from "react-router-dom"
import AnimalSearchForm from "components/board/animals/AnimalSearchForm"
import {getAnimalList} from "api/animals-api"

//임시보호동물게시판
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
  useEffect(() => {}, [bcode])

  const goRegist = () => {
    let path = `/shelter/regist`
    navigate(path)
  }
  const goAnimalDetail = (animal) => {
    console.log(animal)
    const id = animal.id
    let path = `/shelter/details/${id}`
    navigate(path, {state: {animal}})
  }

  ///임시보호
  // API 요청을 보내기 위한 파라미터
  const [searchParams, setSearchParams] = useState({
    size: 12,
    page: 0,
    processstate: "전체",
  })
  const [pageNo, setPageNo] = useState(1)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [maxPage, setMaxPage] = useState([])
  // 초기값 로딩
  useEffect(() => {
    const fetchInitData = async () => {
      setIsLoading(true)
      const newData = await fetchData()
      const newItems = newData
      // 데이터 로드 성공시 (응답 배열에 데이터가 있다면)
      if (newItems && newItems.length > 0) {
        // 로딩상태 해제, 새로 받아온 값을 배열에 추가
        setIsLoading(false)
        setItems(newItems)
      } else if (newData) {
        setIsLoading(false)
        setItems([])
      }
    }
    fetchInitData()
  }, [searchParams])

  // 농림축산부 API를 호출해서, 12개씩 페이징된 데이터를 받아온다.
  const fetchData = async () => {
    console.log("search", searchParams)
    const res = await getAnimalList(searchParams)
    let newData = []
    let page = 0
    let total = 0
    let numOfRows = 0
    if (res) {
      console.log("fetch 성공!!!", res)
      newData = res
      numOfRows = 1
      total = 0
      page = 0
      setPageNo(page)
      setMaxPage(Math.min(10, Math.ceil(total / numOfRows)))
      return newData
    } else {
      alert("추가 데이터 로드에 실패했습니다.")
    }
  }

  useEffect(() => {
    console.log(pageNo, "pageNo")
    setSearchParams({...searchParams, page: pageNo})
  }, [pageNo])

  const handleSearchForm = (data) => {
    const newSearchParam = {
      ...searchParams,
      ...data,
      page: pageNo,
    }

    setSearchParams(newSearchParam)
  }
  return (
    <>
      <Search />
      <AnimalSearchForm searchParams={handleSearchForm} isShelter={false} />

      <Button text={"등록하기"} onClick={goRegist} />
      {isLoading ? (
        <div className="flex items-center">
          <div className="bg-mild mx-2.5 size-10 animate-ping rounded-full"></div>
          <span>로딩중입니다</span>
        </div>
      ) : (
        <>
          <div className="flex space-x-2">
            <button
              onClick={() => setPageNo((prev) => Math.max(prev - 1, 1))}
              disabled={pageNo === 0}
            >
              ◀이전
            </button>
            <div>
              현재페이지{pageNo}/{maxPage}
            </div>
            <button
              onClick={() => setPageNo((prev) => Math.min(prev + 1, maxPage))}
              disabled={pageNo === maxPage}
            >
              다음▶{" "}
            </button>
          </div>
          <ul className="flex w-full flex-wrap justify-between">
            {items
              // category와 bcode가 일치하는것만 필터링
              .map((item, index) => (
                <li key={index}>
                  <AnimalItem
                    data={item}
                    onSelectAnimal={() => goAnimalDetail(item)}
                    isShelter={false}
                  />
                </li>
              ))}
          </ul>
        </>
      )}
    </>
  )
}
export default AnimalBoardList
