import axios from "axios"
import {jwtDecode} from "jwt-decode"
import {
  getAccessTokenFromSession,
  getRefreshTokenFromLocalStorage,
  setAccessTokenAtSession,
  setRefreshTokenAtLocalStorage,
} from "utils/user-utils"
export const BASE_API_URL = "http://localhost:8080/api"

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000, // 10초
  //   RestAPI 표준 준수를 위해 JSON 형식 데이터 교환
  headers: {"Content-Type": "application/json"},
})

// 액세스 토큰 만료 확인
const checkAccessTokenExpiration = (accessToken) => {
  // 액세스 토큰 디코드
  const decodedAccessToken = jwtDecode(accessToken)
  // 현재 시간
  const currentTime = Math.floor(Date.now() / 1000)
  // 액세스 토큰 만료 시간
  const tokenExpirationTime = decodedAccessToken.exp

  let isAccessTokenValid = false
  // 현재 시간과 액세스 토큰의 만료 시간을 비교해서 액세스 토큰의 유효성을 검사
  if (currentTime <= tokenExpirationTime) {
    isAccessTokenValid = true
  }

  return isAccessTokenValid
}

// 요청 인터셉터 추가
// 모든 요청에 accessToken 유무를 확인해서, 토큰이 있으면 헤더에 넣어서 요청을 보냄
axiosInstance.interceptors.request.use(
  (config) => {
    // 요청 인터셉터 동작 확인
    console.groupCollapsed("request interceptors")
    console.log("요청 인터셉터 동작")
    // 액세스 토큰을 상태에서 가져옴
    let isAccessTokenValid = false

    const accessToken = getAccessTokenFromSession()
    const refreshToken = getRefreshTokenFromLocalStorage()

    // 액세스, 리프레시 토큰 확인
    console.log(
      "요청 인터셉터 > 스토리지에서 확인한 액세스, 리프레시 토큰 : ",
      accessToken,
      refreshToken
    )
    console.groupEnd("request interceptors")

    // 액세스 토큰이 있으면, 유효성 확인
    if (accessToken) {
      isAccessTokenValid = checkAccessTokenExpiration(accessToken)
    }

    // 액세스 토큰이 유효한 경우 - 헤더에 액세스 토큰 추가
    if (isAccessTokenValid) {
      config.headers.Authorization = `Bearer ${accessToken}`
      config.headers["Authorization-refresh"] = ""
    } else {
      config.headers.Authorization = ""
    }

    // 액세스 토큰은 만료됐고 리프레시 토큰은 있는 경우 - 헤더에 리프레시 토큰 추가
    if (!isAccessTokenValid && refreshToken) {
      config.headers["Authorization-refresh"] = `Bearer 0${refreshToken}`
    }

    return config
  },
  (error) => {
    console.log("axios-instance.js > 요청 인터셉터", error)
    return Promise.reject(error)
  }
)

// 응답 인터셉터 추가
// 모든 axiosInstance 응답에 대해 headers를 확인해서 액세스 토큰을 상태에, 리프레시 토큰을 로컬스토리지에 저장함
axiosInstance.interceptors.response.use(
  (res) => {
    console.log("axios-instances.js > 응답 인터셉터 res: ", res)

    // 응답의 headers를 언패킹
    const {headers} = res

    // headers에서 액세스 토큰과 리프레시 토큰을 따르 빼서 정리
    const accessToken = headers.authorization
    const refreshToken = headers["authorization-refresh"]

    console.groupCollapsed("JWT fetched")
    console.log(
      "axios-instance.js > 응답 인터셉터에서 받은 액세스 토큰 :",
      accessToken
    )
    console.log(
      "axios-instance.js > 응답 인터셉터에서 받은 리프레시 토큰 :",
      refreshToken
    )
    console.groupEnd()

    // 액세스 토큰이 존재하는 경우 dispatch를 사용해서 액세스 토큰을 sessionStorage에 저장
    if (accessToken) {
      setAccessTokenAtSession(accessToken)
    }
    // 리프레시 토큰이 존재하는 경우 dispatch를 사용해서 리프레시 토큰을 localStorage에 저장
    if (refreshToken) {
      setRefreshTokenAtLocalStorage(refreshToken)
    }
    return res
  },
  // 모든 에러에 대한 응답
  async (error) => {
    // 기존 응답 저장
    const originalRequest = error.config

    // 기존에 액세스 토큰을 안담아서 보냈다면 에러 반환
    if (!originalRequest.headers.Authorization) {
      return error
    }

    // 403 응답 에러에 대해, 재요청이 아닌 경우 (액세스 토큰 만료 응답을 받은 경우)
    if (error.response.status === 403 && !originalRequest._retry) {
      // 재요청으로 처리하고
      originalRequest._retry = true

      // 리프레시 토큰과 id를 헤더에 담음
      const refreshToken = getRefreshTokenFromLocalStorage()
      const id = localStorage.getItem("id")

      // 리프레시 토큰과 유저 아이디가 있으면
      if (refreshToken && id) {
        originalRequest.headers["Authorization-refresh"] =
          `Bearer ${refreshToken}`
        originalRequest.headers["user-id"] = id

        return axiosInstance(originalRequest)
      }
    }
    console.log("인터셉터 에러", error)
    return error
  }
)

export default axiosInstance
