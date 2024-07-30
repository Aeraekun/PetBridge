// import data from "./articledata"
import SirenButton from "components/common/SirenButton"
import Button from "components/common/Button"
import {useSelector} from "react-redux"
import {useNavigate, useParams} from "react-router-dom"
import {getArticleDetail} from "api/boards-api"
import React, {useEffect, useState} from "react"
import {selectId} from "features/user/users-slice"
import DOMPurify from "dompurify"
import Profile from "components/common/Profile"

const ArticleDetail = () => {
  const [article, setArticle] = useState([])
  const {id} = useParams()
  const navigate = useNavigate()
  const sanitizedContent = DOMPurify.sanitize(article.content) //Quill안정성 높이기 위함
  const currentUserId = useSelector(selectId)

  useEffect(() => {
    const fetchArticle = async () => {
      const data = await getArticleDetail(Number(id)) //게시글 상세 조회 api
      setArticle(data)
    }

    fetchArticle()
  }, []) // 빈 배열을 두 번째 인자로 전달하여 마운트 시 한 번만 실행

  const goBack = () => {
    navigate(-1)
  }
  const goModify = () => {
    navigate(`/communities/modify/${id}`)
  }

  return (
    <>
      <button onClick={goBack} className="flex justify-start">
        돌아가기
      </button>
      <div className="text-center text-4xl font-bold">{article.title}</div>
      <hr />
      <Profile nickname={article.userNickname} image={article.userImage} />
      <div className="flex flex-row space-x-2 pl-6">
        <img src="/icons/icon-tag.svg" alt="Tag Icon" />
        <Profile nickname={article.userNickname} image={article.userImage} />
      </div>
      <hr />
      대표사진
      {article.thumbnail ? (
        <div className="mt-4">
          <img
            src={article.thumbnail}
            alt="Uploaded Preview"
            className="size-96 rounded border object-contain"
          />
        </div>
      ) : (
        <div className="flex h-64 w-96 flex-col items-center justify-center border border-gray-300 px-4 py-2">
          <>대표사진이 없습니다</>
        </div>
      )}
      <div
        className="min-h-72 w-11/12"
        dangerouslySetInnerHTML={{__html: sanitizedContent}}
      ></div>
      <div className="flex justify-end">
        {Number(currentUserId) === Number(article.userId) ? (
          <div className="flex  space-x-3">
            <Button text={"수정하기"} onClick={goModify} />
            <Button text={"삭제하기"} onClick={goBack} />
          </div>
        ) : (
          <div className="flex">
            <SirenButton />
          </div>
        )}
      </div>
    </>
  )
}

export default ArticleDetail
