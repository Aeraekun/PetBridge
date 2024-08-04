import Popover from "./Popover"
import React, {useState} from "react"
import AnimalProfile from "./AnimalProfile"

const AnimalTag = ({onSelectAnimalId}) => {
  const [selectedAnimalId, setSelectedAnimalId] = useState(null)
  const [visible, setVisible] = useState(false)
  let animal = myAnimal.find((animal) => animal.user_id === selectedAnimalId)
  const handleAnimalSelect = (id) => {
    setSelectedAnimalId(id)
    if (onSelectAnimalId) {
      onSelectAnimalId(id)
    }
  }
  const handleVisibilityChange = (isVisible) => {
    setVisible(isVisible)
  }
  return (
    <div className="flex flex-col space-y-6">
      <div className=" flex text-xl">
        동물 태그
        <Popover
          list={myAnimal}
          type={"animal"}
          onSelectAnimal={handleAnimalSelect}
          onVisible={handleVisibilityChange}
        >
          {visible ? (
            <img src="/icons/icon-tag-select.svg" alt="tagIcon" />
          ) : (
            <img src="/icons/icon-tag-select-open.svg" alt="tagIcon" />
          )}
        </Popover>
      </div>
      <div className="h-24 w-96">
        {animal ? (
          <AnimalProfile data={animal} />
        ) : (
          <div>태그된 동물이 없습니다.</div>
        )}
      </div>
    </div>
  )
}
export default AnimalTag

const myAnimal = [
  {
    user_id: 1,
    name: "바둑이",
    filename:
      "http://www.animal.go.kr/files/shelter/2024/07/202407161007876_s.jpg",
    happen_dt: "2024-07-16",
    kind_cd: "[개] 말티즈",
    color_cd: "흰색",
    age: "2023(년생)",
    weight: "3(Kg)",
    notice_no: "경남-거창-2024-00224",
    popfile:
      "http://www.animal.go.kr/files/shelter/2024/07/202407161007876.jpeg",
    processState: "보호중",
    sex_cd: "M",
    neuter_yn: "Y",
    special_mark: "암수동반입소, 순함",
    care_addr: "경상남도 거창군 남상면 수남로 1934-12",
    notice_comment: null,
    category: 0,
  },
  {
    user_id: 2,
    name: "두리",
    filename:
      "http://www.animal.go.kr/files/shelter/2024/07/202407161007877_s.jpg",
    happen_dt: "2024-07-17",
    kind_cd: "[개] 포메라니안",
    color_cd: "검정",
    age: "2022(년생)",
    weight: "4(Kg)",
    notice_no: "경남-거창-2024-00225",
    popfile:
      "http://www.animal.go.kr/files/shelter/2024/07/202407161007877.jpeg",
    processState: "보호중",
    sex_cd: "F",
    neuter_yn: "N",
    special_mark: "순함",
    care_addr: "경상남도 거창군 남상면 수남로 1934-13",
    notice_comment: "건강함",
    category: 0,
  },
  {
    user_id: 3,
    name: "태양",
    filename:
      "http://www.animal.go.kr/files/shelter/2024/07/202407161007878_s.jpg",
    happen_dt: "2024-07-18",
    kind_cd: "[개] 시추",
    color_cd: "갈색",
    age: "2023(년생)",
    weight: "3.5(Kg)",
    notice_no: "경남-거창-2024-00226",
    popfile:
      "http://www.animal.go.kr/files/shelter/2024/07/202407161007878.jpeg",
    processState: "보호중",
    sex_cd: "M",
    neuter_yn: "Y",
    special_mark: "활발",
    care_addr: "경상남도 거창군 남상면 수남로 1934-14",
    notice_comment: null,
    category: 0,
  },
  {
    user_id: 4,
    name: "루비",
    filename:
      "http://www.animal.go.kr/files/shelter/2024/07/202407161007879_s.jpg",
    happen_dt: "2024-07-19",
    kind_cd: "[개] 비숑",
    color_cd: "흰색",
    age: "2022(년생)",
    weight: "4.2(Kg)",
    notice_no: "경남-거창-2024-00227",
    popfile:
      "http://www.animal.go.kr/files/shelter/2024/07/202407161007879.jpeg",
    processState: "보호중",
    sex_cd: "F",
    neuter_yn: "Y",
    special_mark: "사람을 잘 따름",
    care_addr: "경상남도 거창군 남상면 수남로 1934-15",
    notice_comment: "활발함",
    category: 0,
  },
]
