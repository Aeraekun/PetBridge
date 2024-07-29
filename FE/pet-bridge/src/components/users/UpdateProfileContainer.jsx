import DefaultUser150 from "assets/icons/icon-default-user-150.svg"
import {useState} from "react"
import {Link} from "react-router-dom"
const UpdateProfileContainer = () => {
  // 회원가입 폼 제출을 위한 인자 저장 state
  const [updateFormData, setUpdateFormData] = useState({
    email: "",
    password: "",
    nickname: "",
    birth: "",
    phone: "",
  })

  // 유효성 검사 실패 에러 메시지 저장을 위한 state
  const [errors, setErrors] = useState({})

  // 에러 메세지 변경
  const setOneError = (error, message) => {
    setErrors({
      ...errors,
      error: message,
    })
  }

  // 입력값이 변경되면 행동할 Handler 정의
  const changeHandler = (e) => {
    const target = e.target
    const id = target.id

    // 입력 값과 FormData를 연동시킴
    setUpdateFormData({
      ...updateFormData,
      [id]: target.value,
    })
  }

  // 컨펌 입력 처리 함수
  const changeConfirmHandler = (e) => {
    const target = e.target
    const id = target.id

    // 입력 값과 ConfirmNumbers를 연동시킴
    setConfirmNumbers({
      ...confirmNumbers,
      [id]: target.value,
    })
  }

  // 비밀번호 확인 문자 저장을 위한 state
  const [confirmNumbers, setConfirmNumbers] = useState({
    passwordConfirm: "",
    emailConfirm: "",
    phoneConfirm: "",
  })

  // 유효성 검사 패턴
  const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/
  const birthTypePattern = /^\d{8}$/
  const birthPattern =
    /^(19[0-9]{2}|20[0-9]{2})(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/

  // 비밀번호 유효성 검사
  // 8 ~ 16자, 영문 대소문자, 숫자, 특수문자 필수

  const validatePassword = () => {
    if (!updateFormData.password) {
      errors.password = "*비밀번호: 필수 정보입니다."
    } else if (!passwordPattern.test(updateFormData.password)) {
      errors.password =
        "*비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요."
    } else {
      errors.password = ""
    }

    setOneError("password", errors.password)
  }

  // 닉네임 유효성 검사
  const validateNickname = () => {
    if (!updateFormData.nickname) {
      errors.nickname = "*닉네임: 필수 정보입니다."
    } else {
      errors.nickname = ""
    }

    setOneError("nickname", errors.nickname)
  }

  // 생일 유효성 검사
  // 8자리 숫자인지 확인
  const validateBirth = () => {
    if (!updateFormData.birth) {
      errors.birth = "*생년월일: 필수 정보입니다."
    } else if (!birthTypePattern.test(updateFormData.birth)) {
      errors.birth = "*생년월일: 20240723 양식으로 작성해주세요."
    } else if (!birthPattern.test(updateFormData.birth)) {
      errors.birth =
        "*생년월일: 19000101 - 20991231 이내의 생일을 입력해주세요."
    } else {
      errors.birth = ""
    }

    setOneError("birth", errors.birth)
  }

  // const handleUpdateSubmit = async (e) => {
  //   e.preventDefault()

  //   const validationErrors = validateTotalForm()

  //   if (Object.values(validationErrors).every((value) => value === "")) {
  //     console.log("updateFormData: ", updateFormData)
  //     try {
  //       await updateUser(updateFormData)

  //       const {email, password} = updateFormData
  //       const loginData = {
  //         email: email,
  //         password: password,
  //       }
  //       dispatch(postLoginUser(loginData))
  //       navigate("/")
  //     } catch {
  //       return
  //     }
  //   } else {
  //     console.log("Validation Errors: ", validationErrors)
  //   }
  // }

  return (
    <form
      className="flex size-full flex-col items-center space-y-1.5"
      // onSubmit={handleUpdateSubmit}
    >
      <span className="text-2xl font-bold">닉네임(아이디)</span>
      <img
        src={DefaultUser150}
        alt="유저이미지"
        className="size-[100px] rounded-full"
      />
      {/* 비밀번호 입력 */}
      <div className="w-full">
        {/* 비밀번호 입력 창 */}
        <input
          value={updateFormData.password}
          onChange={changeHandler}
          type="password"
          className="my-1 w-full rounded-md border p-2.5"
          placeholder="비밀번호"
          id="password"
          minLength={8}
          maxLength={16}
          autoComplete="new-password"
          onBlur={validatePassword}
        />
        {/* 비밀번호 확인 입력 창 */}
        <input
          value={confirmNumbers.passwordConfirm}
          onChange={changeConfirmHandler}
          type="password"
          className=" my-1 w-full rounded-md border p-2.5"
          placeholder="비밀번호 확인"
          id="passwordConfirm"
          minLength={8}
          maxLength={16}
          autoComplete="new-password"
        />
        {errors.password && (
          <span className="col-span-12 text-alert">{errors.password}</span>
        )}
      </div>

      {/* 닉네임 입력 창 */}
      <div className="w-full">
        <input
          value={updateFormData.nickname}
          onChange={changeHandler}
          type="text"
          className=" my-1 w-full rounded-md border p-2.5"
          placeholder="닉네임"
          id="nickname"
          maxLength={20}
          onBlur={validateNickname}
        />
        {errors.nickname && (
          <span className="col-span-12 text-alert">{errors.nickname}</span>
        )}
      </div>

      {/* 생년월일 창 */}
      <div className="w-full">
        <input
          value={updateFormData.birth}
          onChange={changeHandler}
          type="text"
          className=" my-1 w-full rounded-md border p-2.5"
          placeholder="생년월일 8자리 (YYYYMMDD)"
          id="birth"
          minLength="8"
          maxLength="8"
          onBlur={validateBirth}
        />
        {errors.birth && (
          <span className="col-span-12 text-alert">{errors.birth}</span>
        )}
      </div>

      <div className="grid w-full grid-cols-2 gap-10">
        {/* 수정하기 버튼 */}
        <button type="submit" className="h-12 rounded-md bg-mild px-3.5 py-2.5">
          수정하기
        </button>
        {/* 취소 버튼 */}
        <Link
          to="/"
          type="button"
          className="rounded-md bg-mild px-3.5 py-2.5 text-center"
        >
          취소하기
        </Link>
      </div>
    </form>
  )
}

export default UpdateProfileContainer
