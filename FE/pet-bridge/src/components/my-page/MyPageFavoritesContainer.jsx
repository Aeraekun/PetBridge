import MyPageCard from "components/my-page/MyPageCard"
import {Link} from "react-router-dom"
import {useEffect, useState} from "react"
import {getShelterAnimals} from "api/mypage-api"
import {useInView} from "react-intersection-observer"

const MyPageFavoritesContainer = () => {
  // isLoading true로 설정해두고, 화면 초기 로드 완료시 false로 변경 후 스크롤 페이지 렌더링
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [items, setItems] = useState([])
  const [pageNo, setPageNo] = useState(1)

  // API 요청을 보내기 위한 파라미터
  const [searchParams, setSearchParams] = useState({numOfRows: 12, pageNo: 1})

  // 초기값 로딩
  useEffect(() => {
    const fetchInitData = async () => {
      const newItems = await fetchData()
      // 데이터 로드 성공시 (응답 배열에 데이터가 있다면)
      if (newItems && newItems.length > 0) {
        // 로딩상태 해제, 새로 받아온 값을 배열에 추가
        setIsLoading(false)
        setItems((prevItems) => [...prevItems, ...newItems])
      }
    }

    fetchInitData()
  }, [])

  // 농림축산부 API를 호출해서, 12개씩 페이징된 데이터를 받아온다.
  const fetchData = async () => {
    try {
      const res = await getShelterAnimals(searchParams)
      let newItems = []

      if (res.data) {
        console.log("fetch 성공!!!", res)
        newItems = res.data.response.body.items.item
        setPageNo((prevPageNo) => prevPageNo + 1)
        return newItems
      }
    } catch (error) {
      alert("추가 데이터 로드에 실패했습니다.")
      console.log(error)
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
        setIsLoadingMore(false)
        setItems((prevItems) => [...prevItems, ...newItems])
      }
    }

    // inView 값이 true가 됐을 때,
    if (inView) {
      setIsLoadingMore(true)
      fetchMoreData()
    }
  }, [inView])

  useEffect(() => {
    setSearchParams({...searchParams, pageNo: pageNo})
  }, [pageNo])

  return (
    <div className="flex h-full flex-col items-center">
      <div className="flex w-full justify-center p-2.5 ">
        <button className="text-4xl font-bold">내 관심 등록 동물</button>
      </div>
      {isLoading ? (
        <div className="flex size-full items-center justify-center">
          <div className="mx-2.5 size-10 animate-ping rounded-full bg-mild"></div>
          <span className="px-5 text-6xl font-bold">Loading...</span>
        </div>
      ) : (
        <div className="flex size-full snap-y snap-mandatory flex-wrap items-center justify-center overflow-auto scroll-smooth">
          {items.map((item, index) => (
            <Link
              key={index}
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
          {isLoadingMore ? (
            <div className="flex items-center">
              <div className="mx-2.5 size-10 animate-ping rounded-full bg-mild"></div>
              <span>추가 데이터를 로딩중입니다</span>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default MyPageFavoritesContainer
