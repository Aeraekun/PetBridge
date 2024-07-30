import SirenIcon from "components/common/SirenIcon"
import Button from "components/common/Button"
import data from "./articledata"
import {useNavigate, useParams} from "react-router-dom"
import DOMPurify from "dompurify"

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

const TaggedAnimalProfile = ({data}) => {
  return (
    <div className="mb-4 ml-6 flex h-8 items-center justify-around space-x-2.5">
      <img
        src="https://via.placeholder.com/50"
        alt="Author Avatar"
        className="size-12 rounded-full border "
      />
      <div className="flex-1">
        <p className="text-lg font-semibold">{data.name}</p>
      </div>
    </div>
  )
}
const ArticleDetail = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const article = data.find((article) => article.id === Number(id))

  const sanitizedContent = DOMPurify.sanitize(article.content)
  const goBack = () => {
    navigate(-1)
  }
  const goModify = () => {
    navigate(`/communities/modify/${id}`)
  }
  return (
    <>
      <button onClick={goBack} className="flex justify-start">
        돌아가기{" "}
      </button>
      <div className="text-center text-4xl font-bold">{article.title}</div>
      <hr />
      <Profile nickname={article.nickname} />
      <div className="my-2 flex flex-row">
        <img src="/icons/icon-tag.svg" alt="Tag Icon" />

        <TaggedAnimalProfile data={article} />
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
