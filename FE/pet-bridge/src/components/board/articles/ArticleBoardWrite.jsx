import React, {useState} from "react"
import SirenIcon from "components/common/SirenIcon"
import Button from "components/common/Button"
import Editor from "components/common/Editor"
import {useNavigate} from "react-router-dom"
import AnimalTag from "components/common/AnimalTag"
import {
  selectId,
  selectImage,
  selectNickname,
  selectRole,
} from "features/user/users-slice"
import {useSelector} from "react-redux"
import {registArticle} from "api/boards-api"
import Profile from "components/common/Profile"
import {Toast} from "utils/common-utils"

const ArticleBoardWrite = () => {
  const [title, setTitle] = useState(null)
  const [editorContent, setEditorContent] = useState("")
  const [imageSrc, setImageSrc] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [selectedAnimalId, setSelectedAnimalId] = useState(null)
  const navigate = useNavigate()

  const currentUserImage = useSelector(selectImage)
  const currentUserNickname = useSelector(selectNickname)
  const currentUserId = useSelector(selectId)

  const isAdmin = useSelector(selectRole) === "ADMIN"
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
      // 파일의 URL을 생성하여 상태에 저장
      const url = URL.createObjectURL(file)
      setImageSrc(url)
      // 파일
      setImageFile(file)
    }
  }

  // 돌아가기
  const goBack = () => {
    navigate(-1)
  }

  const [type, setType] = useState("FREE")

  const handleTypeChange = (event) => {
    const selectedType = event.target.value
    setType(selectedType)
  }

  // 작성하기
  const writeArticle = async () => {
    if (editorContent.trim() === "" || !title) {
      Toast.fire({icon: "warning", title: "제목과 내용을 모두 입력해주세요."})
      return
    }
    const newArticle = {
      animalId: selectedAnimalId,
      type: type,
      title: title,
      content: editorContent,
    }

    //formData로 file이랑 article 정보 한번에 넘김.
    const formData = new FormData()
    formData.append(
      "boardRegistRequestDto",
      new Blob([JSON.stringify(newArticle)], {type: "application/json"})
    )
    if (imageFile) {
      formData.append("thumbnail", imageFile)
    }

    try {
      await registArticle(formData)
      alert("글 등록 완료")
      navigate(`/communities`)
    } catch (e) {
      console.error(e)
    }
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
        className=" border-stroke h-16 rounded-xl border text-center text-4xl font-bold"
        placeholder="제목을 입력하세요"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <hr />
      <Profile
        nickname={currentUserNickname}
        image={currentUserImage}
        userId={currentUserId}
        isMe={true}
      />
      <div className="my-2 flex flex-row">
        <img src="/icons/icon-tag.svg" alt="Tag Icon" />
      </div>
      <hr />

      <label
        htmlFor="type"
        className="mb-2 block  text-xl font-medium text-gray-700"
      >
        게시판 선택
      </label>
      <select
        id="type"
        value={type}
        onChange={handleTypeChange}
        className=" block w-64 rounded-md border border-gray-300 bg-white px-3 py-4 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
      >
        <option value="PROMOTION">입양홍보</option>
        <option value="REVIEW">입양후기</option>
        <option value="FREE">자유게시판</option>
        {isAdmin && <option value="NOTICE">공지사항</option>}
      </select>
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
      <div className="relative flex">
        <input
          type="file"
          onChange={handleFileChange}
          className="cursor-pointer items-center"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        {imageSrc && (
          <button
            onClick={resetImage}
            className="absolute right-2 top-2 rounded-full border bg-white p-1 shadow-lg hover:bg-gray-100"
          >
            ✖
          </button>
        )}
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
