import SirenIcon from "components/common/SirenIcon"
import Button from "components/common/Button"
import {useNavigate} from "react-router-dom"
import animaldata from "./animaldata"
import React, {useState, useEffect} from "react"
import AnimalDetailProfile from "./AnimalDetailProfile"
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
  const [animal, setAnimal] = useState(null)

  useEffect(() => {
    // 실제 데이터를 불러오는 코드로 대체할 수 있습니다.
    const fetchAnimalData = () => {
      const fetchedAnimalData = {
        user_id: animaldata.length + 1, // Assuming this is auto-incremented
        name: "",
        filename: "",
        happen_dt: "",
        kind_cd: "",
        color_cd: "",
        age: "",
        weight: "",
        notice_no: "",
        popfile: "",
        process_state: "",
        sex_cd: "",
        neuter_yn: "",
        special_mark: "",
        care_addr: "",
        notice_comment: "",
        category: 1,
      }

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

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAnimal((prevAnimal) => ({
          ...prevAnimal,
          filename: reader.result, // Set the file preview URL
        }))
      }
      reader.readAsDataURL(file) // Read the file as a data URL
    }
  }

  if (!animal) {
    return <div>Loading...</div>
  }

  const goBack = () => {
    navigate(-1)
  }
  const goModify = () => {
    navigate(`/shelter/modify/${animal.user_id}`)
  }

  const registAnimal = () => {
    console.log(animal)
    animaldata.push(animal)

    navigate(`/shelter/details/${animal.user_id}`)
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
      />
      <div className="flex justify-end">
        <SirenIcon />
      </div>
      <div className="flex justify-end">
        <Button text={"등록하기"} onClick={registAnimal} />
        <Button text={"수정하기"} onClick={goModify} />
        <Button text={"삭제하기"} onClick={goBack} />
      </div>
    </>
  )
}

export default ArticleRegist
