// import SirenIcon from "components/common/SirenIcon"
// import Button from "components/common/Button"
// import {useLocation, useNavigate, useParams} from "react-router-dom"
// import AnimalDetailProfile from "./AnimalDetailProfile"
// import {useEffect} from "react"
// import {useSelector} from "react-redux"
// import {selectId} from "features/user/users-slice"
// import {removeAnimal} from "api/animals-api"

// const AnimalDetail = ({isShelter}) => {
//   const currentUserId = useSelector(selectId)
//   const location = useLocation()
//   const animal = location.state.animal || {}

//   const {animalId} = useParams()
//   console.log(animalId)
//   const navigate = useNavigate()
//   useEffect(() => {
//     console.log(animal)
//   }, [])
//   const goBack = () => {
//     navigate(-1)
//   }
//   const goAnimalModify = (animal) => {
//     const animalId = animal.desertionNo ? animal.desertionNo : animal.id
//     navigate(`/shelter/modify/${animalId}`, {state: {animal}})
//   }
//   const goDeleteAnimal = async () => {
//     await removeAnimal(animal.id)
//     navigate(`/shelter/1`)
//   }
//   return (
//     <>
//       <button onClick={goBack} className="flex justify-start">
//         돌아가기{" "}
//       </button>
//       <hr />
//       <hr />

//       <AnimalDetailProfile
//         animal={animal}
//         isEditing={false}
//         isShelter={isShelter}
//       />

//       {!isShelter && Number(currentUserId) === Number(animal.userId) ? (
//         <div className="flex justify-end">
//           <Button text={"수정하기"} onClick={() => goAnimalModify(animal)} />
//           <Button
//             text={"삭제하기"}
//             onClick={() => {
//               goDeleteAnimal(animal.id)
//             }}
//           />
//         </div>
//       ) : (
//         <>
//           <div className="flex justify-end">
//             <SirenIcon />
//           </div>
//         </>
//       )}
//     </>
//   )
// }

// export default AnimalDetail

import React, {useState, useEffect} from "react"
import {useLocation, useNavigate} from "react-router-dom"

import {useSelector} from "react-redux"
import {selectId} from "features/user/users-slice"
import {removeAnimal} from "api/animals-api"
import AnimalDetailProfile from "./AnimalDetailProfile"
import Button from "components/common/Button"
import DeleteConfirmationModal from "components/common/DeleteConfirmationModal"
import Profile from "components/common/Profile"

const AnimalDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false) // 모달 열림 상태
  const [animalToDelete, setAnimalToDelete] = useState(null) // 삭제할 동물 정보

  const currentUserId = useSelector(selectId)
  const location = useLocation()
  const animal = location.state.animal || {}

  useEffect(() => {
    console.log("Animal data received:", location.state.animal)
  }, [location.state.animal])
  const [isShelter, setIsShelter] = useState(false)
  useEffect(() => {
    console.log(animal)
    const id = animal.desertionNo ? animal.desertionNo : animal.id
    if (id > 40000000) {
      setIsShelter(true)
    }
  }, [animal])

  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  const goAnimalModify = (animal) => {
    const id = animal.desertionNo ? animal.desertionNo : animal.id
    navigate(`/shelter/modify/${id}`, {state: {animal}})
  }

  const openDeleteModal = () => {
    setAnimalToDelete(animal) // 삭제할 동물 정보를 설정
    setIsModalOpen(true) // 모달 열기
  }

  const closeDeleteModal = () => {
    setIsModalOpen(false) // 모달 닫기
    setAnimalToDelete(null) // 삭제할 동물 정보 초기화
  }

  const confirmDelete = async () => {
    if (animalToDelete) {
      await removeAnimal(animalToDelete.id) // 동물 삭제 API 호출
      navigate(`/shelter/1`) // 삭제 후 이동할 페이지
    }
    closeDeleteModal() // 모달 닫기
  }

  return (
    <>
      <button onClick={goBack} className="flex justify-start">
        돌아가기
      </button>
      <hr />
      {!isShelter && (
        <>
          <Profile
            image={animal.userImage}
            nickname={animal.userNickname}
            isMe={Number(currentUserId) === Number(animal.userId)}
          />
          <hr />
        </>
      )}

      <AnimalDetailProfile
        animal={animal}
        isEditing={false}
        isShelter={isShelter}
      />

      {!isShelter && Number(currentUserId) === Number(animal.userId) ? (
        <div className="flex justify-end">
          <Button text={"수정하기"} onClick={() => goAnimalModify(animal)} />
          <Button text={"삭제하기"} onClick={openDeleteModal} />
        </div>
      ) : (
        <div className="flex justify-end"></div>
      )}

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </>
  )
}

export default AnimalDetail
