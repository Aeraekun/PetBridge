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
    <ul className="flex h-8 items-center text-center text-sm sm:h-10 sm:text-lg md:h-12 md:text-xl">
      {isAuthenticated ? (
        <>
          <li className="mx-2.5 flex h-full cursor-pointer truncate">
            <button onClick={handleLogOut}>로그아웃</button>
          </li>
          <li className="mx-2.5 flex h-full cursor-pointer">
            <NavChat onClick={onClickChatHandler} />
          </li>
          <li className="mx-2.5 flex h-full cursor-pointer">
            <button onClick={onClickCallHandler}>
              <img src="icons/icon-call.svg" alt="" className="size-8" />
            </button>
          </li>
          <li className="mx-2.5 flex h-full cursor-pointer">
            <Link to={`/users/${id}`}>
              <Button text="마이 페이지" />
            </Link>
          </li>
        </>
      ) : (
        <>
          <li className="mx-2.5 flex h-full cursor-pointer items-center">
            <Link to="/users/login">로그인</Link>
          </li>
          <li className="mx-2.5 flex h-full cursor-pointer items-center">
            <Link to="/users/sign-up">회원가입</Link>
          </li>
        </>
      )}
    </ul>
  )
}

export default NavAction
