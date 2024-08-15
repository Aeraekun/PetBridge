// // import data from "./articledata"
// import SirenButton from "components/common/SirenButton"
// import Button from "components/common/Button"
// import {useSelector} from "react-redux"
// import {useNavigate, useParams} from "react-router-dom"
// import {getArticleDetail, removeArticle} from "api/boards-api"
// import React, {useEffect, useState} from "react"
// import {selectId} from "features/user/users-slice"
// import DOMPurify from "dompurify"
// import Profile from "components/common/Profile"
// import ArticleComments from "./ArticleComments"
// import CommentIcon from "components/common/CommentIcon"

// const ArticleDetail = () => {
//   const [article, setArticle] = useState([])
//   const {id} = useParams()
//   const navigate = useNavigate()
//   const sanitizedContent = DOMPurify.sanitize(article.content) //Quill안정성 높이기 위함
//   const currentUserId = useSelector(selectId)

//   useEffect(() => {
//     const fetchArticle = async () => {
//       const data = await getArticleDetail(Number(id)) //게시글 상세 조회 api
//       setArticle(data)
//       console.log(data)
//     }
//     fetchArticle()
//   }, []) // 빈 배열을 두 번째 인자로 전달하여 마운트 시 한 번만 실행

//   const goBack = () => {
//     navigate(-1)
//   }
//   const goModifyArticle = () => {
//     navigate(`/communities/modify/${id}`)
//   }

//   const goRemoveArticle = async (id) => {
//     //게시글 삭제 api 함수 호출
//     try {
//       await removeArticle(id)

//       navigate(-1)
//     } catch (e) {
//       console.error(e)
//     }
//   }
//   return (
//     <div className="rounded-xl border p-4">
//       <button onClick={goBack} className="flex justify-start">
//         돌아가기
//       </button>
//       <div className="text-center text-4xl font-bold">{article.title}</div>
//       <hr />
//       <Profile nickname={article.userNickname} image={article.userImage} />
//       <div className="flex flex-row space-x-2 pl-6">
//         <img src="/icons/icon-tag.svg" alt="Tag Icon" />
//         <Profile
//           nickname={article.animalName}
//           image={article.animalThumbnail}
//         />
//       </div>
//       <hr />
//       대표사진
//       {article.thumbnail ? (
//         <div className="mt-4">
//           <img
//             src={article.thumbnail}
//             alt="Uploaded Preview"
//             className="ml-[100px] size-96 rounded border object-contain"
//           />
//         </div>
//       ) : (
//         <div className="flex h-64 w-96 flex-col items-center justify-center border border-gray-300 px-4 py-2">
//           <>대표사진이 없습니다</>
//         </div>
//       )}
//       <div
//         className=" mx-auto min-h-72 w-[800px]"
//         dangerouslySetInnerHTML={{__html: sanitizedContent}}
//       ></div>
//       <div className="flex justify-end">
//         {Number(currentUserId) === Number(article.userId) ? (
//           <div className="flex  space-x-3">
//             <Button text={"수정하기"} onClick={goModifyArticle} />
//             <Button
//               text={"삭제하기"}
//               onClick={() => {
//                 goRemoveArticle(id)
//               }}
//             />
//           </div>
//         ) : (
//           <div className="flex">
//             <SirenButton />
//           </div>
//         )}
//       </div>
//       <hr />
//       <div className="m-3 flex items-center space-x-2">
//         <CommentIcon size={"small"} />
//         <div>댓글 {article.commentCount}</div>
//       </div>
//       <div className="px-8">
//         <ArticleComments articleId={id} currentUserId={currentUserId} />
//       </div>
//     </div>
//   )
// }

// export default ArticleDetail

import React, {useState, useEffect} from "react"
import {useSelector} from "react-redux"
import {useNavigate, useParams} from "react-router-dom"
import DOMPurify from "dompurify"
import {selectId} from "features/user/users-slice"
import {getArticleDetail, removeArticle} from "api/boards-api"
import Profile from "components/common/Profile"
import ArticleComments from "./ArticleComments"
import Button from "components/common/Button"
import SirenButton from "components/common/SirenButton"
import DeleteConfirmationModal from "components/common/DeleteConfirmationModal"
import ProfileForAnimal from "components/common/ProfileForAnimal"
import {stateColors} from "components/common/StateColorList"
import StateBadge from "components/common/StateBadge"

