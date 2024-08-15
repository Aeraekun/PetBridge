import {useEffect, useState} from "react"
import AnimalItem from "./AnimalItem"
import Button from "components/common/Button"

import {useNavigate} from "react-router-dom"
// import AnimalSearchForm from "components/board/animals/AnimalSearchForm"
import {getAnimalList} from "api/animals-api"
import Pagination from "components/common/Pagination"
import Search from "components/board/articles/Search"

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
      <div
        className="fixed top-20 z-10 flex justify-end"
        style={{left: "calc(50% + 35%)", top: "90%"}}
      >
        <Button text={"등록하기"} onClick={goRegist} />
      </div>
      <ul className="relative flex w-full flex-wrap justify-start gap-x-10">
        {animals ? (
          animals.map((item, index) => (
            <li key={index} className="grow">
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
export default AnimalBoardList
