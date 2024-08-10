import {getMyArticles} from "api/mypage-api"
import Popover from "./Popover"
import {useEffect, useState} from "react"
import TaggedArticleItem from "components/petpick/TaggedArticleItem"
import {useSelector} from "react-redux"
import {selectNickname} from "features/user/users-slice"

const ArticleTag = ({onSelectArticleId}) => {
  const [selectedArticleId, setSelectedArticleId] = useState(null)
  const [visible, setVisible] = useState(false)
  const [myArticles, setMyArticles] = useState([])
  const [selectedArticle, setSelectedArticle] = useState(null)

  const nickname = useSelector(selectNickname)

  useEffect(() => {
    initArticles()
  }, [])

  const initArticles = async () => {
    try {
      const res = await getMyArticles({
        size: 12,
        page: 0,
        usernickname: nickname,
      })
      console.log("res", res.data)

      if (res.data) {
        setMyArticles(res.data.content)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const selectedArticle = myArticles.find(
      (article) => article.id === selectedArticleId
    )
    if (selectedArticle) {
      setSelectedArticle(selectedArticle)
    }
  }, [selectedArticleId])

  const handleArticleSelect = (id) => {
    setSelectedArticleId(id)
    if (onSelectArticleId) {
      onSelectArticleId(id)
    }
    if (!id) {
      setSelectedArticle(null)
    }
  }

  const handleVisibilityChange = (isVisible) => {
    setVisible(isVisible)
  }

  return (
    <div className="flex flex-col space-y-2">
      <div className="items-center flex">
        <div className="text-xl"> 글 태그 </div>
        <Popover
          list={myArticles}
          type={"article"}
          onSelectAnimal={handleArticleSelect}
          onVisible={handleVisibilityChange}
        >
          <div className="flex flex-row">
            {visible ? (
              <img src="/icons/icon-tag-select.svg" alt="tagIcon" />
            ) : (
              <img src="/icons/icon-tag-select-open.svg" alt="tagIcon" />
            )}
            {!selectedArticle && (
              <span className="text-red">태그할 글을 골라주세요</span>
            )}
          </div>
        </Popover>
      </div>
      <div className="h-32 w-96">
        {selectedArticle ? (
          <div className="flex justify-between space-x-2 rounded bg-gray-300 p-2">
            <TaggedArticleItem data={selectedArticle} />
          </div>
        ) : (
          <div>태그된 글이 없습니다.</div>
        )}
      </div>
    </div>
  )
}

export default ArticleTag
