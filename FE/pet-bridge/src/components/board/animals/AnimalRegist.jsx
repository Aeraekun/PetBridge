import SirenIcon from "components/common/SirenIcon"
import Button from "components/common/Button"
import {useNavigate} from "react-router-dom"
// import animaldata from "./animaldata"
import React, {useState, useEffect} from "react"
import AnimalDetailProfile from "./AnimalDetailProfile"
import {registAnimal} from "api/animals-api"
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

const ArticleRegist = () => {
  const navigate = useNavigate()
  const [animal, setAnimal] = useState({})
  const [newA, setNewA] = useState([])
  const [imageFile, setImageFile] = useState(null)
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

  const regist = async () => {
    setNewA(animal)
    const newAnimal = newA

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
      console.log(animal)
      // navigate(`/shelter/1`)
      alert("동물등록성공")
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <>
      <button onClick={goBack} className="flex justify-start">
        돌아가기{" "}
      </button>
      <Profile nickname={animal.name} />
      <hr />

      <AnimalDetailProfile
        animal={animal}
        isEditing={true}
        onInputChange={handleInputChange}
        onFileChange={handleFileChange}
        isShelter={false}
      />
      <div className="flex justify-end">
        <SirenIcon />
      </div>
      <div className="flex justify-end">
        <Button text={"등록하기"} onClick={regist} />
        <Button text={"삭제하기"} onClick={goBack} />
      </div>
    </>
  )
}

export default ArticleRegist
