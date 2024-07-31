import {getListBoardComment, registBoardComment} from "api/boards-api"
import Comment from "components/common/Comment"
import {selectIsAuthenticated} from "features/user/users-slice"
import {useEffect, useState} from "react"
import {useSelector} from "react-redux"

const CommentInput = ({articleId, userId, onCommentAdded}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const [inputComment, setInputComment] = useState("")
  const sendMsg = async () => {
    console.log({inputComment})
    const newComment = {
      boardId: articleId,
      userId: userId,
      content: inputComment,
    }

    try {
      await registBoardComment(newComment)
      setInputComment("")
      onCommentAdded() //댓글 작성하면 콜백함수 호출
      alert("댓글 등록 완료")
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="flex h-16 flex-col justify-between space-x-2.5 ">
      {isAuthenticated ? (
        <div className="flex items-center space-x-2.5">
          <input
            type="text"
            className="outline-stroke mx-2 h-10 w-full rounded-md  text-sm outline outline-1"
            placeholder="댓글을 남겨보세요"
            value={inputComment}
            onChange={(e) => setInputComment(e.target.value)}
          />
          <button className="h-10   w-12" onClick={sendMsg}>
            <img src="/icons/icon-send.svg" alt="sendIcon" />
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-2.5">
          <div className="outline-stroke text-stroke mx-2 h-10 w-full  content-center rounded-md text-sm outline outline-1">
            좋아요와 댓글을 남기려면 로그인하세요{" "}
          </div>
        </div>
      )}
    </div>
  )
}

const ArticleComments = ({articleId, userId}) => {
  const [commentList, setCommentList] = useState([])

  const fetchComments = async () => {
    const data = await getListBoardComment(articleId) //게시글 댓글 조회 api
    setCommentList(data)
    console.log(articleId)
  }
  useEffect(() => {
    fetchComments()
  }, [articleId]) // 빈 배열을 두 번째 인자로 전달하여 마운트 시 한 번만 실행

  const handleCommentAdded = () => {
    fetchComments() // 댓글 등록 후 댓글 리스트를 다시 가져옴
  }
  return (
    <>
      <ul className="flex w-full flex-col justify-between">
        {commentList.map((comment, index) => (
          <li key={index}>
            <Comment data={comment} />
          </li>
        ))}
      </ul>
      <CommentInput
        articleId={articleId}
        userId={userId}
        onCommentAdded={handleCommentAdded}
      />
    </>
  )
}

export default ArticleComments
