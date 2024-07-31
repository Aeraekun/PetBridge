import {getUserContracts} from "api/contracts-api"
import {useEffect, useRef, useState} from "react"
import {useInView} from "react-intersection-observer"
import {useParams} from "react-router-dom"

const MyPageArtilcesContainer = () => {
  const {userId} = useParams()

  // 초기에 api 요청이 완료되기 전 로딩 현황
  const [isLoading, setIsLoading] = useState(true)

  // 게시글 초기값 선언
  const [allArticles, setAllArticles] = useState([])
  const [viewArticles, setViewArticles] = useState([])
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
    const loadInitialArticles = async () => {
      const res = await getUserContracts(userId)

      setAllArticles(res.data)
      setViewArticles(res.data.slice(0, 10))
      setIsLoading(false)
    }
    loadInitialArticles()
  }, [])

  // ref 객체를 화면에서 감지했을 때, inView 값이 true로 변경된다.
  // 해당 이벤트 발생시 allArticles에 남아 있는 게시글들을 viewArticles에 추가 (10개씩)
  useEffect(() => {
    if (inView && viewArticles.length < allArticles.length) {
      const nextArticles = allArticles.slice(
        viewArticles.length,
        viewArticles.length + 10
      )
      setViewArticles((prevArticles) => [...prevArticles, ...nextArticles])
    }
  }, [inView, allArticles, viewArticles.length])

  return (
    <div className="flex h-full flex-col items-center">
      <div className="p-2.5 text-4xl font-bold">내 게시글</div>
      <div
        ref={rootRef}
        className="flex size-full snap-y snap-mandatory flex-wrap items-center justify-center overflow-auto scroll-smooth"
      >
        {isLoading ? (
          <div>로딩중입니다</div>
        ) : (
          // 이미지 기준으로 반복
          viewArticles.map((article, index) => (
            <div
              key={index}
              // ref 값이 화면에 들어왔을 때 api가 요청됨
              ref={index === viewArticles.length - 1 ? ref : null}
              className="m-2.5 h-[450px] w-[300px] snap-center rounded-xl border"
            >
              <img
                src={`/data/petBridge/uploads/animal/${article.animalImage}`}
                alt={article.animalName}
                className="h-[300px] rounded-t-xl"
              />
              <div className="space-y-2.5 p-2.5">
                <p>{article.animalName}</p>
                <p>계약일 : {article.contractDate} 번</p>
                {article.contractorId === Number(userId) ? (
                  <span>입양자 : </span>
                ) : (
                  <span>보호자 : </span>
                )}
                <span>{article.contracteeNickname}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default MyPageArtilcesContainer
