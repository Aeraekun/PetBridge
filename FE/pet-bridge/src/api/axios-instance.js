import axios from "axios"
import {jwtDecode} from "jwt-decode"
const BASE_API_URL = "http://localhost:8080/api"

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000, // 10초
  //   RestAPI 표준 준수를 위해 JSON 형식 데이터 교환
  headers: {"Content-Type": "application/json"},
})

const setAccessTokenAtSession = (accessToken) => {
  sessionStorage.setItem("accessToken", accessToken)
  return accessToken
}

const getAccessTokenFromSession = () => {
  const accessToken = sessionStorage.getItem(accessToken)
  return accessToken
}

const setRefreshTokenAtLocalStorage = (refreshToken) => {
  sessionStorage.setItem("refreshToken", refreshToken)
  return refreshToken
}

const getRefreshTokenFromLocalStorage = () => {
  const refreshToken = localStorage.getItem(refreshToken)
  return refreshToken
}

// 액세스 토큰 만료 확인
const checkAccessTokenExpiration = (accessToken) => {
  // 액세스 토큰 디코드
  const decodedAccessToken = jwtDecode(accessToken)
  // 현재 시간
  const currentTime = Math.floor(Date.now() / 1000)
  // 액세스 토큰 만료 시간
  const tokenExpirationTime = decodedAccessToken.exp

  let isAccessTokenValid = false

  if (currentTime <= tokenExpirationTime) {
    console.log("currentTime: ", currentTime)
    console.log("tokenExpirationTime: ", tokenExpirationTime)
    isAccessTokenValid = true
  }

  return isAccessTokenValid
}

// 요청 인터셉터 추가
// 모든 요청에 accessToken 유무를 확인해서, 토큰이 있으면 헤더에 넣어서 요청을 보냄
export const setAuthToken = () => {
  axiosInstance.interceptors.request.use(
    (config) => {
      // 액세스 토큰을 상태에서 가져옴
      let isAccessTokenValid = false
      const accessToken = getAccessTokenFromSession()
      const refreshToken = getRefreshTokenFromLocalStorage()

      // 액세스 토큰이 있으면, 유효성 확인
      if (accessToken) {
        isAccessTokenValid = checkAccessTokenExpiration(accessToken)
      }

      // 액세스 토큰은 만료됐고 리프레시 토큰은 있는 경우
      if (!isAccessTokenValid && refreshToken) {
        config.headers["Authorization-refresh"] = `Bearer ${refreshToken}`
      }

      // 액세스 토큰이 있는 경우
      if (isAccessTokenValid) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}

// 응답 인터셉터 추가
// 모든 axiosInstance 응답에 대해 headers를 확인해서 액세스 토큰을 상태에, 리프레시 토큰을 로컬스토리지에 저장함
export const setJSONWebToken = () => {
  axiosInstance.interceptors.response.use((res) => {
    // 응답의 headers를 언패킹
    const {headers} = res

    console.log(headers)

    // headers에서 액세스 토큰과 리프레시 토큰을 따르 빼서 정리
    const accessToken = headers.authorization
    const refreshToken = headers["authorization-refresh"]

    console.log(accessToken)
    console.log(refreshToken)

    // 액세스 토큰이 존재하는 경우 dispatch를 사용해서 액세스 토큰을 sessionStorage에 저장
    if (accessToken) {
      setAccessTokenAtSession(accessToken)
    }
    // 리프레시 토큰이 존재하는 경우 dispatch를 사용해서 리프레시 토큰을 localStorage에 저장
    if (refreshToken) {
      setRefreshTokenAtLocalStorage(refreshToken)
    }
    return res
  })
}

export default axiosInstance
