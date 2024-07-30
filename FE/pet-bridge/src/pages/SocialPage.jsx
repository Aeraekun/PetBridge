import {setAuthenticated} from "features/user/users-slice"
import {useEffect} from "react"
import {useDispatch} from "react-redux"
import {Outlet, useSearchParams} from "react-router-dom"
import {
  setAccessTokenAtSession,
  setRefreshTokenAtLocalStorage,
} from "utils/user-utils"

const SocialPage = () => {
  // 페이지 로드시 URL 쿼리스트링을 확인해서 토큰 저장
  const dispatch = useDispatch()
  setAuthenticated
  let [tokenQuery, setTokenQuery] = useSearchParams()

  const getTokenFromQuery = () => {
    const accessToken = tokenQuery.get("access-token")
    const refreshToken = tokenQuery.get("refresh-token")

    // 액세스 토큰과 리프레시 토큰이 있으면
    if (accessToken && refreshToken) {
      setAccessTokenAtSession(accessToken)
      setRefreshTokenAtLocalStorage(refreshToken)
      dispatch(setAuthenticated(true))
      setTokenQuery({})
      return true
    }
    return false
  }

  useEffect(() => {
    getTokenFromQuery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex h-[800px] w-[600px] flex-col items-center rounded-lg border bg-rose-50 px-10 py-16">
      <Outlet />
    </div>
  )
}

export default SocialPage
