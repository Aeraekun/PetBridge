import SirenIcon from "components/common/SirenIcon"
import Button from "components/common/Button"
import animaldata from "./animaldata"
import {useNavigate, useParams} from "react-router-dom"
import AnimalDetailProfile from "./AnimalDetailProfile"
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
