import SirenIcon from "components/common/SirenIcon"
import Button from "components/common/Button"
import data from "./animaldata"
import {useNavigate, useParams} from "react-router-dom"
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

const ArticleDetail = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const animal = data.find((animal) => animal.user_id === Number(id))

  const goBack = () => {
    navigate(-1)
  }
  const goModify = () => {
    navigate(`/shelter/modify/${animal.user_id}`)
  }
  return (
    <>
      <button onClick={goBack} className="flex justify-start">
        돌아가기{" "}
      </button>
      <hr />
      <Profile nickname={animal.name} />
      <hr />

      <AnimalDetailProfile animal={animal} isEditing={false} />

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

export default ArticleDetail
