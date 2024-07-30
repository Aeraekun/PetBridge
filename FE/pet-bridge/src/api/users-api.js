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
export const getUserInfo = async () => {
  const res = await axiosInstance.get(`/users/info`)
  console.log("users-api.ks > getUserInfo", res.data)
  return res
}

// 회원 정보 수정
export const patchUserInfo = async (userInfo) => {
  const res = await axiosInstance.patch(`/users/modify`, userInfo)
  return res
}

// 회원 탈퇴
export const patchDisableUser = (id) => {
  const res = axiosInstance.patch(`/users/${id}/delete`)

  return res
}

// JWT 테스트 요청
export const jwtTest = async () => {
  const res = await axiosInstance.get("/users/jwt-test")

  console.log("users-api.js > res", res)
}
