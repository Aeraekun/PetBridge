import Button from "components/common/Button"
import {logOut, selectIsAuthenticated} from "features/user/userSlice"
import {useSelector, useDispatch} from "react-redux"
import {Link} from "react-router-dom"

function NavAction() {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch()

  const handleLogOut = (e) => {
    console.log(e)
    dispatch(logOut())
  }

  return (
    <ul className="flex h-12 items-center text-xl">
      {isAuthenticated ? (
        <>
          <li className="mx-2.5 flex h-full cursor-pointer items-center text-xl">
            <button onClick={handleLogOut}>로그아웃</button>
          </li>
          <li className="mx-2.5 flex h-full cursor-pointer items-center text-xl">
            <Button text="마이 페이지" />
          </li>
        </>
      ) : (
        <>
          <li className="mx-2.5 flex h-full cursor-pointer items-center text-xl">
            <Link to="/login">로그인</Link>
          </li>
          <li className="mx-2.5 flex h-full cursor-pointer items-center text-xl">
            <Link to="/signup">회원가입</Link>
          </li>
        </>
      )}
    </ul>
  )
}

export default NavAction
