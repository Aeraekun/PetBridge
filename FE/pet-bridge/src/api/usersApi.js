import axiosInstance from "./axiosInstance"
import {createAsyncThunk} from "@reduxjs/toolkit"
// 로그인
// 비동기 로그인 Thunk 액션 크리에이터
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (loginData, {rejectWithValue}) => {
    try {
      const res = await axiosInstance.post("/users/login", loginData)
      const {data, headers} = res
      console.log(res)
      console.log(headers)
      return {
        name: data.name,
        headers: {
          authorization: headers.authorization,
          "authorization-refresh": headers["authorization-refresh"],
        },
      }
    } catch (error) {
      return rejectWithValue(error.res.data) // 실패 시 에러 반환
    }
  }
)
// 회원가입
export const signUpUser = async (signUpData) => {
  const res = await axiosInstance.post("/users/sign-up", signUpData)
  return res
}
