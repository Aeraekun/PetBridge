// import SirenIcon from "components/common/SirenIcon"
// import Button from "components/common/Button"
// // import animaldata from "./animaldata"
// import {useLocation, useNavigate} from "react-router-dom"
// import AnimalDetailProfile from "./AnimalDetailProfile"
// import React, {useState, useEffect} from "react"
// import {editAnimal, removeAnimal} from "api/animals-api"

// const ArticleDetailModify = () => {
//   const navigate = useNavigate()
//   const [animal, setAnimal] = useState(null)
//   const location = useLocation()
//   const [imageFile, setImageFile] = useState(null)
//   const getanimal = location.state.animal || {}
//   const [errors, setErrors] = useState({})

//   //초기값으로
//   useEffect(() => {
//     if (getanimal) {
//       setAnimal(getanimal)
//     }
//   }, [])

//   const handleInputChange = (event) => {
//     const {name, value} = event.target
//     setAnimal((prevAnimal) => ({
//       ...prevAnimal,
//       [name]: value,
//     }))
//   }
//   if (!animal) {
//     return <div>Loading...</div>
//   }
//   const goBack = () => {
//     navigate(-1)
//   }

//   const handleFileChange = (event) => {
//     const file = event.target.files[0]
//     if (file) {
//       // const reader = new FileReader()
//       // reader.onloadend = () => {
//       //   setAnimal((prevAnimal) => ({
//       //     ...prevAnimal,
//       //     filename: reader.result, // Set the file preview URL
//       //   }))
//       // }
//       // reader.readAsDataURL(file) // Read the file as a data URL
//       setImageFile(file)
//     }
//   }

//   const goAnimalModify = async () => {
//     if (!validateForm()) {
//       return
//     }

//     const newAnimal = animal
//     console.log(animal)
//     //formData로 file이랑 animal 정보 한번에 넘김.
//     const formData = new FormData()
//     formData.append(
//       "animalEditRequestDto",
//       new Blob([JSON.stringify(newAnimal)], {type: "application/json"})
//     )
//     if (imageFile) {
//       formData.append("imageFile", imageFile)
//     }
//     try {
//       console.log(animal.id, "id")
//       await editAnimal(animal.id, formData)
//       // navigate(`/shelter/1`)
//       alert("동물등록성공")
//     } catch (e) {
//       console.error(e)
//     }

//     // navigate(`/shelter/details/${animal.id}`)
//   }
//   const goDeleteAnimal = async () => {
//     await removeAnimal(animal.id)
//   }

//   const validateForm = () => {
//     const requiredFields = ["name", "species", "age"]
//     const newErrors = {}

//     requiredFields.forEach((field) => {
//       if (!animal[field]) {
//         newErrors[field] = `${field} 필드는 필수입니다.`
//       }
//     })

//     if (!imageFile) {
//       newErrors.imageFile = "이미지를 업로드해주세요."
//     }

//     setErrors(newErrors)
//     console.log(newErrors)
//     return Object.keys(newErrors).length === 0
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
//         isEditing={true}
//         onInputChange={handleInputChange}
//         onFileChange={handleFileChange}
//         isShelter={false}
//         errors={errors}
//       />

//       <div className="flex justify-end">
//         <SirenIcon />
//       </div>
//       <div className="flex justify-end">
//         <Button text={"수정하기"} onClick={goAnimalModify} />
//         <Button
//           text={"삭제하기"}
//           onClick={() => {
//             goDeleteAnimal(animal.id)
//           }}
//         />
//         <Button text={"취소하기"} onClick={goBack} />
//       </div>
//     </>
//   )
// }

// export default ArticleDetailModify

import SirenIcon from "components/common/SirenIcon"
import Button from "components/common/Button"
import {useLocation, useNavigate} from "react-router-dom"
import AnimalDetailProfile from "./AnimalDetailProfile"
import React, {useState, useEffect} from "react"
import {editAnimal, removeAnimal} from "api/animals-api"
import DeleteConfirmationModal from "components/common/DeleteConfirmationModal" // 모달 컴포넌트 임포트

const ArticleDetailModify = () => {
  const navigate = useNavigate()
  const [animal, setAnimal] = useState(null)
  const location = useLocation()
  const [imageFile, setImageFile] = useState(null)
  const getanimal = location.state.animal || {}
  const [errors, setErrors] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false) // 모달 열림 상태
  const [animalToDelete, setAnimalToDelete] = useState(null) // 삭제할 동물 정보

  // 초기값으로 설정
  useEffect(() => {
    if (getanimal) {
      setAnimal(getanimal)
    }
  }, [getanimal])

  const handleInputChange = (event) => {
    const {name, value} = event.target
    setAnimal((prevAnimal) => ({
      ...prevAnimal,
      [name]: value,
    }))
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImageFile(file)
    }
  }

  const goBack = () => {
    navigate(-1)
  }

  const goAnimalModify = async () => {
    if (!validateForm()) {
      return
    }

    const newAnimal = animal
    console.log(animal)
    const formData = new FormData()
    formData.append(
      "animalEditRequestDto",
      new Blob([JSON.stringify(newAnimal)], {type: "application/json"})
    )
    if (imageFile) {
      formData.append("imageFile", imageFile)
    }
    try {
      console.log(animal.id, "id")
      await editAnimal(animal.id, formData)
      alert("동물 등록 성공")
      navigate(`/shelter/details/${animal.id}`)
    } catch (e) {
      console.error(e)
    }
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

  const validateForm = () => {
    const requiredFields = ["name", "species", "age"]
    const newErrors = {}

    requiredFields.forEach((field) => {
      if (!animal[field]) {
        newErrors[field] = `${field} 필드는 필수입니다.`
      }
    })

    if (!imageFile) {
      newErrors.imageFile = "이미지를 업로드해주세요."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  if (!animal) {
    return <div>Loading...</div>
  }

  return (
    <>
      <button onClick={goBack} className="flex justify-start">
        돌아가기
      </button>
      <hr />
      <hr />

      <AnimalDetailProfile
        animal={animal}
        isEditing={true}
        onInputChange={handleInputChange}
        onFileChange={handleFileChange}
        isShelter={false}
        errors={errors}
      />

      <div className="flex justify-end">
        <SirenIcon />
      </div>
      <div className="flex justify-end">
        <Button text={"수정하기"} onClick={goAnimalModify} />
        <Button text={"삭제하기"} onClick={openDeleteModal} />
        <Button text={"취소하기"} onClick={goBack} />
      </div>

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </>
  )
}

export default ArticleDetailModify
