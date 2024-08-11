// import {editPetPick} from "api/petpicks-api"
// import AnimalTag from "components/common/AnimalTag"
// import Button from "components/common/Button"
// import Profile from "components/common/Profile"
// import React, {useEffect, useState} from "react"
// import ReactPlayer from "react-player"
// import {useLocation, useNavigate} from "react-router-dom"
// import {goDeletePetpick} from "utils/petpick-utils"

// const PetpickModify = () => {
//   const [title, setTitle] = useState(null)
//   const [content, setContent] = useState(null)
//   const [videoUrl, setVideoUrl] = useState(null) // 동영상 URL 상태
//   const [imageSrc, setImageSrc] = useState(null)
//   const [imageFile, setImageFile] = useState(null)
//   const [selectedAnimalId, setSelectedAnimalId] = useState(null)
//   const [selectedArticleId, setSelectedArticleId] = useState(null)
//   const navigate = useNavigate()

//   const location = useLocation()
//   const {item} = location.state || {}

//   const [petpick, setPetpick] = useState()
//   //초기값으로
//   useEffect(() => {
//     setPetpick(item)
//   }, [])

//   useEffect(() => {
//     if (petpick) {
//       setTitle(petpick.title || "")
//       setContent(petpick.content || "")
//       setVideoUrl(petpick.video || null)
//       setImageSrc(petpick.thumbnail || null)
//       setSelectedAnimalId(petpick.animalId || null)
//       setSelectedArticleId(petpick.boardId || null)
//     }
//   }, [petpick])

//   // 돌아가기, 수정취소하기
//   const goBack = () => {
//     navigate(-1)
//   }

//   // 동물 선택
//   const handleAnimalSelect = (id) => {
//     setSelectedAnimalId(id)
//   }

//   // 글 선택
//   const handleArticleSelect = (id) => {
//     setSelectedArticleId(id)
//   }

//   // 파일 선택 시 호출되는 함수
//   const handleImageFileChange = (event) => {
//     const file = event.target.files[0]
//     if (file) {
//       // 파일의 URL을 생성하여 상태에 저장
//       const url = URL.createObjectURL(file)
//       setImageSrc(url)
//       // 파일
//       setImageFile(file)
//     }
//   }
//   const resetImage = () => {
//     setImageSrc(null)
//     setImageFile(null)
//   }

//   //펫픽 수정
//   const modifypetPick = async () => {
//     const newPetpick = {
//       boardId: selectedArticleId,
//       animalId: selectedAnimalId,
//       title: title,
//       content: content,
//     }

//     const formData = new FormData()
//     formData.append(
//       "petPickEditRequestDto",
//       new Blob([JSON.stringify(newPetpick)], {type: "application/json"})
//     )
//     if (imageFile) {
//       formData.append("thumbnail", imageFile)
//     }

//     try {
//       const res = await editPetPick(petpick.id, formData)
//       console.log(res)
//     } catch (e) {
//       console.log(e)
//     }
//   }

//   return (
//     <div className="mx-auto mt-[80px] flex  w-[600px] max-w-[1000px] flex-col md:w-11/12 ">
//       <Profile nickname={"닉네임"} image={"이미지"} />
//       <hr />
//       <div className="mx-16 min-w-[400px]">
//         <div className="flex ">
//           <div className="m-5 flex w-[300px] flex-col">
//             <div className="relative size-[300px] overflow-hidden rounded-lg object-contain">
//               {videoUrl ? (
//                 <ReactPlayer
//                   url={videoUrl}
//                   controls={true}
//                   playing={true}
//                   width="100%"
//                   height="100%"
//                 />
//               ) : (
//                 <div className="mx-auto flex  h-full w-[250px] items-center justify-center bg-gray-200">
//                   <p className="text-gray-500">동영상을 업로드 해주세요.</p>
//                 </div>
//               )}
//             </div>
//             <div className="text-xs text-gray-500">
//               업로드된 펫픽은 수정이 불가합니다.
//             </div>
//           </div>
//           <div className="flex flex-col">
//             <div className="flex h-12 items-center  ">
//               <div className="w-12 text-xl font-bold">제목 </div>
//               <input
//                 className=" h-12 rounded-xl   text-xl"
//                 placeholder={"제목을 입력하세요"}
//                 onChange={(e) => setTitle(e.target.value)}
//                 value={title}
//               />
//             </div>
//             <div className="flex flex-col ">
//               <div className="w-12 text-xl font-bold">내용 </div>
//               <textarea
//                 className=" m-3  h-48  w-full rounded-xl  border p-3 text-start"
//                 placeholder="펫픽의 설명을 입력하세요"
//                 onChange={(e) => setContent(e.target.value)}
//                 value={content}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="flex h-[350px] flex-col">
//           <div className="w-16 text-xl font-bold">썸네일 </div>
//           {/* 이미지 미리보기 */}
//           {imageSrc ? (
//             <div className="mt-4 size-64">
//               <img
//                 src={imageSrc}
//                 alt="Uploaded Preview"
//                 className="size-full max-h-64 max-w-64 rounded border object-contain "
//               />
//             </div>
//           ) : (
//             <div
//               className="flex size-64 flex-col items-center justify-center border border-gray-300
//           px-4 py-2"
//             >
//               <>썸네일을 입력해주세요.</>
//             </div>
//           )}
//           <div className="flex">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageFileChange}
//               className="cursor-pointer items-center"
//             />
//             {imageSrc && <button onClick={resetImage}> ✖ </button>}
//           </div>
//         </div>

