import {Toast} from "utils/common-utils"
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
  try {
    const res = axiosInstance.post("/users/login", loginData)
    return res
  } catch (error) {
    return error
  }
}

// 회원 조회
export const getUserInfo = async () => {
  const res = await axiosInstance.get(`/users/info`)
  console.log("users-api.ks > getUserInfo", res.data)
  return res
}

// 회원 정보 수정
export const patchUserInfo = async (userInfo) => {
  try {
    const res = await axiosInstance.patch(`/users`, userInfo, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return res
  } catch (error) {
    if (error.response.status === 409) {
      Toast.fire({
        icon: "warning",
        title: "중복된 닉네임이에요. 다시 시도해주세요.",
      })
    } else {
      Toast.fire({
        icon: "warning",
        title: "회원 정보 수정을 실패했어요. 다시 시도해주세요.",
      })
    }
    return error
  }
}

// 회원 탈퇴
export const deleteSelfUser = () => {
  const res = axiosInstance.delete(`/users`)

  return res
}

// JWT 테스트 요청
export const jwtTest = async () => {
  const res = await axiosInstance.get("/users/jwt-test")

  console.log("users-api.js > res", res)
}

// 이메일 인증번호 전송
export const postEmailVerificationCode = async (emailData) => {
  try {
    const res = await axiosInstance.post(
      "/users/authentication/email",
      emailData
    )

    return res
  } catch (error) {
    console.log("이메일 인증번호 전송 API 에러 catch")
    return Promise.reject(error)
  }
}

// 이메일 인증번호 확인
// 이메일, 인증코드를 인자로 전송
export const postEmailCheck = async (emailConfirmData) => {
  try {
    const res = await axiosInstance.post(
      "/users/authentication/email/check",
      emailConfirmData
    )

    return res
  } catch (error) {
    return error
  }
}

// 회원 삭제
export const deleteUser = async (userId) => {
  try {
    const res = await axiosInstance.delete(`/users/${userId}`)
    console.log(res)
    // 성공시 결과 반환
    return res
  } catch (error) {
    console.log(error)
    // 404번 응답시 - 닉네임을 찾을 수 없음
    if (error.response.status === 404) {
      Toast.fire({
        icon: "warning",
        title: `없는 유저 아이디입니다. 요청을 확인해주세요. 삭제 요청 Id: ${userId}`,
      })
      // 이외 예외에 대한 응답
    } else {
      Toast.fire({
        icon: "warning",
        title: "회원 삭제를 실패했어요.",
      })
    }
  }
}

// 신고 등록
export const postReport = async (reportRequestDto) => {
  try {
    const res = await axiosInstance.post(`/reports`, reportRequestDto)
    return res
  } catch (error) {
    return error
  }
}

// 신고 목록 조회 -> mypage-api.js

// 신고 상태 수정
export const patchReport = async (reportId) => {
  const res = await axiosInstance.patch(`/reports/${reportId}`)

  return res
}

// 닉네임 중복 조회
export const getIsDuplicatedNickname = (nickname) => {
  try {
    const res = axiosInstance.get(`/users/${nickname}`)
    return res
  } catch (error) {
    return error
  }
}

// 전화번호 인증 코드 발송
export const postPhoneVerificationCode = (phone) => {
  try {
    const res = axiosInstance.post(`/users/authentication/phone`, phone)
    console.log(res)
    return true
  } catch (error) {
    if (error.response.status === 409) {
      Toast.fire({
        icon: "warning",
        title: "이미 가입된 전화번호입니다. 전화번호를 확인해주세요.",
      })
    } else {
      Toast.fire({
        icon: "warning",
        title: "인증 코드 발송을 실패했어요. 다시 시도해주세요.",
      })
    }
    return false
  }
}

// 전화번호 인증 코드 확인
export const postPhoneCheck = (phoneConfirmData) => {
  try {
    const res = axiosInstance.post(
      `/users/authentication/phone/check`,
      phoneConfirmData
    )
    console.log(res)

    return res
  } catch (error) {
    if (error.response.status === 401) {
      Toast.fire({
        icon: "warning",
        title: "틀린 인증 번호에요. 번호를 확인해주세요.",
      })
    } else {
      Toast.fire({
        icon: "warning",
        title: "인증을 실패했어요. 다시 시도해주세요.",
      })
    }
    return false
  }
}

// 닉네임으로 회원 조회
export const getUsersByNickname = (nickname) => {
  try {
    const res = axiosInstance.get(`/users/list/${nickname}`)
    return res
  } catch (error) {
    return error
  }
}
