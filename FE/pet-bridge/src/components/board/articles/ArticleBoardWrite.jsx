import SirenIcon from "components/common/SirenIcon"
import Button from "components/common/Button"
// import data from "./articledata"
import {useNavigate} from "react-router-dom"

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

const ArticleBoardWrite = () => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }
  const goModify = () => {
    navigate(-1)
  }
  return (
    <>
      <button onClick={goBack}>돌아가기 </button>
      <input
        className="text-stroke border-stroke border text-center text-4xl font-bold "
        placeholder="제목을 입력하세요"
      ></input>
      <hr />
      <Profile nickname={"글쓰는사람닉네임"} />
      <div className="my-2 flex flex-row">
        <img src="/icons/icon-tag.svg" alt="Tag Icon" />
      </div>
      <hr />
      <div className="min-h-72 w-11/12">내용</div>

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

export default ArticleBoardWrite
