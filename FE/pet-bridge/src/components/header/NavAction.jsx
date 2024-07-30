// import {jwtTest} from "api/users-api"
import Button from "components/common/Button"
import {
  logOut,
  selectIsAuthenticated,
  selectId,
} from "features/user/users-slice"
import {useSelector, useDispatch} from "react-redux"
import {Link, useNavigate} from "react-router-dom"

const NavAction = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const id = useSelector(selectId)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const deleteJWT = () => {
    console.log("NavAction.jsx => deleteJWT => 리프레시 토큰 삭제")
    localStorage.removeItem("refreshToken")
    sessionStorage.removeItem("accessToken")
    navigate("/")
  }

  const handleLogOut = () => {
    console.log("NavAction.jsx => handleLogOut 함수 호출")
    dispatch(logOut())
    deleteJWT()
  }

  const handleJwtTest = () => {
    console.log(document.cookie)
  }

  return (
    <ul className="flex h-12 items-center text-xl">
      <li className="mx-2.5 flex h-full cursor-pointer items-center text-xl">
        <button onClick={handleJwtTest}>JWT 테스트</button>
      </li>
      {isAuthenticated ? (
        <>
          <li className="mx-2.5 flex h-full cursor-pointer items-center text-xl">
            <button onClick={handleLogOut}>로그아웃</button>
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
