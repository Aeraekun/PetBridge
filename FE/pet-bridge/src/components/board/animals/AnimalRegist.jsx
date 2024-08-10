import Button from "components/common/Button"
import {useNavigate} from "react-router-dom"
// import animaldata from "./animaldata"
import React, {useState, useEffect} from "react"
import AnimalDetailProfile from "./AnimalDetailProfile"
import {registAnimal} from "api/animals-api"

const AnimalRegist = () => {
  const navigate = useNavigate()
  const [animal, setAnimal] = useState({})
  const [imageFile, setImageFile] = useState(null)
  const [errors, setErrors] = useState({})
  useEffect(() => {
    // 실제 데이터를 불러오는 코드로 대체할 수 있습니다.
    const fetchAnimalData = () => {
      const fetchedAnimalData = {
        name: "",
        species: "",
        kindCd: "",
        colorCd: "",
        age: 0,
        weight: 0,
        sexCd: "",
        neuterYn: "",
        specialMark: "",
        careAddr: "",
      }

      setAnimal(fetchedAnimalData)
      console.log("F", fetchedAnimalData)
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

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      // const reader = new FileReader()
      // reader.onloadend = () => {
      //   setAnimal((prevAnimal) => ({
      //     ...prevAnimal,
      //     filename: reader.result, // Set the file preview URL
      //   }))
      // }
      // reader.readAsDataURL(file) // Read the file as a data URL
      setImageFile(file)
    }
  }

  if (!animal) {
    return <div>Loading...</div>
  }

  const goBack = () => {
    navigate(-1)
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

    if (!imageFile) {
      newErrors.imageFile = "이미지를 업로드해주세요."
    }

    setErrors(newErrors)
    console.log(newErrors)
    return Object.keys(newErrors).length === 0
  }
  const regist = async () => {
    if (!validateForm()) {
      return
    }
    const newAnimal = animal
    console.log(newAnimal)
    //formData로 file이랑 animal 정보 한번에 넘김.
    const formData = new FormData()
    formData.append(
      "animalRegistRequestDto",
      new Blob([JSON.stringify(newAnimal)], {type: "application/json"})
    )
    if (imageFile) {
      formData.append("imageFile", imageFile)
    }
    try {
      await registAnimal(formData)
      console.log("등록한", newAnimal)
      // alert("동물등록성공")
      let path = `/shelter/1`
      navigate(path, {state: {newAnimal}})
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <>
      <button onClick={goBack} className="flex justify-start">
        돌아가기{" "}
      </button>
      <div className="text-2xl">내 동물 등록하기</div>
      {/* <Profile nickname={animal.name} /> */}
      <hr />

      <AnimalDetailProfile
        animal={animal}
        isEditing={true}
        onInputChange={handleInputChange}
        onFileChange={handleFileChange}
        isShelter={false}
        errors={errors}
      />
      {Object.keys(errors).length > 0 && (
        <div className="mt-4 text-red-500">
          {Object.values(errors).map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}
      <div className="flex justify-end">
        <Button text={"등록하기"} onClick={regist} />
        <Button text={"삭제하기"} onClick={goBack} />
      </div>
    </>
  )
}

export default AnimalRegist
