import React, {useState} from "react"
import SirenIcon from "components/common/SirenIcon"
import Button from "components/common/Button"
import Editor from "components/common/Editor"
import {useNavigate} from "react-router-dom"
import articledata from "./articledata"
import AnimalTag from "components/common/AnimalTag"

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
  const [title, setTitle] = useState(null)
  const [editorContent, setEditorContent] = useState("")
  const [imageSrc, setImageSrc] = useState(null)

  const [selectedAnimalId, setSelectedAnimalId] = useState(null)
  const navigate = useNavigate()

  // 파일 선택 시 호출되는 함수
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      // 파일의 URL을 생성하여 상태에 저장
      const url = URL.createObjectURL(file)
      setImageSrc(url)
    }
  }

  // 돌아가기
  const goBack = () => {
    navigate(-1)
  }

  // 작성하기
  const writeArticle = () => {
    if (editorContent.trim() === "" || !imageSrc) {
      alert("제목과 대표사진을 모두 입력하세요.")
      return
    }

    // 새로운 article 데이터 생성
    const newArticle = {
      id: articledata.length + 1, // 새 ID는 기존 데이터의 길이 + 1
      nickname: "new작성자닉네임", // 실제 작성자의 닉네임으로 수정
      authorImage: "https://via.placeholder.com/30", // 작성자의 프로필 이미지 URL
      category: 1, // 적절한 카테고리로 수정
      title: title, // 적절한 제목으로 수정
      content: editorContent,
      count: 0,
      thumbnail: imageSrc,
      name: "new동물 이름", // 적절한 동물 이름으로 수정
      process_state: "입양중", // 적절한 상태로 수정
      filename: imageSrc, // 업로드된 이미지 URL
    }

    // 새 게시물을 기존의 articledata에 추가
    articledata.push(newArticle)

    // 게시물 상세 페이지로 이동 (ID는 새로운 게시물의 ID)
    navigate(`/communities/details/${newArticle.id}`)
  }

  const resetImage = () => {
    setImageSrc(null)
  }
  const handleAnimalSelect = (id) => {
    setSelectedAnimalId(id)
  }
  return (
    <>
      <button onClick={goBack} className="flex justify-start">
        돌아가기
      </button>
      <input
        className=" rounded-xl border-stroke h-16 border text-center text-4xl font-bold"
        placeholder="제목을 입력하세요"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <hr />
      <Profile nickname={"글쓰는사람닉네임"} />
      <div className="my-2 flex flex-row">
        <img src="/icons/icon-tag.svg" alt="Tag Icon" />
      </div>
      <hr />
      <AnimalTag onSelectAnimalId={handleAnimalSelect} />
      <div> 대표사진</div>

      {/* 이미지 미리보기 */}
      {imageSrc ? (
        <div className="mt-4">
          <img
            src={imageSrc}
            alt="Uploaded Preview"
            className="max-h-96 max-w-96 rounded border"
          />
        </div>
      ) : (
        <div
          className="flex h-64 w-96 flex-col items-center justify-center
      border border-gray-300 px-4 py-2"
        >
          <>대표사진을 입력해주세요.</>
        </div>
      )}
      <div className="flex">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="cursor-pointer items-center"
        />
        {imageSrc && <button onClick={resetImage}> ✖ </button>}
      </div>

      <div className="min-h-72 w-full justify-center">
        <Editor value={editorContent} onChange={setEditorContent} />
      </div>

      <div className="flex justify-end">
        <SirenIcon />
      </div>
      <div className="flex justify-end">
        태그된 동물 번호 {selectedAnimalId}
        <Button text={"작성하기"} onClick={writeArticle} />
        <Button text={"삭제하기"} onClick={goBack} />
      </div>
    </>
  )
}

export default ArticleBoardWrite