//         <AnimalTag onSelectAnimalId={handleAnimalSelect} />
//         <AnimalTag onSelectAnimalId={handleArticleSelect} />
//         <div className="flex justify-end">
//           태그된 동물 번호 {selectedAnimalId} <br></br>
//           태그된 게시글 번호 {selectedArticleId}
//           <Button text={"수정하기"} onClick={modifypetPick} />
//           <Button
//             text={"삭제하기"}
//             onClick={() => {
//               goDeletePetpick(petpick.id)
//             }}
//           />
//           <Button text={"취소하기"} onClick={goBack} />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PetpickModify

import React, {useEffect, useState} from "react"
import {useLocation, useNavigate} from "react-router-dom"
import AnimalTag from "components/common/AnimalTag"
import Button from "components/common/Button"
import Profile from "components/common/Profile"
import ReactPlayer from "react-player"
import {editPetPick} from "api/petpicks-api"
import {goDeletePetpick} from "utils/petpick-utils"
import DeleteConfirmationModal from "components/common/DeleteConfirmationModal"
import {selectId, selectImage, selectNickname} from "features/user/users-slice"
import {useSelector} from "react-redux"

const PetpickModify = () => {
  const [title, setTitle] = useState(null)
  const [content, setContent] = useState(null)
  const [videoUrl, setVideoUrl] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [selectedAnimalId, setSelectedAnimalId] = useState(null)
  const [selectedArticleId, setSelectedArticleId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false) // 모달 상태 관리
  const navigate = useNavigate()

  const location = useLocation()
  const {item} = location.state || {}

  const [petpick, setPetpick] = useState()

  useEffect(() => {
    setPetpick(item)
  }, [])

  useEffect(() => {
    if (petpick) {
      setTitle(petpick.title || "")
      setContent(petpick.content || "")
      setVideoUrl(petpick.video || null)
      setImageSrc(petpick.thumbnail || null)
      setSelectedAnimalId(petpick.animalId || null)
      setSelectedArticleId(petpick.boardId || null)
    }
  }, [petpick])

  const goBack = () => {
    navigate(-1)
  }

  const handleAnimalSelect = (id) => {
    setSelectedAnimalId(id)
  }

  const handleArticleSelect = (id) => {
    setSelectedArticleId(id)
  }

  const handleImageFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImageSrc(url)
      setImageFile(file)
    }
  }

  const resetImage = () => {
    setImageSrc(null)
    setImageFile(null)
  }

  const modifypetPick = async () => {
    const newPetpick = {
      boardId: selectedArticleId,
      animalId: selectedAnimalId,
      title: title,
      content: content,
    }

    const formData = new FormData()
    formData.append(
      "petPickEditRequestDto",
      new Blob([JSON.stringify(newPetpick)], {type: "application/json"})
    )
    if (imageFile) {
      formData.append("thumbnail", imageFile)
    }

    try {
      const res = await editPetPick(petpick.id, formData)
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  const handleDelete = () => {
    setIsModalOpen(true) // 모달 열기
  }

  const handleConfirmDelete = async () => {
    try {
      await goDeletePetpick(petpick.id) // 실제 삭제 함수 호출
      setIsModalOpen(false) // 모달 닫기
      navigate(-1) // 삭제 후 뒤로가기
    } catch (e) {
      console.log(e)
    }
  }

  const currentUserImage = useSelector(selectImage)
  const currentUserNickname = useSelector(selectNickname)
  const currentUserId = useSelector(selectId)

  return (
    <div className="mx-auto mt-[80px] flex  w-[600px] max-w-[1000px] flex-col md:w-11/12 ">
      <Profile
        nickname={currentUserNickname}
        image={currentUserImage}
        isMe={true}
        userId={currentUserId}
      />
      <hr />
      <div className="mx-16 min-w-[400px]">
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
            <div className="text-xs text-gray-500">
              업로드된 펫픽은 수정이 불가합니다.
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex h-12 items-center  ">
              <div className="w-12 text-xl font-bold">제목 </div>
              <input
                className=" h-12 rounded-xl   text-xl"
                placeholder={"제목을 입력하세요"}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div className="flex flex-col ">
              <div className="w-12 text-xl font-bold">내용 </div>
              <textarea
                className=" m-3  h-48  w-full rounded-xl  border p-3 text-start"
                placeholder="펫픽의 설명을 입력하세요"
                onChange={(e) => setContent(e.target.value)}
                value={content}
              />
            </div>
          </div>
        </div>
        <div className="flex h-[350px] flex-col">
          <div className="w-16 text-xl font-bold">썸네일 </div>
          {imageSrc ? (
            <div className="mt-4 size-64">
              <img
                src={imageSrc}
                alt="Uploaded Preview"
                className="size-full max-h-64 max-w-64 rounded border object-contain "
              />
            </div>
          ) : (
            <div
              className="flex size-64 flex-col items-center justify-center border border-gray-300
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
          <Button text={"수정하기"} onClick={modifypetPick} />
          <Button
            text={"삭제하기"}
            onClick={handleDelete} // 삭제 버튼 클릭 시 모달 열기
          />
          <Button text={"취소하기"} onClick={goBack} />
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}

export default PetpickModify
