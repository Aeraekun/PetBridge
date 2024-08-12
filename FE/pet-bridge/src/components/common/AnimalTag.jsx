import Popover from "./Popover"
import {useEffect, useState} from "react"
// import AnimalProfile from "./AnimalProfile"
import {getMyAnimals} from "api/mypage-api"

const AnimalTag = ({
  onSelectAnimalId,
  onSelectAnimalName,
  alreadySelectedAnimalId,
}) => {
  const [selectedAnimalId, setSelectedAnimalId] = useState(null)
  const [visible, setVisible] = useState(false)
  const [myAnimals, setMyAnimals] = useState([])
  const [selectedAnimal, setSelectedAnimal] = useState(alreadySelectedAnimalId)

  // 내 동물 불러오기
  useEffect(() => {
    const initAnimals = async () => {
      try {
        const res = await getMyAnimals({page: 0, size: 12})
        console.log("내 동물", res.data)
        if (res.data) {
          setMyAnimals(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    initAnimals()
  }, [])

  //내 동물을 불러온 후 이미 선택된 동물이 있을때 업데이트
  useEffect(() => {
    if (alreadySelectedAnimalId && myAnimals.length > 0) {
      const newAnimal = myAnimals.find(
        (animal) => animal.id === alreadySelectedAnimalId
      )
      if (newAnimal) {
        setSelectedAnimal(newAnimal)
        setSelectedAnimalId(alreadySelectedAnimalId) // ID도 함께 업데이트
      }
    }
  }, [alreadySelectedAnimalId, myAnimals])

  useEffect(() => {
    const newAnimal = myAnimals.find((animal) => animal.id === selectedAnimalId)
    if (newAnimal) {
      setSelectedAnimal(newAnimal)
    }
    console.log("id", selectedAnimalId)
  }, [selectedAnimalId, myAnimals])

  useEffect(() => {
    console.log("myAnimals", myAnimals)
  }, [myAnimals])

  const handleAnimalSelect = (id) => {
    setSelectedAnimalId(id)
    console.log("animal id", id)
    if (onSelectAnimalId) {
      onSelectAnimalId(id)
    }
    if (!id) {
      setSelectedAnimal(null)
    }

    if (onSelectAnimalName) {
      const animal = myAnimals.find((animal) => animal.id === id)
      if (animal) {
        onSelectAnimalName(animal.name)
      }
    }
  }
  const handleVisibilityChange = (isVisible) => {
    setVisible(isVisible)
  }

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center">
        <div className="text-xl"> 동물 태그 </div>
        <Popover
          list={myAnimals}
          type={"animal"}
          onSelectAnimal={handleAnimalSelect}
          onVisible={handleVisibilityChange}
        >
          <div className=" flex flex-row">
            {visible ? (
              <img src="/icons/icon-tag-select.svg" alt="tagIcon" />
            ) : (
              <img src="/icons/icon-tag-select-open.svg" alt="tagIcon" />
            )}{" "}
            {!selectedAnimal && (
              <span className="text-red">태그할 동물을 골라주세요</span>
            )}
          </div>
        </Popover>
      </div>
      <div className="h-32 w-96">
        {selectedAnimal ? (
          <div className="flex justify-between space-x-2 rounded bg-green-50 p-2">
            <div className="flex w-full space-x-3">
              <div className="flex flex-col justify-center">
                <img
                  src={selectedAnimal.filename}
                  className="size-24 rounded-full object-cover "
                  alt="animalImage"
                />
              </div>
              <div className=" flex flex-col space-y-0 overflow-hidden">
                <div className=" flex ">
                  <div className="mr-3 w-20">이름</div>
                  <div className="w-full ">{selectedAnimal.name}</div>
                </div>
                <div className=" flex ">
                  <div className="mr-3 w-20 ">품종</div>
                  <div className="w-full ">{selectedAnimal.kindCd}</div>
                </div>
                <div className=" flex ">
                  <div className="mr-3 w-20">성별</div>
                  <div className="w-full ">
                    {selectedAnimal.sexCd === "F"
                      ? "암컷"
                      : selectedAnimal.sexCd === "M"
                        ? "수컷"
                        : "미상"}
                  </div>
                </div>
                <div className=" flex ">
                  <div className="mr-3 w-20">나이</div>
                  <div className="w-full ">{selectedAnimal.age} 년생</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>태그된 동물이 없습니다.</div>
        )}
      </div>
    </div>
  )
}
export default AnimalTag
