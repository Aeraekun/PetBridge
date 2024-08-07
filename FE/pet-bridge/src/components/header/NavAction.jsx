import Button from "components/common/Button"
import {
  logOut,
  selectIsAuthenticated,
  selectId,
} from "features/user/users-slice"
import {useSelector, useDispatch} from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import {logOutUser} from "utils/user-utils"
import NavChat from "./NavChat"
import {setIsChatModalOpen} from "features/chat/chat-slice"

const NavAction = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const id = useSelector(selectId)
  const dispatch = useDispatch()

  const handleLogOut = () => {
    logOutUser()
    dispatch(logOut())
  }

  const onClickChatHandler = () => {
    dispatch(setIsChatModalOpen())
  }
  const navigate = useNavigate()

  const onClickCallHandler = () => {
    navigate(`/call`)
  }

  return (
    <ul className="flex h-12 items-center text-xl">
      {isAuthenticated ? (
        <>
          <li className="mx-2.5 flex h-full cursor-pointer items-center text-xl">
            <button onClick={handleLogOut}>로그아웃</button>
          </li>
          <li className="mx-2.5 flex h-full cursor-pointer items-center text-xl">
            <NavChat onClick={onClickChatHandler} />
          </li>
          <li className="mx-2.5 flex h-full cursor-pointer items-center text-xl">
            <button onClick={onClickCallHandler}>
              <img src="icons/icon-call.svg" alt="" className="size-8" />
            </button>
          </li>
          <li className="mx-2.5 flex h-full cursor-pointer items-center text-xl">
            <Link to={`/users/${id}`}>
              <Button text="마이 페이지" />
            </Link>
          </li>
        </>
      ) : (
        <>
          <li className="mx-2.5 flex h-full cursor-pointer items-center text-xl">
            <Link to="/users/login">로그인</Link>
          </li>
          <li className="mx-2.5 flex h-full cursor-pointer items-center text-xl">
            <Link to="/users/sign-up">회원가입</Link>
          </li>
        </>
      )}
    </ul>
  )
}

export default NavAction
