import {getUserContracts} from "api/contracts-api"
import {useEffect, useRef, useState} from "react"
import {useInView} from "react-intersection-observer"
import {Link, useParams} from "react-router-dom"

const MyPageContractsContainer = () => {
  const {userId} = useParams()

  // 초기에 api 요청이 완료되기 전 로딩 현황
  const [isLoading, setIsLoading] = useState(true)

  // 게시글 초기값 선언
  const [allItems, setAllItems] = useState([])
  const [viewItems, setViewItems] = useState([])
  const rootRef = useRef(null)

  // inView 사용
  // ref: observer가 지켜 볼 객체를 선정
  // inView: view 상태 (Boolean)
  const {ref, inView} = useInView({
    root: rootRef.current,
    rootMargin: "0px 0px",
  })

  // 컴포넌트 처음 마운트시, 백엔드에 API 요청을 보내서 유저 관련 모든 정보를 받아와서 페이지 상태에 저장한다.
  useEffect(() => {
    const loadInitialItems = async () => {
      const res = await getUserContracts(userId)

      setAllItems(res.data)
      setViewItems(res.data.slice(0, 10))
      setIsLoading(false)
    }
    loadInitialItems()
  }, [])

  // ref 객체를 화면에서 감지했을 때, inView 값이 true로 변경된다.
  // 해당 이벤트 발생시 allArticles에 남아 있는 게시글들을 viewItems에 추가 (10개씩)
  useEffect(() => {
    if (inView && viewItems.length < allItems.length) {
      const nextItems = allItems.slice(viewItems.length, viewItems.length + 10)
      setViewItems((prevItems) => [...prevItems, ...nextItems])
    }
  }, [inView, allItems, viewItems.length])

  return (
    <div className="flex h-full flex-col items-center">
      <button className="p-2.5 text-4xl font-bold">내 입양기록</button>
      <div
        ref={rootRef}
        className="flex size-full snap-y snap-mandatory flex-wrap items-center justify-center overflow-auto scroll-smooth"
      >
        {isLoading ? (
          <div>로딩중입니다</div>
        ) : (
          // 이미지 기준으로 반복
          viewItems.map((item, index) => (
            <Link
              to={`/contracts/${item.id}`}
              key={index}
              // ref 값이 화면에 들어왔을 때 api가 요청됨
              ref={index === viewItems.length - 1 ? ref : null}
              className="m-2.5 h-[450px] w-[300px] snap-center rounded-xl border"
            >
              <img
                src={`/data/petBridge/uploads/animal/${item.animalImage}`}
                alt={item.animalName}
                className="h-[300px] rounded-t-xl"
              />
              <div className="space-y-2.5 p-2.5">
                <p>{item.animalName}</p>
                <p>계약일 : {item.contractDate}</p>
                {item.contractorId === Number(userId) ? (
                  <span>입양자 : </span>
                ) : (
                  <span>보호자 : </span>
                )}
                <span>{item.contracteeNickname}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default MyPageContractsContainer
