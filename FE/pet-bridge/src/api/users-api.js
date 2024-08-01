import axiosInstance from "./axios-instance"

// 회원가입
export const signUpUser = async (signUpData) => {
  try {
    const res = await axiosInstance.post("/users/sign-up", signUpData)
    res

    const {email, password} = signUpData
    const loginData = {email: email, password: password}

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
export const patchDeleteUser = () => {
  const res = axiosInstance.patch(`/users/delete`)

  return res
}

// JWT 테스트 요청
export const jwtTest = async () => {
  const res = await axiosInstance.get("/users/jwt-test")

  console.log("users-api.js > res", res)
}

// 이메일 인증번호 전송
export const postEmailVerificationCode = async (emailData) => {
  const res = await axiosInstance.post("/users/authentication/email", emailData)

  return res
}

// 이메일 인증번호 확인
// 이메일, 인증코드를 인자로 전송
export const postEmailCheck = async (emailConfirmData) => {
  const res = await axiosInstance.post(
    "/users/authentication/email/check",
    emailConfirmData
  )

  return res
}
