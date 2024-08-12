import {registPetPick} from "api/petpicks-api"
import AnimalTag from "components/common/AnimalTag"
import ArticleTag from "components/common/ArticleTag"
import Button from "components/common/Button"
import Profile from "components/common/Profile"
import {selectId, selectImage, selectNickname} from "features/user/users-slice"
import React, {useState} from "react"
import ReactPlayer from "react-player"
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

const PetpickWrite = () => {
  const [title, setTitle] = useState(null)
  const [content, setContent] = useState(null)
  const [videoUrl, setVideoUrl] = useState(null) // 동영상 URL 상태
  const [imageSrc, setImageSrc] = useState(null) // 썸네일 미리보기용
  const [imageFile, setImageFile] = useState(null) // 썸네일 선택시 파일
  const [videoFile, setVideoFile] = useState(null) // 동영상 선택시 파일
  const [selectedAnimalId, setSelectedAnimalId] = useState(null)
  const [selectedArticleId, setSelectedArticleId] = useState(null)
  const [errors, setErrors] = useState({}) // 유효성 검사 결과 저장
  const navigate = useNavigate()

  //동영상 선택 시
  const handleVideoFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setVideoUrl(url)
      setVideoFile(file)
    }
  }

  // 돌아가기
  const goBack = () => {
    navigate(-1)
  }

  // 동물 선택
  const handleAnimalSelect = (id) => {
    setSelectedAnimalId(id)
  }

  // 글 선택
  const handleArticleSelect = (id) => {
    setSelectedArticleId(id)
  }

  // 파일 선택 시 호출되는 함수
  const handleImageFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      // 파일의 URL을 생성하여 상태에 저장
      const url = URL.createObjectURL(file)
      setImageSrc(url)
      // 파일
      setImageFile(file)
    }
  }
  const resetImage = () => {
    setImageSrc(null)
    setImageFile(null)
  }
  const resetVideo = () => {
    setVideoUrl(null)

    setVideoFile(null)
  }

  // 유효성 검사 함수
  const validate = () => {
    let tempErrors = {}
    if (!title) tempErrors.title = "제목을 입력하세요."
    if (!content) tempErrors.content = "내용을 입력하세요."
    if (!selectedAnimalId) tempErrors.selectedAnimalId = "동물을 선택하세요."
    if (!selectedArticleId)
      tempErrors.selectedArticleId = "게시글을 선택하세요."
    if (!videoFile) tempErrors.videoFile = "동영상을 올려주세요."
    if (!imageFile) tempErrors.imageFile = "썸네일을 올려주세요."
    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  //펫픽작성
  const goWritepetPick = async () => {
    if (!validate()) return
    const newPetpick = {
      boardId: selectedArticleId,
      animalId: selectedAnimalId,
      title: title,
      content: content,
    }
    console.log(newPetpick, imageFile, videoFile)

    const formData = new FormData()
    formData.append(
      "petPickRegistRequestDto",
      new Blob([JSON.stringify(newPetpick)], {type: "application/json"})
    )
    if (imageFile) {
      formData.append("thumbnail", imageFile)
    }
    if (videoFile) {
      formData.append("video", videoFile)
    }

    console.log(formData)
    try {
      await registPetPick(formData)
    } catch (e) {
      console.error(e)
    }
  }

  const currentUserImage = useSelector(selectImage)
  const currentUserNickname = useSelector(selectNickname)
  const currentUserId = useSelector(selectId)

  return (
    <div className="mx-auto mt-[80px] flex h-screen w-[600px] max-w-[1000px] flex-col md:w-11/12 ">
      <Profile
        nickname={currentUserNickname}
        image={currentUserImage}
        isMe={true}
        userId={currentUserId}
      />
      <hr />
      <div className="flex ">
        <div className="m-5 flex w-[300px] flex-col">
          <div className="relative size-[300px] overflow-hidden rounded-lg object-contain">
            {videoUrl ? (
              <ReactPlayer
                url={videoUrl}
                controls={true}
                playing={true}
                width="100%"
                height="100%"
              />
            ) : (
              <div className="mx-auto flex  h-full w-[250px] items-center justify-center bg-gray-200">
                <p className="text-gray-500">동영상을 업로드 해주세요.</p>
              </div>
            )}
          </div>
          <div className="mt-4">
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoFileChange}
              className="w-[250px] cursor-pointer border border-gray-300 px-4 py-2"
            />
            {videoUrl && <button onClick={resetVideo}> ✖ </button>}
            {errors.videoFile && (
              <p className="text-sm text-red-500">{errors.videoFile}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex h-12 items-center  ">
            <div className="w-12 text-xl font-bold">제목 </div>
            <input
              className=" h-12 rounded-xl   text-xl"
              placeholder="제목을 입력하세요"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title}</p>
          )}

          <div className="flex flex-col ">
            <div className="w-12 text-xl font-bold">내용 </div>
            <textarea
              className="  m-3  h-48 rounded-xl  border p-3 text-start"
              placeholder="펫픽의 설명을 입력하세요"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="w-16 text-xl font-bold">썸네일 </div>
        {/* 이미지 미리보기 */}
        {imageSrc ? (
          <div className="mt-4">
            <img
              src={imageSrc}
              alt="Uploaded Preview"
              className="max-h-64 max-w-64 rounded border"
            />
          </div>
        ) : (
          <div
            className="flex h-48 w-32 flex-col items-center justify-center border border-gray-300
          px-4 py-2"
          >
            <>썸네일을 입력해주세요.</>
          </div>
        )}
        <div className="flex">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageFileChange}
            className="cursor-pointer items-center"
          />
          {imageSrc && <button onClick={resetImage}> ✖ </button>}
        </div>
      </div>
      {errors.imageFile && (
        <p className="text-sm text-red-500">{errors.imageFile}</p>
      )}

      <AnimalTag onSelectAnimalId={handleAnimalSelect} />
      {errors.selectedAnimalId && (
        <p className="text-sm text-red-500">{errors.selectedAnimalId}</p>
      )}

      <ArticleTag onSelectArticleId={handleArticleSelect} />
      {errors.selectedArticleId && (
        <p className="text-sm text-red-500">{errors.selectedArticleId}</p>
      )}
      <div className="flex justify-end">
        태그된 동물 번호 {selectedAnimalId} <br></br>
        태그된 게시글 번호 {selectedArticleId}
        <Button text={"작성하기"} onClick={goWritepetPick} />
        <Button text={"삭제하기"} onClick={goBack} />
      </div>
    </div>
  )
}

export default PetpickWrite
