import {getMyArticles} from "api/mypage-api"
import Popover from "./Popover"
import {useEffect, useState} from "react"
import TaggedArticleItem from "components/petpick/TaggedArticleItem"
import {useSelector} from "react-redux"
import {selectNickname} from "features/user/users-slice"

const ArticleTag = ({onSelectArticleId, alreadySelectedAnimalId}) => {
  const [selectedArticleId, setSelectedArticleId] = useState(null)
  const [visible, setVisible] = useState(false)
  const [myArticles, setMyArticles] = useState([])
  const [selectedArticle, setSelectedArticle] = useState(
    alreadySelectedAnimalId
  )

  const nickname = useSelector(selectNickname)

  // Fetch user's articles
  useEffect(() => {
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

    initArticles()
  }, [nickname])

  // Update selected article when articles are fetched or article ID changes
  useEffect(() => {
    if (alreadySelectedAnimalId && myArticles.length > 0) {
      const newArticle = myArticles.find(
        (article) => article.id === alreadySelectedAnimalId
      )
      if (newArticle) {
        setSelectedArticle(newArticle)
        setSelectedArticleId(alreadySelectedAnimalId) // Update the ID as well
      }
    }
  }, [alreadySelectedAnimalId, myArticles])

  // Update selected article when selected article ID changes
  useEffect(() => {
    const selectedArticle = myArticles.find(
      (article) => article.id === selectedArticleId
    )
    if (selectedArticle) {
      setSelectedArticle(selectedArticle)
    }
    console.log("id", selectedArticleId)
  }, [selectedArticleId, myArticles])

  const handleArticleSelect = (id) => {
    setSelectedArticleId(id)
    console.log("article id", id)
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
      <div className="flex items-center">
        <div className="text-xl"> 글 태그 </div>
        <Popover
          list={myArticles}
          type={"article"}
          onSelectAnimal={handleArticleSelect}
          onVisible={handleVisibilityChange}
        >
          <img
            src={
              visible
                ? "/icons/icon-tag-select.svg"
                : "/icons/icon-tag-select-open.svg"
            }
            alt="tagIcon"
          />
        </Popover>
        {!selectedArticle && (
          <span className="text-red">태그할 글을 골라주세요</span>
        )}
      </div>
      <div className="h-32 w-96">
        {selectedArticle ? (
          <div className="flex justify-between space-x-2 rounded bg-green-50 p-2">
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
