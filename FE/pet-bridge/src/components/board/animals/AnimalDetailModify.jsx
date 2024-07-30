import SirenIcon from "components/common/SirenIcon"
import Button from "components/common/Button"
import animaldata from "./animaldata"
import {useNavigate, useParams} from "react-router-dom"

import React, {useState, useEffect} from "react"

const Profile = ({nickname}) => {
  return (
    <div className="mb-4 flex h-8 items-center justify-around space-x-2.5">
      <img
        src="https://via.placeholder.com/50"
        alt="Author Avatar"
        className="size-12 rounded-full border "
      />
      <div className="flex-1">
        <p className="text-lg font-semibold">{nickname}</p>
      </div>
    </div>
  )
}
const AnimalDetailProfile = ({animal, isEditing, onInputChange}) => {
  return (
    <div className="flex">
      <div className="flex flex-row">
        {/* Animal Image */}
        <img
          src={animal.filename}
          alt="animal profile"
          className="size-[500px] object-cover"
        />
        <div className="ml-4 flex flex-col space-y-4">
          {/* Animal Details */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center">
              <label htmlFor="name" className="w-32">
                이름
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={animal.name}
                  onChange={onInputChange}
                  className="bg-mild w-full rounded border p-2"
                />
              ) : (
                <div
                  id="name"
                  name="name"
                  className="bg-mild w-full rounded border p-2"
                >
                  {animal.name}
                </div>
              )}
            </div>
            <div className="flex items-center">
              <label htmlFor="notice_no" className="w-32">
                공고번호
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="notice_no"
                  name="notice_no"
                  value={animal.notice_no}
                  onChange={onInputChange}
                  className="bg-mild w-full rounded border p-2"
                />
              ) : (
                <div
                  id="notice_no"
                  name="notice_no"
                  className="bg-mild w-full rounded border p-2"
                >
                  {animal.notice_no}
                </div>
              )}
            </div>
            <div className="flex items-center">
              <label htmlFor="sex_cd" className="w-32">
                성별
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="sex_cd"
                  name="sex_cd"
                  value={animal.sex_cd}
                  onChange={onInputChange}
                  className="bg-mild w-full rounded border p-2"
                />
              ) : (
                <div
                  id="sex_cd"
                  name="sex_cd"
                  className="bg-mild w-full rounded border p-2"
                >
                  {animal.sex_cd}
                </div>
              )}
            </div>
            <div className="flex items-center">
              <label htmlFor="age" className="w-32">
                나이
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={animal.age}
                  onChange={onInputChange}
                  className="bg-mild w-full rounded border p-2"
                />
              ) : (
                <div
                  id="age"
                  name="age"
                  className="bg-mild w-full rounded border p-2"
                >
                  {animal.age}
                </div>
              )}
            </div>
            <div className="flex items-center">
              <label htmlFor="notice_comment" className="w-32">
                특징
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="notice_comment"
                  name="notice_comment"
                  value={animal.notice_comment || ""}
                  onChange={onInputChange}
                  className="bg-mild w-full rounded border p-2"
                />
              ) : (
                <div
                  id="notice_comment"
                  name="notice_comment"
                  className="bg-mild w-full rounded border p-2"
                >
                  {animal.notice_comment || "정보 없음"}
                </div>
              )}
            </div>
            <div className="flex items-center">
              <label htmlFor="kind_cd" className="w-32">
                종류
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="kind_cd"
                  name="kind_cd"
                  value={animal.kind_cd}
                  onChange={onInputChange}
                  className="bg-mild w-full rounded border p-2"
                />
              ) : (
                <div
                  id="kind_cd"
                  name="kind_cd"
                  className="bg-mild w-full rounded border p-2"
                >
                  {animal.kind_cd}
                </div>
              )}
            </div>
            <div className="flex items-center">
              <label htmlFor="color_cd" className="w-32">
                색상
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="color_cd"
                  name="color_cd"
                  value={animal.color_cd}
                  onChange={onInputChange}
                  className="bg-mild w-full rounded border p-2"
                />
              ) : (
                <div
                  id="color_cd"
                  name="color_cd"
                  className="bg-mild w-full rounded border p-2"
                >
                  {animal.color_cd}
                </div>
              )}
            </div>
            <div className="flex items-center">
              <label htmlFor="weight" className="w-32">
                체중
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="weight"
                  name="weight"
                  value={animal.weight}
                  onChange={onInputChange}
                  className="bg-mild w-full rounded border p-2"
                />
              ) : (
                <div
                  id="weight"
                  name="weight"
                  className="bg-mild w-full rounded border p-2"
                >
                  {animal.weight}
                </div>
              )}
            </div>
            <div className="flex items-center">
              <label htmlFor="process_state" className="w-32">
                보호 상태
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="process_state"
                  name="process_state"
                  value={animal.process_state}
                  onChange={onInputChange}
                  className="bg-mild w-full rounded border p-2"
                />
              ) : (
                <div
                  id="process_state"
                  name="process_state"
                  className="bg-mild w-full rounded border p-2"
                >
                  {animal.process_state}
                </div>
              )}
            </div>
            <div className="flex items-center">
              <label htmlFor="neuter_yn" className="w-32">
                중성화 여부
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="neuter_yn"
                  name="neuter_yn"
                  value={animal.neuter_yn}
                  onChange={onInputChange}
                  className="bg-mild w-full rounded border p-2"
                />
              ) : (
                <div
                  id="neuter_yn"
                  name="neuter_yn"
                  className="bg-mild w-full rounded border p-2"
                >
                  {animal.neuter_yn}
                </div>
              )}
            </div>
            <div className="flex items-center">
              <label htmlFor="special_mark" className="w-32">
                특별 마크
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="special_mark"
                  name="special_mark"
                  value={animal.special_mark}
                  onChange={onInputChange}
                  className="bg-mild w-full rounded border p-2"
                />
              ) : (
                <div
                  id="special_mark"
                  name="special_mark"
                  className="bg-mild w-full rounded border p-2"
                >
                  {animal.special_mark}
                </div>
              )}
            </div>
            <div className="flex items-center">
              <label htmlFor="care_addr" className="w-32">
                주소
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="care_addr"
                  name="care_addr"
                  value={animal.care_addr}
                  onChange={onInputChange}
                  className="bg-mild w-full rounded border p-2"
                />
              ) : (
                <div
                  id="care_addr"
                  name="care_addr"
                  className="bg-mild w-full rounded border p-2"
                >
                  {animal.care_addr}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ArticleDetailModify = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [animal, setAnimal] = useState(null)

  useEffect(() => {
    // 실제 데이터를 불러오는 코드로 대체할 수 있습니다.
    const fetchAnimalData = () => {
      const fetchedAnimalData = animaldata.find(
        (animal) => animal.user_id === Number(id)
      )
      console.log("now : ", fetchedAnimalData)

      setAnimal(fetchedAnimalData)
    }

    fetchAnimalData()
  }, [])

  const handleInputChange = (event) => {
    const {name, value} = event.target
    setAnimal((prevAnimal) => ({
      ...prevAnimal,
      [name]: value,
    }))
  }
  if (!animal) {
    return <div>Loading...</div>
  }
  const goBack = () => {
    navigate(-1)
  }
  const goModify = () => {
    navigate(-1)
    console.log(animal)
    animaldata[animal.user_id] = animal
    navigate(`/shelter/details/${animal.user_id}`)
  }
  return (
    <>
      <button onClick={goBack} className="flex justify-start">
        돌아가기{" "}
      </button>
      <hr />
      <Profile nickname={animal.name} />
      <hr />

      <AnimalDetailProfile
        animal={animal}
        isEditing={true}
        onInputChange={handleInputChange}
      />

      <div className="flex justify-end">
        <SirenIcon />
      </div>
      <div className="flex justify-end">
        <Button text={"수정하기"} onClick={goModify} />
        <Button text={"삭제하기"} onClick={goBack} />
      </div>
    </>
  )
}

export default ArticleDetailModify
