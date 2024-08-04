import React, {useState, useRef, useEffect, useCallback} from "react"
import {useInView} from "react-intersection-observer"
import data from "components/petpick/dummydata"
import PetpickComments from "components/petpick/PetpickComments"

const ScrollableComponent = () => {
  const [index, setIndex] = useState(0)

  const [list, setList] = useState(data) // 초기 데이터 상태

  const containerRef = useRef(null)
  const itemRefs = useRef(list.map(() => React.createRef()))

  const handleInView = (visibleIndex) => {
    setIndex(visibleIndex)
    console.log(list.length)
  }
  // itemRefs의 길이를 데이터 리스트의 길이와 맞추는 함수
  const updateItemRefs = useCallback(() => {
    itemRefs.current = list.map(
      (_, i) => itemRefs.current[i] || React.createRef()
    )
  }, [list])

  useEffect(() => {
    updateItemRefs()
  }, [list, updateItemRefs])
  const loadMoreData = () => {
    const newData = data
    console.log("moredata")
    setList((prevList) => [...prevList, ...newData])
  }
  // Index가 리스트의 마지막에서 두 번째인 경우 데이터를 추가
  useEffect(() => {
    if (index === list.length - 1) {
      loadMoreData()
    }
  }, [index, list])

  //화면 중앙에 보이도록 해줌
  useEffect(() => {
    const container = containerRef.current
    if (container && itemRefs.current[index]?.current) {
      const item = itemRefs.current[index].current
      const containerHeight = container.clientHeight
      const itemHeight = item.clientHeight
      const itemTop = item.offsetTop

      // Scroll to center the item in the container
      container.scrollTo({
        top: itemTop - containerHeight / 2 + itemHeight / 2,
        behavior: "smooth",
      })
    }
  }, [index])

  return (
    <div className="h-screen ">
      <div className="fixed mb-4 text-lg">현재 인덱스: {index}</div>
      <div
        ref={containerRef}
        className="h-screen overflow-y-scroll border border-gray-300"
      >
        {list.map((item, i) => (
          <PetpickComments
            key={i}
            ref={itemRefs.current[i]}
            onInView={handleInView}
            nowindex={i}
            pet={item}
          />
        ))}
      </div>
    </div>
  )
}

const Item = React.forwardRef(({item, onInView, index}, ref) => {
  const {ref: observerRef, inView} = useInView({
    threshold: 0.51, // Trigger when 20% of the item is visible
  })

  useEffect(() => {
    if (inView) {
      onInView(index)
    }
  }, [inView, onInView, index])

  return (
    <div
      ref={(node) => {
        ref.current = node
        observerRef(node)
      }}
      className="flex h-[600px] items-center border  border-gray-300 bg-blue-50"
    >
      <div
        className="flex h-[500px] w-full items-center justify-center border-b
      border-gray-300 bg-gray-50 p-4"
      >
        <div className="text-center text-lg">Item {item}</div>
      </div>
    </div>
  )
})

export default ScrollableComponent

Item.displayName = "Item"
