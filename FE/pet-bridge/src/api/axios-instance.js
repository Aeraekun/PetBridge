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
      let accessToken = state.user.accessToken // 액세스 토큰을 상태에서 가져옴
      const refreshToken = localStorage.getItem("refreshToken")

      // 액세스 토큰은 없고 리프레시 토큰은 있는 경우
      if (!accessToken && refreshToken) {
        config.headers["Authorization-refresh"] = `Bearer ${refreshToken}`
      }

      // 액세스 토큰이 있는 경우
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

// 응답 인터셉터 추가
// 모든 axiosInstance 응답에 대해 headers를 확인해서 액세스 토큰을 상태에, 리프레시 토큰을 로컬스토리지에 저장함
export const setJSONWebToken = (store) => {
  axiosInstance.interceptors.response.use((res) => {
    // 응답의 headers를 언패킹
    const {headers} = res

    // headers에서 액세스 토큰과 리프레시 토큰을 따르 빼서 정리
    const accessToken = headers.authorization
    const refreshToken = headers["authorization-refresh"]

    // 응답의 헤더에...
    // 액세스 토큰이 존재하는 경우 dispatch를 사용해서 액세스 토큰을 store에 저장
    if (accessToken) {
      store.dispatch({type: "user/setAccessToken", payload: accessToken})
    }
    // 리프레시 토큰이 존재하는 경우 dispatch를 사용해서 리프레시 토큰을 store에 저장
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken)
    }
    return res
  })
}

export default axiosInstance
