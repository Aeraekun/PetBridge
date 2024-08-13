// import {removeArticle} from "api/boards-api"
// import Button from "components/common/Button"
import {useEffect, useState} from "react"
import {useInView} from "react-intersection-observer"
import {Link, useNavigate} from "react-router-dom"
import MyPageCard from "./MyPageCard"
import {useSelector} from "react-redux"
import {selectNickname} from "features/user/users-slice"
import {getMyArticles} from "api/mypage-api"

const MyPageArtilcesContainer = () => {
  // isLoading true로 설정해두고, 화면 초기 로드 완료시 false로 변경 후 스크롤 페이지 렌더링
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [isMoreRemained, setIsMoreRemaind] = useState(true)
  const [items, setItems] = useState([])
  const [page, setPage] = useState(0)

  const nickname = useSelector(selectNickname)

  // API 요청을 보내기 위한 파라미터
  const [searchParams, setSearchParams] = useState({
    size: 12,
    page: 0,
    usernickname: nickname,
  })

  // 초기값 로딩
  useEffect(() => {
    if (nickname) {
      setSearchParams((prevSearchParams) => ({
        ...prevSearchParams,
        nickname: nickname,
      }))
      fetchInitData()
    }
  }, [])

  // 초기값 로딩
  const fetchInitData = async () => {
    const newItems = await fetchData()
    // 데이터 로드 성공시 (응답 배열에 데이터가 있다면)
    if (newItems && newItems.length > 0) {
      // 로딩상태 해제, 새로 받아온 값을 배열에 추가
      setIsLoading(false)
      setItems((prevItems) => [...prevItems, ...newItems])

      console.log("items!!!", items)
    }
  }

  // 내가 작성한 글들을 호출
  const fetchData = async () => {
    try {
      const res = await getMyArticles(searchParams)
      let newItems = []

      console.log("res: ", res)

      if (res.data.content) {
        console.log("데이터 추가!!!", res.data.content)
        newItems = res.data.content
        setPage((prevPageNo) => prevPageNo + 1)
        return newItems
      } else {
        setIsLoading(false)
        setIsMoreRemaind(false)
      }
    } catch (error) {
      console.log("추가 데이터 로드에 실패했습니다.")
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
    if (inView && !isMoreRemained) {
      setIsLoadingMore(true)
      fetchMoreData()
    }
  }, [inView])

  useEffect(() => {
    setSearchParams((prevSearchParams) => ({...prevSearchParams, page: page}))
  }, [page])

  const navigate = useNavigate()

  const handleClick = (item) => {
    console.log(item)
    navigate(`/communities/details/${item.id}`, {state: {item}})
  }

  return (
    <div className="flex h-full  min-w-80 flex-col items-center">
      <div className="relative flex w-full justify-center p-2.5 ">
        <button className="text-2xl font-bold">내가 쓴 글</button>
        <Link
          className="bg-mild absolute right-1.5 top-1.5 rounded-xl p-2.5"
          to="/communities/write"
        >
          글 작성하기
        </Link>
      </div>
      {isLoading ? (
        <div className="flex size-full  flex-col items-center justify-center">
          <div className="bg-mild mx-2.5 size-10 animate-ping rounded-full"></div>
          <span className="px-5 text-6xl font-bold">Loading...</span>
        </div>
      ) : (
        <div className="hidden-scrollbar flex size-full snap-y snap-mandatory flex-wrap items-center justify-center overflow-auto scroll-smooth">
          {items.map((item, index) => (
            <div
              key={index}
              className="relative m-2.5 "
              // 화면에 들어오는지 확인할 객체를 선택하기 위한 ref 설정 : 배열의 마지막 값
              ref={index === items.length - 1 ? ref : null}
            >
              <MyPageCard
                id={item.id}
                imageSrc={item.thumbnail}
                imageAlt={item.title}
                content1={`제목: ${item.title}`}
                content2={`작성 시간: ${item.registTime.split("T")[0]}`}
                content3={item.content}
                onClick={() => {
                  handleClick(item)
                }}
              />
            </div>
          ))}
        </div>
      )}
      {isLoadingMore ? (
        <div className="flex items-center">
          <div className="bg-mild mx-2.5 size-10 animate-ping rounded-full"></div>
          <span>추가 데이터를 로딩중입니다</span>
        </div>
      ) : null}
      {!isMoreRemained && !isLoadingMore && <p>불러올 데이터가 없습니다.</p>}
    </div>
  )
}

export default MyPageArtilcesContainer
