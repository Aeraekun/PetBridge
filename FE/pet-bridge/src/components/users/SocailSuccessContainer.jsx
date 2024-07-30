import {
  getUserInfoThunk,
  selectIsAuthenticated,
} from "features/user/users-slice"
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

const SocialSuccessContainer = () => {
  // 로그인 완료 상태에서 확인
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // 로그인을 성공해서 해당 컨테이너 컴포넌트가 로드되면,
  // 로그인 완료 여부를 판단해서 로그인시 메인페이지로, 비로그인시 로그인 페이지로 이동
  useEffect(() => {
    const getUserInfoAndNavigate = async () => {
      if (isAuthenticated) {
        await dispatch(getUserInfoThunk())
        navigate("/")
      } else {
        navigate("/users/login")
      }
    }

    getUserInfoAndNavigate()
  })

  return <h1>소셜 로그인 성공</h1>
}

export default SocialSuccessContainer
