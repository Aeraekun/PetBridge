import SirenIcon from "components/common/SirenIcon"
import Button from "components/common/Button"
import AnimalTag from "components/common/AnimalTag"
import Editor from "components/common/Editor"
// import data from "./articledata"
import {useNavigate, useParams} from "react-router-dom"
import {useEffect, useState} from "react"

import Profile from "components/common/Profile"
import {editArticle, getArticleDetail} from "api/boards-api"

const ArticleDetailModify = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [title, setTitle] = useState("")
  const [editorContent, setEditorContent] = useState("")
  const [selectedAnimalId, setSelectedAnimalId] = useState(null)
  const [imageSrc, setImageSrc] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [thumbnail, setUserTumbnail] = useState(null)
  // const [type, setType] = useState(null)

  // 파일 선택 시 호출되는 함수
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      // 파일의 URL을 생성하여 상태에 저장
      const url = URL.createObjectURL(file)
      setImageSrc(url)
      setImageFile(file)
    }
  }

  const fetchArticle = async () => {
    const fetchedArticle = await getArticleDetail(Number(id)) //게시글 상세 조회 api
    if (fetchedArticle) {
      setArticle(fetchedArticle)
      setTitle(fetchedArticle.title || "")
      setEditorContent(fetchedArticle.content || "")
      setImageSrc(fetchedArticle.thumbnail || "")
      setSelectedAnimalId(fetchedArticle.animalId)
      setUserTumbnail(fetchedArticle.thumbnail)
      // setType(fetchedArticle.type)
    }
  }

  useEffect(() => {
    fetchArticle()
  }, [])

  const resetImage = () => {
    setImageSrc(null)
  }

  const handleAnimalSelect = (id) => {
    setSelectedAnimalId(id)
  }

  const goBack = () => {
    navigate(-1)
  }

  const modifyArticle = async () => {
    if (title === "" || !imageSrc) {
      alert("제목과 대표사진을 모두 입력하세요.")
      return
    }
    if (article) {
      // 변경된 내용으로 article 업데이트
      const updatedArticle = {
        ...article,
        animalId: selectedAnimalId,
        thumbnail: thumbnail,
        title: title,
        content: editorContent,
        thumbnailRemoved: true,
      }
      const formData = new FormData()
      formData.append(
        "boardEditRequestDto",
        new Blob([JSON.stringify(updatedArticle)], {type: "application/json"})
      )
      if (imageFile) {
        formData.append("file", imageFile)
      }

      //api 함수 호출
      try {
        console.log("updatedArticle", updatedArticle)
        await editArticle(id, formData)
        navigate(-1)
      } catch (e) {
        console.error(e)
      }
      if (article) {
        navigate(`/communities/details/${article.id}`)
      }
    }
  }
  return (
    <>
      <button onClick={goBack} className="flex justify-start">
        돌아가기
      </button>
      <input
        className="border-stroke h-16 rounded-xl border text-center text-4xl font-bold"
        placeholder="제목을 입력하세요"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <hr />{" "}
      {article && (
        <Profile nickname={article.userNickname} image={article.userImage} />
      )}
      <div className="my-2 flex flex-row">
        <img src="/icons/icon-tag.svg" alt="Tag Icon" />
      </div>
      <hr />
      <AnimalTag onSelectAnimalId={handleAnimalSelect} />
      <div>대표사진</div>
      {imageSrc ? (
        <div className="mt-4">
          <img
            src={imageSrc}
            alt="Uploaded Preview"
            className="max-h-96 max-w-96 rounded border"
          />
        </div>
      ) : (
        <div className="flex h-64 w-96 flex-col items-center justify-center border border-gray-300 px-4 py-2">
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
      <div className="h-[550px] w-full justify-center">
        <Editor value={editorContent} onChange={setEditorContent} />
      </div>
      <div className="flex justify-end">
        <SirenIcon />
      </div>
      <div className="flex justify-end">
        태그된 동물 번호 {selectedAnimalId}
        <Button text={"수정하기"} onClick={modifyArticle} />
        <Button text={"삭제하기"} onClick={goBack} />
      </div>
    </>
  )
}

export default ArticleDetailModify
