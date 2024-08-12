import {
  getUserInfoThunk,
  selectIsAuthenticated,
} from "features/user/users-slice"
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import logoImage from "assets/image/logo.png"

const SocialSuccessContainer = () => {
  // 로그인 완료 상태에서 확인
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // 로그인을 성공해서 해당 컨테이너 컴포넌트가 로드되면,
  // 로그인 완료 여부를 판단해서 로그인시 메인페이지로, 비로그인시 로그인 페이지로 이동
  useEffect(() => {
    const getUserInfoAndNavigate = async () => {
      dispatch(getUserInfoThunk())
      navigate("/")
    }
    // isAuthenticated가 true일 때만 유저 정보를 받아오고, 메인페이지로 redirect 시켜줌
    // 컴포넌트가 로드됐을 때, isAuthenticated가 변경되기 전 동작을 방지
    if (isAuthenticated) {
      getUserInfoAndNavigate()
    }
  }, [isAuthenticated])

  return (
    <>
      <h1>소셜 로그인 성공</h1>
      <Link to="/">
        <img src={logoImage} alt="로고" className="size-24" />
      </Link>
    </>
  )
}

export default SocialSuccessContainer
