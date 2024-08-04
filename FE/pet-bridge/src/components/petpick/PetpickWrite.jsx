import AnimalTag from "components/common/AnimalTag"
import Button from "components/common/Button"
import Profile from "components/common/Profile"
import React, {useState} from "react"
import ReactPlayer from "react-player"
import {useNavigate} from "react-router-dom"

const PetpickWrite = () => {
  const [title, setTitle] = useState(null)
  const [content, setContent] = useState(null)
  const [videoUrl, setVideoUrl] = useState(null) // 동영상 URL 상태
  const [imageSrc, setImageSrc] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [videoFile, setVideoFile] = useState(null)
  const [selectedAnimalId, setSelectedAnimalId] = useState(null)
  const [selectedArticleId, setSelectedArticleId] = useState(null)
  const navigate = useNavigate()

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

  //펫픽작성
  const goWritepetPick = () => {
    const newPetpick = {
      boardId: selectedArticleId,
      animalId: selectedAnimalId,
      title: title,
      content: content,
    }

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
    alert("펫픽작성")
  }

  return (
    <div className="mx-auto mt-[80px] flex h-screen w-[600px] max-w-[1000px] flex-col md:w-11/12 ">
      <Profile nickname={"닉네임"} image={"이미지"} />
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
          <div className="flex flex-col ">
            <div className="w-12 text-xl font-bold">내용 </div>
            <textarea
              className="  m-3  h-48 rounded-xl  border p-3 text-start"
              placeholder="펫픽의 설명을 입력하세요"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
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

      <AnimalTag onSelectAnimalId={handleAnimalSelect} />
      <AnimalTag onSelectAnimalId={handleArticleSelect} />
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
