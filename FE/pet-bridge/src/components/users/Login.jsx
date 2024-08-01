import Button from "components/common/Button"
import {Link, useNavigate} from "react-router-dom"
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {
  selectLoading,
  selectError,
  selectIsAuthenticated,
  loginUserThunk,
} from "features/user/users-slice"

const LoginForm = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated, navigate])

  // Submit 양식
  const handleLoginSubmit = async (e) => {
    e.preventDefault()

    const loginData = loginForm
    // loginUserThunk Dispatch
    const loginResult = await dispatch(loginUserThunk(loginData))
    console.log("Login.jsx > handleLoginSubmit", loginResult)
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

const Login = () => {
  // 소셜 로그인 URL
  const SOCIAL_BASE_URL =
    process.env.REACT_APP_API_URL + "oauth2/authorization/"

  // 소셜 로그인 클릭시 호출 함수
  const handleSocialLogin = (e) => {
    // 클릭한 대상(버튼)의 id 추출 (kakao, naver, google)ㄴ
    const target = e.currentTarget
    const socialId = target.id

    const socialUrl = SOCIAL_BASE_URL + socialId

    console.log(socialUrl)
    window.location.href = socialUrl
  }

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
          <Link to="/users/sign-up">
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
          <button
            className="size-12 rounded-full bg-[#fee500]"
            onClick={handleSocialLogin}
            id="kakao"
          >
            카카오
          </button>
          <button
            className="size-12 rounded-full bg-[#03C75A]"
            onClick={handleSocialLogin}
            id="naver"
          >
            네이버
          </button>
          <div className="size-12 rounded-full bg-[#4285F4]"></div>
        </div>
      </div>
    </div>
  )
}

export default Login
