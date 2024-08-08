import React, {useState, useEffect} from "react"
import axios from "axios"
import PropTypes from "prop-types"
import MainShelterCard from "./MainShelterCard"
import MainPetpickBanner from "./MainPetpickBanner"
import {Link} from "react-router-dom"
import iconPawprint from "../../assets/icons/icon-pawprint.png" // 수정된 파일 이름으로 임포트

// Component for rendering individual shelter items
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

const MainShelterContainer = () => {
  const [sectionOneItems, setSectionOneItems] = useState([])
  const [sectionTwoItems, setSectionTwoItems] = useState([])

  useEffect(() => {
    const fetchShelterAnimals = async () => {
      const items = await getShelterAnimalsAPI({pageNo: 1, numOfRows: 20})
      const shuffledItems = shuffleArray([...items])
      setSectionOneItems(shuffledItems.slice(0, 10))
      setSectionTwoItems(shuffledItems.slice(10, 20))
    }

    fetchShelterAnimals()
  }, [])

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5)

  return (
    <div>
      {/* Shelter Animals Section 1 */}
      <section className="flex flex-col items-center">
        <p className="mb-4 text-4xl font-bold">
          사지 말고 입양하세요, 지금 가족을 기다리고 있어요
        </p>
        <ul className="scrollable-container flex h-[450px] w-[1000px] flex-col flex-wrap space-x-5 py-4">
          {sectionOneItems.map((item) => (
            <ItemCard
              key={item.desertionNo}
              noticeNo={item.noticeNo}
              sexCd={item.sexCd}
              popfile={item.popfile}
              kindCd={item.kindCd}
              careNm={item.careNm}
              careAddr={item.careAddr}
            />
          ))}
        </ul>
        <div className="my-4 flex justify-center">
          <Link
            to="/shelter/0"
            className="inline-flex h-12 items-center justify-center rounded-md border border-stroke bg-mild px-3.5 py-4 text-black"
          >
            <img
              src={iconPawprint}
              alt="Community Icon"
              className="mr-2 size-6" // 이미지 크기와 간격 조정
            />
            새 가족 만나러 가기
          </Link>
        </div>
      </section>

      {/* Petpick Section */}
      <section className="flex flex-col items-center">
        <p className="mb-4 text-4xl font-bold">
          펫픽, 유기동물도 당신과 함께라면 행복할 수 있어요
        </p>
        <section className="flex h-[500px] w-[1000px] flex-col flex-wrap">
          <MainPetpickBanner />
        </section>
        <div className="mt-4 flex justify-center">
          <Link
            to="/petpick"
            className="inline-flex h-12 items-center justify-center rounded-md border border-stroke bg-mild px-3.5 py-4 text-black"
          >
            <img
              src={iconPawprint}
              alt="Community Icon"
              className="mr-2 size-6" // 이미지 크기와 간격 조정
            />
            펫픽 더보기
          </Link>
        </div>
      </section>

      {/* Shelter Animals Section 2 */}
      <section className="flex flex-col items-center">
        <p className="mt-4 text-4xl font-bold">
          입양홍보부터 입양후기까지 많은 정보가 한가득
        </p>
        <ul className="scrollable-container flex h-[450px] w-[1000px] flex-col flex-wrap space-x-5 py-4">
          {sectionTwoItems.map((item) => (
            <ItemCard
              key={item.desertionNo}
              noticeNo={item.noticeNo}
              sexCd={item.sexCd}
              popfile={item.popfile}
              kindCd={item.kindCd}
              careNm={item.careNm}
              careAddr={item.careAddr}
            />
          ))}
        </ul>
        <div className="mt-4 flex justify-center">
          <Link
            to="/communities"
            className="inline-flex h-12 items-center justify-center rounded-md border border-stroke bg-mild px-3.5 py-4 text-black"
          >
            <img
              src={iconPawprint}
              alt="Community Icon"
              className="mr-2 size-6" // 이미지 크기와 간격 조정
            />
            커뮤니티 바로가기
          </Link>
        </div>
      </section>
    </div>
  )
}

export default MainShelterContainer
