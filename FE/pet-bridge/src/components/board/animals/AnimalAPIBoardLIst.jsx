import {useEffect, useState} from "react"
import AnimalItem from "./AnimalItem"

import {useNavigate, useParams} from "react-router-dom"
import AnimalSearchForm from "components/board/animals/AnimalSearchForm"
import {getShelterAnimalsAPI} from "api/animals-api"

const AnimalAPIBoardLIst = () => {
  const {bcode} = useParams()
  const navigate = useNavigate()
  useEffect(() => {}, [bcode])

  const goAnimalDetail = (animal) => {
    console.log(animal)
    const id = animal.desertionNo
    let path = `/shelter/details/${id}`
    navigate(path, {state: {animal}})
  }

  ///보호소
  // API 요청을 보내기 위한 파라미터
  const [searchParams, setSearchParams] = useState({numOfRows: 12, pageNo: 1})
  const [pageNo, setPageNo] = useState(1)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [maxPage, setMaxPage] = useState([])
  // 초기값 로딩
  useEffect(() => {
    const fetchInitData = async () => {
      setIsLoading(true)
      const newData = await fetchData()
      const newItems = newData.response.body.items.item
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
    const res = await getShelterAnimalsAPI(searchParams)
    let newData = []
    let page = 0
    let total = 0
    let numOfRows = 0
    if (res.data) {
      console.log("fetch 성공!!!", res)
      newData = res.data
      numOfRows = res.data.response.body.numOfRows
      total = res.data.response.body.totalCount
      page = res.data.response.body.pageNo
      setPageNo(page)
      setMaxPage(Math.min(10, Math.ceil(total / numOfRows)))
      return newData
    } else {
      console.log("추가 데이터 로드에 실패했습니다.")
    }
  }

  useEffect(() => {
    setSearchParams({...searchParams, pageNo: pageNo})
  }, [pageNo])

  const handleSearchForm = (data) => {
    const newSearchParam = {
      ...searchParams,
      ...data,
      pageNo: pageNo,
      numOfRows: 12,
    }

    setSearchParams(newSearchParam)
  }
  return (
    <>
      <AnimalSearchForm searchParams={handleSearchForm} isShelter={true} />
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
              disabled={pageNo === 1}
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
          <ul className="flex w-full flex-wrap justify-start gap-x-10">
            {items
              // category와 bcode가 일치하는것만 필터링
              .map((item, index) => (
                <li key={index} className="grow">
                  <AnimalItem
                    data={item}
                    onSelectAnimal={() => goAnimalDetail(item)}
                    isShelter={true}
                  />
                </li>
              ))}
            <li className="w-[300px] grow"></li>
            <li className="w-[300px] grow"></li>
            <li className="w-[300px] grow"></li>
          </ul>
        </>
      )}
    </>
  )
}
export default AnimalAPIBoardLIst
