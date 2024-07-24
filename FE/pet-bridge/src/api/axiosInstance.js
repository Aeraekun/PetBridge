import axios from "axios"

const BASE_API_URL = "http://localhost:8080/api"

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000, // 10초
  //   RestAPI 표준 준수를 위해 JSON 형식 데이터 교환
  headers: {"Content-Type": "application/json"},
})

// 요청 인터셉터 추가
// 모든 요청에 accessToken 유무를 확인해서, 토큰이 있으면 헤더에 넣어서 요청을 보냄
export const setAuthToken = (getState) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const state = getState()
      const accessToken = state.user.accessToken // 액세스 토큰을 상태에서 가져옴

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}

// 응답 인터셉터 추가하기
export const setRefreshToken = () => {
  axiosInstance.interceptors.response.use(
    (res) => {
      return res
    },
    (e) => {
      console.log("응답 인터셉터 : ", e)
      console.log("응답 인터셉터 리스폰스 : ", e.response.status)
      return Promise.reject(e)
    }
  )
}

export default axiosInstance
