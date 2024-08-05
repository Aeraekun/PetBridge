import SirenIcon from "components/common/SirenIcon"
import Button from "components/common/Button"
// import animaldata from "./animaldata"
import {useLocation, useNavigate} from "react-router-dom"
import AnimalDetailProfile from "./AnimalDetailProfile"
import React, {useState, useEffect} from "react"
import {editAnimal, removeAnimal} from "api/animals-api"

const ArticleDetailModify = () => {
  const navigate = useNavigate()
  const [animal, setAnimal] = useState(null)
  const location = useLocation()
  const [imageFile, setImageFile] = useState(null)
  const getanimal = location.state.animal || {}
  const [errors, setErrors] = useState({})

  //초기값으로
  useEffect(() => {
    if (getanimal) {
      setAnimal(getanimal)
    }
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

  const goAnimalModify = async () => {
    if (!validateForm()) {
      return
    }

    const newAnimal = animal
    console.log(animal)
    //formData로 file이랑 animal 정보 한번에 넘김.
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
      // navigate(`/shelter/1`)
      alert("동물등록성공")
    } catch (e) {
      console.error(e)
    }

    // navigate(`/shelter/details/${animal.id}`)
  }
  const goDeleteAnimal = async () => {
    await removeAnimal(animal.id)
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
    console.log(newErrors)
    return Object.keys(newErrors).length === 0
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
        <Button
          text={"삭제하기"}
          onClick={() => {
            goDeleteAnimal(animal.id)
          }}
        />
        <Button text={"취소하기"} onClick={goBack} />
      </div>
    </>
  )
}

export default ArticleDetailModify
