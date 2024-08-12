import Button from "components/common/Button"
import {useLocation, useNavigate} from "react-router-dom"
import AnimalDetailProfile from "./AnimalDetailProfile"
import React, {useState, useEffect} from "react"
import {editAnimal, removeAnimal} from "api/animals-api"
import DeleteConfirmationModal from "components/common/DeleteConfirmationModal" // 모달 컴포넌트 임포트

const AnimalDetailModify = () => {
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
    console.log("getanimal", getanimal)
  }, [getanimal])

  //사용자가 내용을 수정할때마다 업데이트
  const handleInputChange = (event) => {
    const {name, value} = event.target
    setAnimal((prevAnimal) => ({
      ...prevAnimal,
      [name]: value,
    }))
    console.log("animal", animal)
  }

  const [error, setError] = useState(null)

  // 파일 선택 시 호출되는 함수
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    const maxSizeInBytes = 30 * 1024 * 1024 // 50MB 크기 제한
    if (file.size > maxSizeInBytes) {
      setError("파일 크기는 30MB를 초과할 수 없습니다.")
      return
    }
    if (file) {
      setImageFile(file)
    }
  }

  const goBack = () => {
    navigate(-1)
  }

  //수정하기 버튼 클릭
  const goAnimalModify = async () => {
    if (!validateForm()) {
      console.log("다 안채워짐")
      return
    }
    //수정 다 된 동물정보
    const updateAnimalData = {
      name: animal.name || "",
      species: animal.species || "",
      kindCd: animal.kindCd || "",
      colorCd: animal.colorCd || "",
      age: animal.age || 0,
      weight: animal.weight || 0,
      sexCd: animal.sexCd || "",
      neuterYn: animal.neuterYn || "",
      specialMark: animal.specialMark || "",
      careAddr: animal.careAddr || "",
    }

    console.log("updatedAnimal", updateAnimalData)
    const formData = new FormData()
    formData.append(
      "animalEditRequestDto",
      new Blob([JSON.stringify(updateAnimalData)], {type: "application/json"})
    )
    // 이미지 파일이 변경되지 않았으면 기존 파일을 사용
    console.log("이미지", imageFile)
    console.log("이미지", getanimal.filename)
    if (imageFile) {
      console.log("이미지 바뀜")
      formData.append("imageFile", imageFile)
    } else {
      console.log("이미지 안바뀜")
    }
    try {
      await editAnimal(animal.id, formData)
      alert("동물 정보가 성공적으로 수정되었습니다.")
      navigate(`/shelter/details/${animal.id}`, {
        state: {animal: updateAnimalData},
      })
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
    const requiredFields = [
      "name",
      "species",
      "kindCd",
      "colorCd",
      "age",
      "weight",
      "sexCd",
      "neuterYn",
      "careAddr",
    ]
    const newErrors = {}

    requiredFields.forEach((field) => {
      if (!animal[field]) {
        newErrors[field] = `${field} 필드는 필수입니다.`
      }
    })

    setErrors(newErrors)
    console.log(newErrors)
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

      {error && <p className="text-sm text-red-500">{error}</p>}

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

export default AnimalDetailModify
