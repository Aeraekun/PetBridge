import {useEffect, useState} from "react"
import AnimalItem from "../board/animals/AnimalItem"
import {useNavigate} from "react-router-dom"
import {getAnimalList} from "api/animals-api"
import AnimalDetailProfile from "components/board/animals/AnimalDetailProfile"

// 임시보호동물게시판
const AnimalBoardList = ({breed}) => {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate()
  const [animals, setAnimals] = useState([]) // 동물 리스트 받아올 변수
  const [selectedAnimal, setSelectedAnimal] = useState(null) // 선택된 동물
  const [isModalOpen, setIsModalOpen] = useState(false) // 모달 열림/닫힘 상태

  // 동물 상세 페이지로 이동 state: animal 담아서 보냄.
  const goAnimalDetail = (animal) => {
    setSelectedAnimal(animal)
    setIsModalOpen(true)
  }

  // 임시보호
  const [searchParams, setSearchParams] = useState({kindcd: breed}) // API 요청을 보내기 위한 파라미터

  // 초기값 로딩
  useEffect(() => {
    const fetchInitData = async () => {
      const data = await getAnimalList(searchParams)
      console.log(data.content)
      setAnimals(data.content)
    }
    fetchInitData()
  }, [searchParams])

  useEffect(() => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      kindcd: breed, // 선택된 품종에 따라 kindcd 업데이트
    }))
  }, [breed])

  return (
    <>
      <ul className="flex w-full flex-wrap justify-start gap-12">
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
          <h3 className="mb-4 text-center text-3xl font-semibold">
            현재 등록된 동물이 없습니다.
          </h3>
        )}
      </ul>

      {/* AnimalDetailProfile 모달 */}
      {isModalOpen && selectedAnimal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative w-full max-w-3xl rounded-lg bg-white p-8 shadow-lg">
            <AnimalDetailProfile
              animal={selectedAnimal}
              isEditing={false}
              isShelter={false}
            />
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnimalBoardList
