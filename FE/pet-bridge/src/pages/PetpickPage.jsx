import React, {useState, useRef, useEffect, useCallback} from "react"
// import {useInView} from "react-intersection-observer"
// import data from "components/petpick/dummydata"
// import PetpickComments from "components/petpick/PetpickComments"
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
// import {getShelterAnimalsAPI} from "api/animals-api"
// import {getMyLocation} from "utils/petpick-utils"

const PetpickPage = () => {
  const [index, setIndex] = useState(0)
  const [list, setList] = useState([]) // list: petpick + 보호소 동물 정보

  const containerRef = useRef(null)
  const itemRefs = useRef(list.map(() => React.createRef()))

  // 현재위치 받아오기

  useEffect(() => {
    // console.log(getMyLocation())
  }, []) // 빈 배열을 넣어 처음 렌더링 될 때만 실행

  const handleInView = (visibleIndex) => {
    setIndex(visibleIndex)
    // console.log(list.length)
  }

  // itemRefs의 길이를 데이터 리스트의 길이와 맞추는 함수
  const updateItemRefs = useCallback(() => {
    itemRefs.current = list.map(
      (_, i) => itemRefs.current[i] || React.createRef()
    )
  }, [list])

  // 초기값 로딩
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const newPetpick = await fetchPetpickData()
    const newAnimals = await fetchAnimalData(6300000)
    let result = []
    const animalsLength = newAnimals?.length
    let animalIndex = 0

    for (let i = 0; i < newPetpick?.length; i++) {
      result.push(newPetpick[i])

      // 각 3개 아이템마다 동물 아이템을 삽입
      if ((i + 1) % 3 === 0 && animalIndex < animalsLength) {
        result.push(newAnimals[animalIndex])
        animalIndex++
      }
    }

    console.log(newAnimals, "animals")
    console.log(result, "result")
    // 데이터 로드 성공시 (응답 배열에 데이터가 있다면)
    if (result && result.length > 0) {
      // 로딩상태 해제, 새로 받아온 값을 배열에 추가
      setList((prevItems) => [...prevItems, ...result])
    }
  }

  // 펫핏 데이터 받아오기
  const fetchPetpickData = async () => {
    try {
      const res = await getRandomDetailPetPick()
      if (res) {
        // console.log("펫픽가져오기 성공", res)

        return res
      } else {
        alert("펫픽 추가 데이터 로드에 실패했습니다.")
      }
    } catch (error) {
      console.error("에러 발생:", error)
      alert("펫픽 데이터 로드 중 에러가 발생했습니다.")
    }
  }

  const fetchAnimalData = async (sidoCode) => {
    //5마리씩 sidoCode 넣어서 보호중(입양가능)인 동물만.
    const searchParams = {
      numOfRows: 5,
      pageNo: 1,
      upr_cd: sidoCode,
      state: "protect",
    }
    const res = await getShelterAnimalsAPI(searchParams)

    if (res.data) {
      return res.data.response.body.items.item
    } else {
      alert("추가 데이터 로드에 실패했습니다.")
    }
  }

  useEffect(() => {
    updateItemRefs()
    console.log(list)
  }, [list, updateItemRefs])

  const loadMoreData = async () => {
    const newData = await fetchData()
    console.log("moredata")
    setList((prevList) => [...prevList, ...newData])
  }
  // Index가 리스트의 마지막에서 두 번째인 경우 데이터를 추가
  useEffect(() => {
    const fetchLikeFollow = async () => {
      try {
        const nowLike = await getDetailPetPickLike(list[index].id)
        const nowFollow = await getDetailFollow(list[index].animalId)
        console.log(nowLike)
        console.log(nowFollow)
        if (nowLike) {
          list[index].isLiking = true
        } else {
          list[index].isLiking = false
        }
        if (nowFollow) {
          list[index].isFollowing = true
        } else {
          list[index].isFollowing = false
        }
        setList(list)
        // console.log(nowLike, nowFollow)
      } catch {
        console.log("catch")
      }
    }
    if (index === list.length - 1) {
      loadMoreData()
    }
    if (list.length > 0) {
      fetchLikeFollow()
    }
  }, [list, index])

  //화면 중앙에 보이도록 해줌
  useEffect(() => {
    const container = containerRef.current
    if (container && itemRefs.current[index]?.current) {
      // const item = itemRefs.current[index].current
      // const containerHeight = container.clientHeight
      // const itemHeight = item.clientHeight + 3
      // const itemTop = item.offsetTop
      // console.log(
      //   itemHeight,
      //   "top : ",
      //   itemTop,
      //   "container",
      //   "height : ",
      //   containerHeight
      // )
      // Scroll to center the item in the container
      // container.scrollTo({
      //   top: itemTop - containerHeight / 2 + itemHeight / 2,
      //   behavior: "smooth",
      // })
    }
  }, [index])

  const navigate = useNavigate()
  const goPetpickWrite = () => {
    navigate(`/petpick/write`)
  }
  const goBack = () => {
    navigate(-1)
  }
  return (
    <div className=" relative h-screen">
      <button
        onClick={goPetpickWrite}
        className="absolute right-20 top-20 flex "
      >
        {" "}
        <img
          src={iconPawprint}
          alt="Community Icon"
          className="mr-2 size-6" // 이미지 크기와 간격 조정
        />
        펫픽 올리기
      </button>
      {/* <div className=" fixed mb-4 text-lg">현재 인덱스: {index}</div> */}
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
        className="h-full snap-y snap-mandatory overflow-y-scroll border border-gray-300 scrollbar-hide"
      >
        {list.map((item, i) => {
          if (i !== 1 && (i + 1) % 4 === 0) {
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
  )
}

export default PetpickPage
