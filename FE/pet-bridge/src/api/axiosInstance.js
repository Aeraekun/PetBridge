import axios from "axios"

const BASE_API_URL = "http://localhost:8080/api"

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000, // 10초
  //   RestAPI 표준 준수를 위해 JSON 형식 데이터 교환
  headers: {"Content-Type": "application/json"},
})

export default axiosInstance
