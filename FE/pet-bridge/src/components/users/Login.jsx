import Button from "components/common/Button"
import {Link} from "react-router-dom"
import {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {selectLoading, selectError} from "features/user/userSlice"
import {loginUser} from "api/usersApi"

function LoginForm() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })

  const dispatch = useDispatch()
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)

  // Submit 양식
  function handleLoginSubmit(e) {
    e.preventDefault()

    const loginData = loginForm
    // 로그인 Api 호출
    dispatch(loginUser(loginData))
  }

  return (
    <form className="space-y-2.5" onSubmit={handleLoginSubmit}>
      {/* 이메일 입력창 */}
      <input
        value={loginForm.email}
        onChange={(e) => {
          setLoginForm({
            ...loginForm,
            email: e.target.value,
          })
        }}
        type="email"
        className="w-full rounded-md border p-2.5"
        placeholder="Email"
        id="email-input"
        maxLength={255}
      />

      {/* 비밀번호 입력창 */}
      <input
        value={loginForm.password}
        onChange={(e) => {
          setLoginForm({
            ...loginForm,
            password: e.target.value,
          })
        }}
        type="password"
        className="w-full rounded-md border p-2.5"
        placeholder="password"
        id="password-input"
        minLength={8}
      />

      {/* 로그인 버튼 */}
      <button
        className="h-12 w-full rounded-md bg-yellow px-3.5 py-2.5"
        disabled={loading}
      >
        {loading ? "로그인 중..." : "로그인"}
      </button>

      {/* 에러 메시지 */}
      {error && <p className="text-alert">{error}</p>}
    </form>
  )
}

function Login() {
  return (
    <div className="flex size-[600px] flex-col place-content-center items-center rounded-lg border">
      <div className="flex h-[385px] w-[400px] flex-col space-y-2.5">
        {/* 로그인 폼 */}
        <LoginForm></LoginForm>
        {/* ID찾기, PW찾기, 회원가입 */}
        <div className="flex justify-between">
          <Link to="/">
            <Button text="ID 찾기" />
          </Link>
          <Link to="/">
            <Button text="PW 찾기" />
          </Link>
          <Link to="/signup">
            <Button text="회원가입" />
          </Link>
        </div>

        {/* 구분선 */}
        <div className="flex h-7 w-full flex-row items-center">
          <hr className="grow border-gray-300" />
          <span className="m-2 line-clamp-1 text-gray-500">Connect With</span>
          <hr className="grow border-gray-300" />
        </div>

        {/* 소셜 로그인 */}
        <div className="flex w-full flex-row justify-between">
          <div className="size-12 rounded-full bg-[#fee500]"></div>
          <div className="size-12 rounded-full bg-[#03C75A]"></div>
          <div className="size-12 rounded-full bg-[#4285F4]"></div>
        </div>
      </div>
    </div>
  )
}

export default Login