const ArticleDetail = () => {
  const [article, setArticle] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false) // 모달 상태 관리
  const {id} = useParams()
  const navigate = useNavigate()
  const sanitizedContent = DOMPurify.sanitize(article.content) // Quill 안정성 높이기
  const currentUserId = useSelector(selectId)
  const [color, setColor] = useState("")
  useEffect(() => {
    const fetchArticle = async () => {
      const data = await getArticleDetail(Number(id)) // 게시글 상세 조회
      setArticle(data)
      console.log(data)
      setColor(stateColors[data.boardType] || "outline-mild")
    }
    fetchArticle()
  }, [id]) // `id`가 변경될 때마다 다시 호출

  const goBack = () => {
    navigate(-1)
  }

  const goModifyArticle = () => {
    navigate(`/communities/modify/${id}`)
  }

  const goRemoveArticle = async () => {
    try {
      await removeArticle(id)
      navigate(-1)
    } catch (e) {
      console.error(e)
    }
  }

  const handleDeleteClick = () => {
    setIsModalOpen(true)
  }

  const handleConfirmDelete = () => {
    goRemoveArticle()
    setIsModalOpen(false)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div
      className={`relative top-6 rounded-b-xl outline outline-4 ${color} mt-12 p-4 sm:w-11/12`}
    >
      <StateBadge state={article.boardType} category={"article"}></StateBadge>
      <button
        onClick={goBack}
        className="flex justify-start text-gray-500 underline underline-offset-2"
      >
        돌아가기
      </button>
      <div className="mb-2 text-center text-4xl font-bold">{article.title}</div>
      <div className="relative flex flex-col gap-2 border-t p-2">
        <Profile
          userId={article.userId}
          nickname={article.userNickname}
          image={article.userImage}
          isMe={Number(currentUserId) === Number(article.userId)}
        />
        <div className="flex flex-row space-x-2 pl-6">
          <img src="/icons/icon-tag.svg" alt="Tag Icon" />
          {article.animalId ? (
            <ProfileForAnimal
              animalname={article.animalName}
              image={article.animalFilename}
              animalId={article.animalId}
            />
          ) : (
            <div>태그된 동물이 없습니다.</div>
          )}
        </div>
      </div>
      <hr />
      {/* <div className="m-2 text-lg">대표사진</div> */}
      <div className="flex w-full justify-center bg-gray-50 p-2">
        {article.thumbnail ? (
          <div className="">
            {article.id === 22 ? (
              <video
                src={article.thumbnail}
                muted
                controls
                className="h-[500px] rounded border object-contain"
              />
            ) : (
              <img
                src={article.thumbnail}
                alt="Uploaded Preview"
                className="h-[300px] rounded border object-contain"
              />
            )}
          </div>
        ) : (
          <div className="flex h-64 w-96 flex-col items-center justify-center border border-gray-300 px-4 py-2">
            <></>
          </div>
        )}
      </div>
      <div
        className="mx-auto mt-3 min-h-72 w-[800px]"
        dangerouslySetInnerHTML={{__html: sanitizedContent}}
      ></div>
      <div className="flex justify-end">
        {Number(currentUserId) === Number(article.userId) ? (
          <div className="flex space-x-3">
            <Button text={"수정하기"} onClick={goModifyArticle} />
            <Button text={"삭제하기"} onClick={handleDeleteClick} />
          </div>
        ) : (
          <div className="flex p-2">
            <SirenButton reportId={id} reportType={"BOARD"} />
          </div>
        )}
      </div>
      <hr />
      <div className="px-8">
        <ArticleComments articleId={id} currentUserId={currentUserId} />
      </div>
      {/* 삭제 확인 모달 */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}

export default ArticleDetail
