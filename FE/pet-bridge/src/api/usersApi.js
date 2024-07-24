import axiosInstance from "./axiosInstance"

// 로그인
export const loginUser = async (loginData) => {
  try {
    const res = await axiosInstance.post("/users/login", {
      loginData,
    })
    return res.data
  } catch (error) {
    console.error("로그인 에러", error)
    throw error
  }
}

// 회원가입
export const signUpUser = async (signUpData) => {
  try {
    const res = await axiosInstance.post("/users/sign-up", {
      ...signUpData,
    })
    return res.data
  } catch (error) {
    console.error("회원가입 에러", error)
  }
}
