import {getIsDuplicatedNickname} from "api/users-api"

// 유효성 검사 정규표현식
const emailPattern = /\S+@\S+\.\S+/
const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/
// 생일 유효성 검사 datepicker로 변경
const phonePattern = /^\d{3}\d{4}\d{4}$/

// 이메일 유효성 검사
export const validateEmail = (formData) => {
  let new_error = "email"
  let new_error_message = ""
  if (!formData.email) {
    new_error_message = "*이메일: 필수 정보입니다."
  } else if (!emailPattern.test(formData.email)) {
    new_error_message = "*이메일: 사용할 수 없는 이메일입니다."
  } else {
    new_error_message = ""
  }

  return {new_error, new_error_message}
}

// 비밀번호 유효성 검사
// 8 ~ 16자, 영문 대소문자, 숫자, 특수문자 필수
export const validatePassword = (formData) => {
  let new_error = "password"
  let new_error_message = ""
  if (!formData.password) {
    new_error_message = "*비밀번호: 필수 정보입니다."
  } else if (!passwordPattern.test(formData.password)) {
    new_error_message =
      "*비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요."
  } else {
    new_error_message = ""
  }

  return {new_error, new_error_message}
}

// 비밀번호 확인 유효성 검사
// 비밀번호 & 비밀번호 확인 입력이 동일한지 검사
export const validateConfirmPassword = (password, passwordConfirm) => {
  if (password === passwordConfirm) {
    return true
  }

  return false
}

// 전화번호 유효성 검사
export const validatePhone = (formData) => {
  let new_error = "phone"
  let new_error_message = ""
  if (!formData.phone) {
    new_error_message = "*휴대전화번호: 필수 정보입니다."
  } else if (!phonePattern.test(formData.phone)) {
    new_error_message = "*휴대전화번호: 01012345678 양식으로 작성해주세요."
  } else {
    new_error_message = ""
  }

  return {new_error, new_error_message}
}

// 생일 유효성 검사
// 8자리 숫자인지 확인
export const validateBirth = (formData) => {
  let new_error = "birth"
  let new_error_message = ""
  const year = parseInt(formData.birth.split("-")[0], 10)
  const minYear = 1900
  const maxYear = 2024
  if (!formData.birth) {
    new_error_message = "*생년월일: 필수 정보입니다."
  } else if (year < minYear || year > maxYear) {
    new_error_message = `*생년월일: 연도는 ${minYear}년과 ${maxYear}년 사이여야 합니다.`
  } else {
    new_error_message = ""
  }

  return {new_error, new_error_message}
}

// 닉네임 유효성 검사
export const validateNickname = async (formData) => {
  let new_error = "nickname"
  let new_error_message = ""

  if (!formData.nickname) {
    new_error_message = "*닉네임: 필수 정보입니다."
  } else {
    try {
      await getIsDuplicatedNickname(formData.nickname)
      new_error_message =
        "*닉네임: 중복된 닉네임입니다. 다른 닉네임을 적어주세요."
    } catch (error) {
      if (error?.response?.status === 404) {
        new_error_message = ""
      } else {
        new_error_message = "*닉네임: 닉네임 중복 검사 서버 오류"
      }
    }
  }

  return {new_error, new_error_message}
}
