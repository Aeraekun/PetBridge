import SirenIcon from "components/common/SirenIcon"
import Button from "components/common/Button"
import {useLocation, useNavigate, useParams} from "react-router-dom"
import AnimalDetailProfile from "./AnimalDetailProfile"
import {useEffect} from "react"
import {useSelector} from "react-redux"
import {selectId} from "features/user/users-slice"

const AnimalDetail = ({isShelter}) => {
  const currentUserId = useSelector(selectId)
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
      <hr />

      <AnimalDetailProfile
        animal={animal}
        isEditing={false}
        isShelter={isShelter}
      />

      {!isShelter && Number(currentUserId) === Number(animal.userId) ? (
        <div className="flex justify-end">
          <Button text={"수정하기"} onClick={() => goAnimalModify(animal)} />
          <Button text={"삭제하기"} onClick={goBack} />
        </div>
      ) : (
        <>
          <div className="flex justify-end">
            <SirenIcon />
          </div>
        </>
      )}
    </>
  )
}

export default AnimalDetail
