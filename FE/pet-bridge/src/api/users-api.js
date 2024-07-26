import axiosInstance from "./axios-instance"
import {createAsyncThunk} from "@reduxjs/toolkit"

const saveRefreshTokenToLocalStorage = (refreshToken) => {
  localStorage.setItem("refreshToken", refreshToken)
}

// 로그인
// 비동기 로그인 Thunk Action 생성
export const loginUser = createAsyncThunk(
  // user/loginUser라는 Action을 정의
  "user/loginUser",
  // async - await 문법으로 프로미스 객체 활용
  async (loginData, {rejectWithValue}) => {
    console.log("usersApi.ks => loginUser => console.log(loginData)", loginData)
    try {
      const res = await axiosInstance.post("/users/login", loginData)
      // 결과 응답의 data, headers만 활용할것
      const {data, headers} = res
      // refresh 토큰을 localStorage에 저장
      const refreshToken = headers["authorization-refresh"]

      saveRefreshTokenToLocalStorage(refreshToken)

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
    console.log(res)
    // 회원가입 후 바로 로그인을 위해 loginUser thunk를 dispatch로 호출
    return loginUser(loginData)
  } catch (e) {
    return
  }
}

// 유저 정보 get
export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (_, {rejectWithValue}) => {
    const refreshToken = localStorage.getItem("refreshToken")

    if (refreshToken) {
      const res = await getUserInfo(refreshToken)
      return res.data
    } else {
      return rejectWithValue("로컬 스토리지에 저장된 리프레시 토큰이 없습니다.")
    }
  }
)

// JWT 테스트 요청
export const jwtTest = () => {
  const res = axiosInstance.get("/users/jwt-test")

  console.log(res)
}
