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
import NaverIcon from "assets/icons/icon-login-naver.png"
import KakaoIcon from "assets/icons/icon-login-kakao.png"
import GoogleIcon from "assets/icons/icon-login-google.svg"
import logoImage from "assets/image/logo.png"

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

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
    <form
      className="flex flex-col items-center space-y-2.5"
      onSubmit={handleLoginSubmit}
    >
      <Link to="/">
        <img src={logoImage} alt="로고" className="size-24" />
      </Link>
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
      <div className="flex w-full gap-4">
        {/* 로그인 버튼 */}
        <button
          className="h-12 grow rounded-md bg-yellow px-3.5 py-2.5"
          disabled={loading}
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
        {/* 회원가입 버튼 */}
        <Link to="/users/sign-up">
          <Button text="회원가입" />
        </Link>
      </div>

      {/* 에러 메시지 */}
      {error && <p className="text-alert">{error}</p>}
    </form>
  )
}

const Login = () => {
  // 소셜 로그인 URL
  const SOCIAL_BASE_URL = REACT_APP_API_URL + "/oauth2/authorization/"
  console.log(SOCIAL_BASE_URL)

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
      <div className="flex w-[400px] flex-col space-y-2.5">
        {/* 로그인 폼 */}
        <LoginForm></LoginForm>

        {/* 구분선 */}
        <div className="flex h-7 w-full flex-row items-center">
          <hr className="grow border-gray-300" />
          <span className="m-2 line-clamp-1 text-gray-500">Connect With</span>
          <hr className="grow border-gray-300" />
        </div>

        {/* 소셜 로그인 */}
        <div className="flex w-full flex-col items-center gap-4">
          <button onClick={handleSocialLogin} id="google">
            <img src={GoogleIcon} alt="구글 로그인" className="w-60" />
          </button>
          <button onClick={handleSocialLogin} id="kakao">
            <img src={KakaoIcon} alt="카카오 로그인" className="w-60" />
          </button>
          <button onClick={handleSocialLogin} id="naver">
            <img src={NaverIcon} alt="네이버 로그인" className="w-60" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
