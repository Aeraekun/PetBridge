import {useEffect, useState} from "react"
import AnimalItem from "./AnimalItem"
import Button from "components/common/Button"

import {useNavigate} from "react-router-dom"
// import AnimalSearchForm from "components/board/animals/AnimalSearchForm"
import {getAnimalList} from "api/animals-api"
import Pagination from "components/common/Pagination"

//임시보호동물게시판
const Search = ({searchParams}) => {
  const [careaddr, setCareaddr] = useState()
  const [processstate, setProcessstate] = useState("")

  //엔터키 이벤트
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
    const params = {
      careaddr: careaddr ? careaddr : "",
      processstate: processstate,
    }

    console.log(params, "params")
    searchParams(params)
    setCareaddr("")
    setProcessstate("")
  }

  return (
    <div className="flex w-full items-center justify-between px-10">
      <select
        id="kind"
        value={processstate}
        onChange={(e) => setProcessstate(e.target.value)}
        className="h-12 w-48 rounded-xl border-2 border-stroke p-2"
      >
        <option value="전체">전체</option>
        <option value="임시보호">임시보호</option>
        <option value="입양대기">입양대기</option>
        <option value="입양완료">입양완료</option>
      </select>{" "}
      <div className=" mr-6 flex  h-12 w-36 items-center justify-end text-lg">
        보호장소
      </div>
      <input
        type="text"
        placeholder="보호 장소를 입력하세요."
        className="mr-12 h-12 w-full rounded-xl border-2 border-stroke p-2"
        onKeyDown={handleKeyDown}
        value={careaddr}
        onChange={(e) => setCareaddr(e.target.value)}
      />
      <button
        onClick={() => {
          handleButtonClick()
        }}
        className="flex h-10 w-36 items-center justify-center rounded-xl bg-green-600 text-white "
      >
        검색
      </button>
    </div>
  )
}
const AnimalBoardList = () => {
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(0) //페이지는 0 부터
  const [animals, setAnimals] = useState([]) //동물 리스트 받아올 변수
  const [totalPages, setTotalPages] = useState(0) //전체 페이지 수
  const pageSize = 12 // 페이지당 항목 수

  //동물 등록 페이지로 이동
  const goRegist = () => {
    let path = `/shelter/regist`
    navigate(path)
  }

  //동물 상세 페이지로 이동 state:animal 담아서 보냄.
  const goAnimalDetail = (animal) => {
    console.log(animal)
    const id = animal.id
    let path = `/shelter/details/${id}`
    navigate(path, {state: {animal}})
  }

  ///임시보호
  const [searchParams, setSearchParams] = useState({}) // API 요청을 보내기 위한 파라미터

  // 초기값 로딩
  useEffect(() => {
    const fetchInitData = async () => {
      const data = await getAnimalList(searchParams)
      console.log(data.content)
      setTotalPages(data.totalPages)
      setAnimals(data.content)
    }
    fetchInitData()
  }, [searchParams])

  //페이지가 바뀌었을때 searchParmas 업데이트
  useEffect(() => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      page: currentPage,
      size: pageSize,
    }))
  }, [currentPage])

  //검색버튼이 눌린경우
  const handleSearchForm = (data) => {
    setSearchParams(() => ({
      ...data,
      page: 0,
    }))
  }

  return (
    <>
      <Search searchParams={handleSearchForm} />
      {/* <AnimalSearchForm searchParams={handleSearchForm2} isShelter={false} /> */}

      <Button text={"등록하기"} onClick={goRegist} />

      <div className="flex space-x-5">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
        >
          ◀이전
        </button>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages - 1}
        >
          다음▶{" "}
        </button>
      </div>
      <ul className="flex w-full flex-wrap justify-start gap-4">
        {animals ? (
          animals.map((item, index) => (
            <li key={index}>
              <AnimalItem
                data={item}
                onSelectAnimal={() => goAnimalDetail(item)}
                isShelter={false}
              />
            </li>
          ))
        ) : (
          <div>등록된 동물이 없습니다.</div>
        )}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page)
        }}
      />
    </>
  )
}
export default AnimalBoardList
