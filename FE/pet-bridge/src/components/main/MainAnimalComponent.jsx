import React, {useState, useEffect} from "react"
import axios from "axios"
import PropTypes from "prop-types"
import MainShelterCard from "../../components/main/MainShelterCard" // MainShelterCard 컴포넌트 임포트
import slideImage from "../../assets/image/Mainslide2.jpg" // 배경 이미지
import {Link} from "react-router-dom" // Link 컴포넌트 임포트
import iconPawprint from "../../assets/icons/icon-pawprint.png" // 아이콘 이미지

// 개별 보호소 동물 아이템을 렌더링하는 컴포넌트
const ItemCard = ({
  noticeNo,
  sexCd,
  popfile,
  kindCd,
  cardNm,
  careNm,
  careAddr,
}) => (
  <MainShelterCard
    noticeNo={noticeNo}
    sexCd={sexCd}
    popfile={popfile}
    kindCd={kindCd}
    cardNm={cardNm}
    careNm={careNm}
    careAddr={careAddr}
  />
)

ItemCard.propTypes = {
  noticeNo: PropTypes.string.isRequired,
  sexCd: PropTypes.string.isRequired,
  popfile: PropTypes.string.isRequired,
  kindCd: PropTypes.string.isRequired,
  cardNm: PropTypes.string,
  careNm: PropTypes.string,
  careAddr: PropTypes.string,
}

// 보호소 동물 데이터를 가져오는 API 호출 함수
const getShelterAnimalsAPI = async (searchParams) => {
  const SERVICE_KEY = process.env.REACT_APP_API_SERVICE_KEY
  const BASE_PUB_API = process.env.REACT_APP_BASE_PUB_API
  const params = {
    serviceKey: SERVICE_KEY,
    pageNo: searchParams.pageNo || 1,
    numOfRows: searchParams.numOfRows || 10,
    _type: "json",
    ...searchParams,
  }

  try {
    const res = await axios.get(`${BASE_PUB_API}/abandonmentPublic`, {
      params: params,
    })

    return res.data.response.body.items.item || []
  } catch (error) {
    console.error("Error fetching shelter animals:", error)
    return []
  }
}

// 메인 컴포넌트
const MainAnimalComponent = () => {
  const [sectionOneItems, setSectionOneItems] = useState([])

  useEffect(() => {
    const fetchShelterAnimals = async () => {
      const items = await getShelterAnimalsAPI({pageNo: 1, numOfRows: 20})
      const shuffledItems = shuffleArray([...items])
      setSectionOneItems(shuffledItems.slice(0, 10))
    }

    fetchShelterAnimals()
  }, [])

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5)

  return (
    <div
      className="box-border flex h-screen flex-col items-center justify-start bg-cover bg-center bg-no-repeat pt-12 text-black"
      style={{backgroundImage: `url(${slideImage})`}}
    >
      <div className="flex w-full flex-col items-center">
        <div className="mb-4 flex w-[1000px] items-center justify-between">
          <p className="text-center text-4xl font-bold text-black">
            사지 말고 입양하세요, 지금 가족을 기다리고 있어요
          </p>
          <Link
            to="/shelter/0"
            className="inline-flex h-12 items-center rounded-lg border border-gray-300 bg-mild px-4 text-black no-underline"
          >
            <img
              src={iconPawprint}
              alt="Community Icon"
              className="mr-2 size-6"
            />
            새 가족 만나러 가기
          </Link>
        </div>
        <ul className="scrollable-container flex max-h-[450px] w-[1000px] flex-col flex-wrap gap-2 overflow-y-auto bg-white">
          {sectionOneItems.map((item) => (
            <ItemCard
              key={item.desertionNo}
              noticeNo={item.noticeNo}
              sexCd={item.sexCd}
              popfile={item.popfile}
              kindCd={item.kindCd}
              cardNm={item.cardNm}
              careNm={item.careNm}
              careAddr={item.careAddr}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MainAnimalComponent
