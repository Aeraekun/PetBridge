import MyPageCard from "components/my-page/MyPageCard"
import {myAnimalDatas} from "./my-animal-data"
import {Link} from "react-router-dom"
import {useEffect, useState} from "react"
import {getShelterAnimals} from "api/test-api"

const MyPageFavoritesContainer = () => {
  // isLoading true로 설정해두고, 화면 초기 로드 완료시 false로 변경 후 스크롤 페이지 렌더링
  const [isLoading, setIsLoading] = useState(true)

  // 초기값 로딩
  useEffect(() => {
    const fetchInitData = async () => {
      const newItems = await fetchData()
      console.log(newItems)
      // 데이터 로드 성공시 검색 page를 올려준다.
      if (newItems) {
        page++
        setIsLoading(false)
      }
    }

    fetchInitData()
  }, [])

  // API 요청을 보내기 위한 파라미터
  let page = 1
  const [searchParams] = useState({numOfRows: 12, page: page})

  // 농림축산부 API를 호출해서, 12개씩 페이징된 데이터를 받아온다.
  const fetchData = async () => {
    const res = await getShelterAnimals(searchParams)
    let newItems = []

    if (res.data) {
      newItems = res.data.response.body.items.item
      return newItems
    } else {
      alert("데이터 로드에 실패했습니다.")
    }
  }

  const onClickFetchDataHandler = () => {
    fetchData()
  }

  return (
    <div className="flex h-full flex-col items-center">
      <div className="flex w-full justify-center p-2.5 ">
        <button className="text-4xl font-bold">내 관심 등록 동물</button>
        <button onClick={onClickFetchDataHandler}>데이터 받아오기</button>
      </div>
      {isLoading ? (
        <div>
          <div className="bg-mild mx-2.5 inline-flex size-3 animate-ping rounded-full"></div>
          <span>로딩중입니다</span>
        </div>
      ) : (
        <div className="flex size-full snap-y snap-mandatory flex-wrap items-center justify-center overflow-auto scroll-smooth">
          {myAnimalDatas.map((item) => (
            <Link
              key={item.desertionNo}
              to={`/shelter/details/${item.desertionNo}`}
              className="m-2.5 "
            >
              <MyPageCard
                id={item.desertionNo}
                imageSrc={item.popfile}
                imageAlt={item.careNm}
                content1={item.noticeNo}
                content2={item.kindCd}
                content3={item.age}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyPageFavoritesContainer
