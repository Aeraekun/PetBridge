import MyPageCard from "components/my-page/MyPageCard"
import {Link} from "react-router-dom"
import {useEffect, useState} from "react"
import {getShelterAnimals} from "api/test-api"
import {useInView} from "react-intersection-observer"

const MyPageFavoritesContainer = () => {
  // isLoading true로 설정해두고, 화면 초기 로드 완료시 false로 변경 후 스크롤 페이지 렌더링
  const [isLoading, setIsLoading] = useState(true)
  const [items, setItems] = useState([])

  // 초기값 로딩
  useEffect(() => {
    const fetchInitData = async () => {
      const newItems = await fetchData()
      // 데이터 로드 성공시 (응답 배열에 데이터가 있다면)
      if (newItems && newItems.length > 0) {
        // 페이지 +1, 로딩상태 해제
        setIsLoading(false)
        setItems((prevItems) => [...prevItems, ...newItems])
      }
    }

    fetchInitData()
  }, [])

  // API 요청을 보내기 위한 파라미터
  let pageNo = 1
  const [searchParams] = useState({numOfRows: 12, pageNo: pageNo})

  // 농림축산부 API를 호출해서, 12개씩 페이징된 데이터를 받아온다.
  const fetchData = async () => {
    const res = await getShelterAnimals(searchParams)
    let newItems = []

    if (res.data) {
      console.log("fetch 성공!!!", res)
      newItems = res.data.response.body.items.item
      pageNo++
      return newItems
    } else {
      alert("추가 데이터 로드에 실패했습니다.")
    }
  }

  // 현재 화면에서 ref 객체를 탐지하기 위한 inView 사용
  const {ref, inView} = useInView({})

  // inView 값이 변함을 탐지
  useEffect(() => {
    const fetchMoreData = async () => {
      const newItems = await fetchData()
      // 데이터 로드 성공시 (응답 배열에 데이터가 있다면)
      if (newItems && newItems.length > 0) {
        // 페이지 +1, 로딩상태 해제
        console.log(pageNo)
        setIsLoading(false)
        setItems((prevItems) => [...prevItems, ...newItems])
      }
    }

    // inView 값이 true가 됐을 때,
    if (inView) {
      fetchMoreData()
    }
  }, [inView])

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
          {items.map((item, index) => (
            <Link
              key={item.desertionNo}
              to={`/shelter/details/${item.desertionNo}`}
              className="m-2.5 "
              // 화면에 들어오는지 확인할 객체를 선택하기 위한 ref 설정 : 배열의 마지막 값
              ref={index === items.length - 1 ? ref : null}
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
