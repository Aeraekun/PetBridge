import axiosInstance from "./axiosInstance"
import {createAsyncThunk} from "@reduxjs/toolkit"
// 로그인
// 비동기 로그인 Thunk Action 생성
export const loginUser = createAsyncThunk(
  // user/loginUser라는 Action을 정의
  "user/loginUser",
  // async - await 문법으로 프로미스 객체 활용
  async (loginData, {rejectWithValue}) => {
    console.log(loginData)
    try {
      const res = await axiosInstance.post("/users/login", loginData)
      // 결과 응답의 data, headers만 활용할것
      const {data, headers} = res
      // thunk의 action으로 반환 (action은 단일 object을 payload로 반환받는다.)
      return {
        name: data.name,
        headers: {
          authorization: headers.authorization,
          "authorization-refresh": headers["authorization-refresh"],
        },
      }
      // try문 안에서 난 오류를 검사하고, 에러 발생시 에러 응답의 data를 반환
    } catch (e) {
      return rejectWithValue(e.res.data) // 실패 시 에러 반환
    }
  }
)
// 회원가입
export const signUpUser = async (signUpData) => {
  try {
    const res = await axiosInstance.post("/users/sign-up", signUpData)

    const {email, password} = signUpData
    const loginData = {email: email, password: password}
    console.log("usersApi.js >", loginData)

    console.log(res)
    // 회원가입 후 바로 로그인을 위해 loginUser thunk를 dispatch로 호출
    return loginUser(loginData)
  } catch (e) {
    return
  }
}
