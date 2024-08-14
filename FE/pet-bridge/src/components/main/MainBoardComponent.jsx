import React, {useState, useEffect} from "react"
import slideImage from "../../assets/image/Mainslide2.jpg" // 배경 이미지
import {Link, useNavigate} from "react-router-dom" // Link 컴포넌트 임포트
import iconPawprint from "../../assets/icons/icon-pawprint.png" // 아이콘 이미지
import AnimalItem from "components/board/animals/AnimalItem"
import {getAnimalList} from "api/animals-api"

// 메인 컴포넌트
const MainBoardComponent = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useState({})
  const [sectionOneItems, setSectionOneItems] = useState([])

  useEffect(() => {
    setSearchParams(() => ({
      page: 0,
      size: 20,
    }))
  }, [])

  const goAnimalDetail = (animal) => {
    console.log(animal)
    const id = animal.id
    let path = `/shelter/details/${id}`
    navigate(path, {state: {animal}})
  }

  useEffect(() => {
    const fetchInitData = async () => {
      try {
        const data = await getAnimalList(searchParams)
        console.log(data)
        const shuffledItems = shuffleArray([...data.content])
        setSectionOneItems(shuffledItems.slice(0, 10))
      } catch (e) {
        console.log(e)
      }
    }
    fetchInitData()
  }, [searchParams])

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5)

  return (
    <div
      className="box-border flex h-screen flex-col items-center justify-start bg-cover bg-center bg-no-repeat pt-12 text-black"
      style={{backgroundImage: `url(${slideImage})`}}
    >
      <div className="mb-4 flex w-[1000px] items-center justify-between">
        <p className="mr-4 text-center text-4xl font-bold">
          입양, 어렵지 않아요. 같이 얘기 나눠요
        </p>
        <Link
          to="/communities"
          className="inline-flex h-12 items-center rounded-lg border border-gray-300 bg-mild px-4 text-black no-underline"
        >
          <img
            src={iconPawprint}
            alt="Community Icon"
            className="mr-2 size-6"
          />
          커뮤니티 바로가기
        </Link>
      </div>
      <div className="flex w-full flex-col items-center">
        <ul className="scrollable-container flex max-h-[450px] w-[1000px] flex-col flex-wrap gap-2.5 overflow-y-auto bg-white">
          {sectionOneItems.map((item, index) => (
            <AnimalItem
              data={item}
              onSelectAnimal={() => goAnimalDetail(item)}
              isShelter={false}
              key={index}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MainBoardComponent
