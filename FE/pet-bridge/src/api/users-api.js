import axiosInstance from "./axios-instance"

// 회원가입
export const signUpUser = async (signUpData) => {
  try {
    const res = await axiosInstance.post("/users/sign-up", signUpData)

    const {email, password} = signUpData
    const loginData = {email: email, password: password}
    console.log(res)

    // 회원가입 후 바로 로그인을 위해 loginUser thunk를 dispatch로 호출
    return postLoginUser(loginData)
  } catch (e) {
    return
  }
}

// 로그인
export const postLoginUser = (loginData) => {
  const res = axiosInstance.post("/users/login", loginData)
  return res
}

// 회원 조회
export const getUserInfo = (userId) => {
  const res = axiosInstance.get(`/users/${userId}`)
  return res
}

// 회원 탈퇴
export const patchDisableUser = (userId) => {
  const res = axiosInstance.patch(`/users/${userId}/delete`)

  return res
}

// JWT 테스트 요청
export const jwtTest = async () => {
  const res = await axiosInstance.get("/users/jwt-test")

  console.log("users-api.js > res", res)
}
