import React, {useState} from "react"
import SirenIcon from "components/common/SirenIcon"
import Button from "components/common/Button"
import Editor from "components/common/Editor"
import {useNavigate} from "react-router-dom"

const Profile = ({nickname}) => {
  return (
    <div className="mb-4 flex h-8 items-center justify-around space-x-2.5">
      <img
        src="https://via.placeholder.com/50"
        alt="Author Avatar"
        className="size-12 rounded-full border"
      />
      <div className="flex-1">
        <p className="text-lg font-semibold">{nickname}</p>
      </div>
    </div>
  )
}

const ArticleBoardWrite = () => {
  const [editorContent, setEditorContent] = useState("")
  const navigate = useNavigate()

  // 돌아가기
  const goBack = () => {
    navigate(-1)
  }

  // 작성하기
  const writeArticle = () => {
    console.log("작성된 내용:", editorContent)
  }

  return (
    <>
      <button onClick={goBack}>돌아가기</button>
      <input
        className="text-stroke border-stroke border text-center text-4xl font-bold"
        placeholder="제목을 입력하세요"
      />
      <hr />
      <Profile nickname={"글쓰는사람닉네임"} />
      <div className="my-2 flex flex-row">
        <img src="/icons/icon-tag.svg" alt="Tag Icon" />
      </div>
      <hr />
      <div className="min-h-72 w-11/12">
        <Editor value={editorContent} onChange={setEditorContent} />
      </div>

      <div className="flex justify-end">
        <SirenIcon />
      </div>
      <div className="flex justify-end">
        <Button text={"작성하기"} onClick={writeArticle} />
        <Button text={"삭제하기"} onClick={goBack} />
      </div>
    </>
  )
}

export default ArticleBoardWrite
