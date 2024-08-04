import SirenIcon from "components/common/SirenIcon"
import Button from "components/common/Button"
import {useLocation, useNavigate, useParams} from "react-router-dom"
import AnimalDetailProfile from "./AnimalDetailProfile"
import {useEffect} from "react"

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

const AnimalDetail = () => {
  const location = useLocation()
  const animal = location.state.animal || {}

  const {animalId} = useParams()
  console.log(animalId)
  const navigate = useNavigate()
  useEffect(() => {
    console.log(animal)
  }, [])
  const goBack = () => {
    navigate(-1)
  }
  const goAnimalModify = (animal) => {
    const animalId =
      animal.desertionNo !== "" ? animal.desertionNo : animal.animalId
    navigate(`/shelter/modify/${animalId}`, {state: {animal}})
  }
  return (
    <>
      <button onClick={goBack} className="flex justify-start">
        돌아가기{" "}
      </button>
      <hr />
      <Profile nickname={"내이름"} />
      <hr />

      <AnimalDetailProfile animal={animal} isEditing={false} />

      <div className="flex justify-end">
        <SirenIcon />
      </div>
      <div className="flex justify-end">
        <Button text={"수정하기"} onClick={() => goAnimalModify(animal)} />
        <Button text={"삭제하기"} onClick={goBack} />
      </div>
    </>
  )
}

export default AnimalDetail
