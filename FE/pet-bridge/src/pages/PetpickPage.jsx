import React, {useState, useRef, useEffect, useCallback} from "react"
// import {useInView} from "react-intersection-observer"
import {
  getDetailFollow,
  getDetailPetPickLike,
  getRandomDetailPetPick,
} from "api/petpicks-api"
import {useNavigate} from "react-router-dom"
import iconPawprint from "assets/icons/icon-pawprint.png" // 수정된 파일 이름으로 임포트
import {getShelterAnimalsAPI} from "api/animals-api"
import PetpickComments from "components/petpick/PetpickComments"
import AnimalAd from "components/petpick/AnimalAd"
import {getMyLocation} from "utils/petpick-utils"
import Navbar from "components/header/Navbar"
import {Toast} from "utils/common-utils"

const PetpickPage = () => {
  const [index, setIndex] = useState(0) // 현재 인덱스 상태
  const [list, setList] = useState([]) // list: petpick + 보호소 동물 정보
  const [nowPage, setNowPage] = useState(1)
  const containerRef = useRef(null) // 스크롤 컨테이너
  const itemRefs = useRef(list.map(() => React.createRef()))
  const [isLoading, setIsLoading] = useState(true)
  // const [loading, setLoading] = useState(false) // 추가된 로딩 상태

  const handleInView = useCallback((visibleIndex) => {
    setIndex(visibleIndex)
  }, [])

  // 펫핏 데이터 받아오기
  const fetchPetpickData = async () => {
    try {
      const petpicks = await getRandomDetailPetPick()
      if (petpicks) {
        return petpicks
      } else {
        console.error("펫픽비어있음")
      }
    } catch (error) {
      console.error("에러 발생:", error)
      Toast.fire({
        icon: "warning",
        title: "펫픽 데이터 로드 실패.",
      })
      return []
    }
  }

  //동물 받아오기
  const fetchAnimalData = async () => {
    //5마리씩 sidoCode 넣어서 보호중(입양가능)인 동물만.
    const sidoCode = (await getMyLocation()) || 6300000 //위치 시도코드받아오기
    const searchParams = {
      numOfRows: 5,
      pageNo: nowPage,
      upr_cd: sidoCode,
      state: "protect",
    }
    const res = await getShelterAnimalsAPI(searchParams)
    setNowPage(nowPage + 1)
    if (
      res.data &&
      res.data.response &&
      res.data.response.body &&
      res.data.response.body.items
    ) {
      return res.data.response.body.items.item
    } else {
      console.log("보호소 동물 가져오기 실패")
      return [] // 빈 배열 반환
    }
  }

  const fetchData = async () => {
    let result = []
    const newPetpick = await fetchPetpickData()
    const newAnimals = await fetchAnimalData()
    console.log(newPetpick, "newPetpick")
    console.log(newAnimals, "animals")

    if (!newPetpick) {
      return <>펫픽 로드 실패 </>
    }
    if (!newAnimals) {
      return <>보호소 로드 실패 </>
    }
    const animalsLength = 5
    let animalIndex = 0

    for (let i = 0; i < newPetpick?.length; i++) {
      result.push(newPetpick[i])

      // 각 3개 아이템마다 동물 아이템을 삽입
      if ((i + 1) % 3 === 0 && animalIndex < animalsLength) {
        result.push(newAnimals[animalIndex])
        animalIndex++
      }
    }

    if (result && result.length > 0) {
      // 응답 배열에 데이터가 있다면 새로 받아온 값을 배열에 추가
      console.log(result, "result")
      setList((prevItems) => [...prevItems, ...result])
    }
  }

  // 초기값 로딩
  useEffect(() => {
    setIsLoading(false)
    fetchData()
  }, [])

  // itemRefs의 길이를 데이터 리스트의 길이와 맞추는 함수
  const updateItemRefs = useCallback(() => {
    itemRefs.current = list.map(
      (_, i) => itemRefs.current[i] || React.createRef()
    )
  }, [list])

  useEffect(() => {
    updateItemRefs() //list가 바뀔때마다 데이터 리스트의 길이와 맞추는 함수
    console.log(list, "list")
  }, [list, updateItemRefs])

  const loadMoreData = async () => {
    fetchData()
  }

  // Index가 리스트의 마지막에서 두 번째인 경우 데이터를 추가
  useEffect(() => {
    // const fetchLikeFollow = async () => {
    //   // console.log(list[index])
    //   // console.log(list)
    //   try {
    //     const nowLike = await getDetailPetPickLike(list[index].id)
    //     const nowFollow = await getDetailFollow(list[index].animalId)
    //     console.log(list[index].id, " ", nowLike)
    //     console.log(list[index].id, " ", nowFollow)
    //     if (nowLike) {
    //       list[index].isLiking = true
    //     } else {
    //       list[index].isLiking = false
    //     }
    //     if (nowFollow) {
    //       list[index].isFollowing = true
    //     } else {
    //       list[index].isFollowing = false
    //     }
    //     list[index + 1].isLiking = await getDetailPetPickLike(
    //       list[index + 1].id
    //     )
    //     list[index - 1].isLiking = await getDetailPetPickLike(
    //       list[index - 1].id
    //     )
    //     list[index + 1].isFollowing = await getDetailFollow(
    //       list[index + 1].animalId
    //     )
    //     list[index - 1].isFollowing = await getDetailFollow(
    //       list[index - 1].animalId
    //     )
    //     setList(list)
    //     // console.log(list)
    //   } catch {
    //     console.log("catch")
    //   }
    // }

    const fetchLikeFollow = async () => {
      // setLoading(true) // 로딩 시작
      try {
        const nowLike = await getDetailPetPickLike(list[index].id)
        const nowFollow = await getDetailFollow(list[index].animalId)

        const newList = [...list]

        // if (nowLike) {
        //   list[index].isLiking = true
        // } else {
        //   list[index].isLiking = false
        // }
        // if (nowFollow) {
        //   list[index].isFollowing = true
        // } else {
        //   list[index].isFollowing = false
        // }
        // setList(list)

        if (nowLike) {
          newList[index].isLiking = true
        } else {
          newList[index].isLiking = false
        }
        if (nowFollow) {
          newList[index].isFollowing = true
        } else {
          newList[index].isFollowing = false
        }
        // console.log(list)
        setList(list)
      } catch {
        console.log("catch")
      }
    }
    if (index === list.length - 2) {
      loadMoreData()
    }
    if (list.length > 0) {
      console.log(
        list[index].isLiking,
        "like<  >follow",
        list[index].isFollowing
      )
      console.log(index, "  list길이:", list.length)
      fetchLikeFollow()
    }
  }, [index])

  // // Index가 리스트의 마지막에서 두 번째인 경우 데이터를 추가
  // useEffect(() => {
  //   const loadMoreData = async () => {
  //     const newData = await fetchData()
  //     setNowPage(nowPage + 1)
  //     console.log("moredata", nowPage)
  //     setList((prevList) => [...prevList, ...newData])
  //     console.log("list", list)
  //   }
  //   if (index === list.length - 2) {
  //     loadMoreData()
  //   }
  // }, [index]) //인덱스가 바뀔때마다 실행

  // useState(() => {
  //   //인덱스가 바뀔때마다 팔로우, 좋아요 데이터 업데이트
  //   const fetchLikeFollow = async () => {
  //     try {
  //       const nowLike = await getDetailPetPickLike(list[index].id)
  //       const nowFollow = await getDetailFollow(list[index].animalId)
  //       if (nowLike) {
  //         list[index].isLiking = true
  //       } else {
  //         list[index].isLiking = false
  //       }
  //       if (nowFollow) {
  //         list[index].isFollowing = true
  //       } else {
  //         list[index].isFollowing = false
  //       }
  //       console.log(list)
  //       setList(list) //상태 바꾼 list 업데이트
  //     } catch {
  //       console.log("catch")
  //     }
  //   }
  //   if (list.length > 0) {
  //     fetchLikeFollow()
  //   }
  //   console.log("인덱스 ", index)
  // }, [index])

  // useEffect(() => {
  //   console.log(index)
  // }, [index])

  const navigate = useNavigate()
  const goPetpickWrite = () => {
    navigate(`/petpick/write`)
  }
  const goBack = () => {
    navigate(-1)
  }

  return (
    <div>
      <Navbar />
      {isLoading ? (
        <div>Loading..</div>
      ) : (
        <div className=" relative h-screen">
          <button
            onClick={goPetpickWrite}
            className="absolute right-20 top-20 flex "
          >
            <img
              src={iconPawprint}
              alt="Community Icon"
              className="mr-2 size-6" // 이미지 크기와 간격 조정
            />
            펫픽 올리기
          </button>
          <div className=" fixed mb-4 text-lg">현재 인덱스: {index}</div>
          <button className="fixed left-20 top-20" onClick={goBack}>
            뒤로가기
          </button>
          <div className="fixed right-8 top-1/2 flex flex-col space-y-8">
            <button
              onClick={() => {
                setIndex((prev) => Math.max(prev - 1, 0))
                containerRef.current.scrollBy(0, -400)
              }}
              disabled={index === 0}
            >
              <img src="/icons/icon-up-button.svg" alt="upbutton" />
            </button>
            <button
              onClick={() => {
                setIndex((prev) => Math.min(prev + 1, list.length - 1))
                containerRef.current.scrollBy(0, 400)
              }}
              disabled={index === list.length - 1}
            >
              <img src="/icons/icon-down-button.svg" alt="downbutton" />
            </button>
          </div>
          <div
            ref={containerRef}
            className="scrollbar-hide h-full snap-y snap-mandatory overflow-y-scroll"
          >
            {list.map((item, i) => {
              if (item.desertionNo) {
                return (
                  <AnimalAd
                    key={i}
                    ref={itemRefs.current[i]}
                    onInView={handleInView}
                    nowindex={i}
                    animal={item}
                  />
                )
              } else {
                return (
                  <PetpickComments
                    key={i}
                    ref={itemRefs.current[i]}
                    onInView={handleInView}
                    nowindex={i}
                    pet={item}
                  />
                )
              }
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default PetpickPage
