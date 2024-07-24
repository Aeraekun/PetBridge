import {Link} from "react-router-dom"
import Button from "components/common/Button"
import Login from "components/users/Login"
import {useDispatch, useSelector} from "react-redux"
import {logIn, logOut, selectLoggedIn} from "features/user/userSlice"

logIn

function LoginToggle() {
  const dispatch = useDispatch()
  const loggedIn = useSelector(selectLoggedIn)

  const handleToggleLogin = () => {
    if (loggedIn) {
      dispatch(logOut())
    } else {
      dispatch(logIn("테스트유저")) // '테스트유저'로 name을 설정하고 로그인 상태로 변경
    }
  }

  return (
    <button
      className="h-12 w-full rounded-md bg-yellow px-3.5 py-2.5"
      onClick={handleToggleLogin}
    >
      로그인 토글
    </button>
  )
}

const LoginPage = () => {
  return (
    <section className="fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
      {/* 개발용 임시 로그인 토글 버튼 */}
      <LoginToggle />
      {/* 개발용 임시 홈버튼 */}
      <Link to="/">
        <Button text={"home"} />
      </Link>
      <Login />
    </section>
  )
}

export default LoginPage
