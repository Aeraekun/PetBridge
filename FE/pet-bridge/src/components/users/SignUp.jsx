import {useEffect, useState} from "react"
import {postEmailCheck, postPhoneCheck, signUpUser} from "api/users-api"
import {Link, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {
  getIsDuplicatedNicknameThunk,
  loginUserThunk,
  postEmailVerificationCodeThunk,
  postPhoneVerificationCodeThunk,
  selectIsLoadingEmailCode,
  selectIsLoadingPhoneCode,
} from "features/user/users-slice"
import Timer from "components/common/Timer"
import {validateConfirmPassword} from "utils/user-validations"
import logoImage from "assets/image/logo.png"

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 회원가입 폼 제출을 위한 인자 저장 state
  const [signUpFormData, setSignUpFormData] = useState({
    email: "",
    password: "",
    nickname: "",
    birth: "",
    phone: "",
  })

  // 비밀번호 확인 문자 저장을 위한 state
  const [confirmNumbers, setConfirmNumbers] = useState({
    passwordConfirm: "",
    emailConfirm: "",
    phoneConfirm: "",
  })

  // 유효성 검사 실패 에러 메시지 저장을 위한 state
  const [errors, setErrors] = useState({})

  // 이메일 유효성 검사
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [isValidEmailButton, setIsValidEmailButton] = useState(false)
  const [isSendCodeButtonDisalbed, setIsSendCodeButtonDisalbed] =
    useState(false)
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [isValidNickname, setIsValidNickname] = useState(false)
  const [isLoadingEmailCode, setIsLoadingEmailCode] = useState(false)

  // 이메일 코드 전송 로딩중
  const isLoadingEmailCodeState = useSelector(selectIsLoadingEmailCode)

  // 전화번호 코드 전송 로딩중
  const isLoadingPhoneCodeState = useSelector(selectIsLoadingPhoneCode)

  useEffect(() => {
    setIsLoadingEmailCode(isLoadingEmailCodeState)
  }, [isLoadingEmailCodeState])

  useEffect(() => {
    setIsLoadingPhoneCode(isLoadingPhoneCodeState)
  }, [isLoadingPhoneCodeState])

  // 전화번호 유효성 검사
  const [isValidPhone, setIsValidPhone] = useState(false)
  const [isValidPhoneButton, setIsValidPhoneButton] = useState(false)
  const [isSendPhoneCodeDisalbed, setIsSendPhoneCodeDisalbed] = useState(false)
  const [isPhoneVerified, setIsPhoneVerified] = useState(false)
  const [isLoadingPhoneCode, setIsLoadingPhoneCode] = useState(false)

  // 유효성 검사 정규표현식
  const emailPattern = /\S+@\S+\.\S+/
  const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/
  // 생일 유효성 검사 패턴 -> input type date로 변경
  // const birthTypePattern = /^\d{8}$/
  // const birthPattern =
  //   /^(19[0-9]{2}|20[0-9]{2})(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/
  const phonePattern = /^\d{3}\d{4}\d{4}$/

  // 에러 메세지 변경
  const setOneError = (error, message) => {
    setErrors({
      ...errors,
      error: message,
    })
  }

  // 이메일 유효성 검사
  const validateEmail = () => {
    if (!signUpFormData.email) {
      errors.email = "*이메일: 필수 정보입니다."
    } else if (!emailPattern.test(signUpFormData.email)) {
      errors.email = "*이메일: 사용할 수 없는 이메일입니다."
    } else {
      errors.email = ""
      setIsValidEmail(true)
    }

    setOneError("email", errors.email)
  }

  // 비밀번호 유효성 검사
  // 8 ~ 16자, 영문 대소문자, 숫자, 특수문자 필수
  const validatePassword = () => {
    if (!signUpFormData.password) {
      errors.password = "*비밀번호: 필수 정보입니다."
    } else if (!passwordPattern.test(signUpFormData.password)) {
      errors.password =
        "*비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요."
    } else {
      errors.password = ""
    }

    setOneError("password", errors.password)
  }

  // 비밀번호 확인 유효성 검사
  const confirmPasswordHandler = () => {
    if (!confirmNumbers.passwordConfirm) {
      errors.passwordConfirm = "*비밀번호 확인: 필수 정보입니다."
    } else if (
      validateConfirmPassword(
        signUpFormData.password,
        confirmNumbers.passwordConfirm
      )
    ) {
      errors.passwordConfirm = ""
    } else {
      errors.passwordConfirm =
        "*비밀번호 확인: 비밀번호와 동일한 값을 입력해주세요."
    }

    setOneError("passwordConfirm", errors.passwordConfirm)
  }

  // 전화번호 유효성 검사
  const validatePhone = () => {
    if (!signUpFormData.phone) {
      errors.phone = "*휴대전화번호: 필수 정보입니다."
    } else if (!phonePattern.test(signUpFormData.phone)) {
      errors.phone = "*휴대전화번호: 01012345678 양식으로 작성해주세요."
    } else {
      errors.phone = ""
      setIsValidPhone(true)
    }

    setOneError("phone", errors.phone)
  }

  const clickSendPhoneCodeHandler = async () => {
    const res = await dispatch(
      postPhoneVerificationCodeThunk({phone: signUpFormData.phone})
    )

    console.log(res, signUpFormData)

    // Thunk 결과 처리
    if (postPhoneVerificationCodeThunk.fulfilled.match(res)) {
      setIsValidPhoneButton(true)
      setIsSendPhoneCodeDisalbed(true)
    } else if (postPhoneVerificationCodeThunk.rejected.match(res)) {
      console.log(res)
      alert("이미 가입된 번호입니다. 다른 번호를 시도해주세요.")
    } else {
      console.log(res)
    }
  }

  // 생일 유효성 검사
  // 8자리 숫자인지 확인
  const validateBirth = () => {
    const year = parseInt(signUpFormData.birth.split("-")[0], 10)
    const minYear = 1900
    const maxYear = 2024
    if (!signUpFormData.birth) {
      errors.birth = "*생년월일: 필수 정보입니다."
    } else if (year < minYear || year > maxYear) {
      errors.birth = `*생년월일: 연도는 ${minYear}년과 ${maxYear}년 사이여야 합니다.`
    } else {
      errors.birth = ""
    }

    setOneError("birth", errors.birth)
  }

  // 닉네임 유효성 검사
  const validateNickname = async () => {
    if (!signUpFormData.nickname) {
      errors.nickname = "*닉네임: 필수 정보입니다."
      setIsValidNickname(false)
    } else {
      const res = await dispatch(
        getIsDuplicatedNicknameThunk(signUpFormData.nickname)
      )
      console.log(res)
      if (getIsDuplicatedNicknameThunk.fulfilled.match(res)) {
        errors.nickname = ""
        setIsValidNickname(true)
      } else if (getIsDuplicatedNicknameThunk.rejected.match(res)) {
        errors.nickname = res.payload
        setIsValidNickname(false)
      }
    }

    setOneError("nickname", errors.nickname)
  }

  // 회원가입 제출시 유효성 검사
  const validateTotalForm = () => {
    validateNickname()
    validateEmail()
    validatePassword()
    validatePhone()
    validateBirth()

    return errors
  }

  // Submit 양식
  // signUpUser Axios 요청을 보냄
  // 인자 : name(삭제 예정), email, password, nickname, birth, phone
  const handleSignUpSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateTotalForm()

    if (Object.values(validationErrors).every((value) => value === "")) {
      console.log("SignUpFormData: ", signUpFormData)
      try {
        await signUpUser(signUpFormData)

        const {email, password} = signUpFormData
        const loginData = {
          email: email,
          password: password,
        }
        await dispatch(loginUserThunk(loginData))
        navigate("/")
      } catch {
        return
      }
    } else {
      console.log("Validation Errors: ", validationErrors)
    }
  }

  // 입력시 처리 함수
  // input 태그의 id와 Form의 속성 이름을 반드시 맞춰야함
  const changeHandler = (e) => {
    const target = e.target
    const id = target.id

    setSignUpFormData({
      ...signUpFormData,
      [id]: target.value,
    })
  }

  // 비밀번호 확인 입력 처리 함수
  const changeConfirmHandler = (e) => {
    const target = e.target
    const id = target.id

    setConfirmNumbers({
      ...confirmNumbers,
      [id]: target.value,
    })
  }

  // 전화번호 입력시 정규표현식으로 숫자만 받도록 변환
  const onInputPhone = (e) => {
    const target = e.target
    if (target.value) {
      target.value = target.value
        .replace(/[^0-9]/g, "")
        .replace(/(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{4})([0-9]{4})/g, "$1$2$3")
    }
  }

  // 이메일 인증번호 전송
  const clickSendMailCodeHandler = async () => {
    const res = await dispatch(
      postEmailVerificationCodeThunk({
        email: signUpFormData.email,
      })
    )

    // Thunk 결과 처리
    if (postEmailVerificationCodeThunk.fulfilled.match(res)) {
      setIsValidEmailButton(true)
      setIsSendCodeButtonDisalbed(true)
    } else if (postEmailVerificationCodeThunk.rejected.match(res)) {
      alert("이미 가입된 이메일입니다. 다른 이메일을 시도해주세요.")
    } else {
      console.log(res)
    }
  }

  // 이메일 인증번호 확인
  const onClickMailCheckHandler = async () => {
    const emailConfirmData = {
      email: signUpFormData.email,
      code: Number(confirmNumbers.emailConfirm),
    }
    try {
      const res = await postEmailCheck(emailConfirmData)

      if (res?.status === 200) {
        setIsEmailVerified(true)
      } else {
        console.log(res)
        alert("잘못된 인증번호입니다. 다시 확인해주세요.")
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 전화번호 인증번호 확인
  const onClickPhoneCheckHandler = async () => {
    const phoneConfirmData = {
      phone: signUpFormData.phone,
      code: Number(confirmNumbers.phoneConfirm),
    }
    try {
      const res = await postPhoneCheck(phoneConfirmData)
      console.log("postPhoneCheck", res)
      if (res?.status === 200) {
        setIsPhoneVerified(true)
        errors.phoneConfirm = ""
      } else {
        console.log(res)
        alert("잘못된 인증번호입니다. 다시 입력해주세요.")
      }
    } catch (error) {
      console.log(error)
      errors.phoneConfirm = "인증 오류. 다시 시도해주세요."
    }
  }

  return (
    // form 태그
    <>
      <Link to="/" className=" my-2 text-8xl font-bold">
        <img src={logoImage} alt="로고" className="size-36" />
      </Link>
      <form
        className="mb-10 flex size-full flex-col justify-between px-10"
        onSubmit={handleSignUpSubmit}
      >
        <div className=" flex w-full flex-col ">
          {/* 이메일 입력 창 */}
          <div className="grid w-full grid-cols-12 items-center gap-x-2.5">
            {isSendCodeButtonDisalbed && isValidEmail ? (
              <>
                <input
                  disabled={true}
                  value={signUpFormData.email}
                  type="email"
                  className="bg-stroke col-span-9 my-1 rounded-md border p-2.5"
                  placeholder="이메일 주소"
                  id="email"
                  maxLength={255}
                  autoComplete="username"
                />
                <button
                  disabled={true}
                  type="button"
                  className="bg-stroke col-span-3 h-12 rounded-md border px-3.5 py-2.5"
                >
                  {isEmailVerified ? (
                    "인증 완료"
                  ) : (
                    <Timer initialMinutes={5} initialSeconds={0} />
                  )}
                </button>
              </>
            ) : (
              <>
                {isValidEmail ? (
                  <>
                    <input
                      value={signUpFormData.email}
                      onChange={changeHandler}
                      type="email"
                      className="col-span-9 my-1 rounded-md border p-2.5"
                      placeholder="이메일 주소"
                      id="email"
                      maxLength={255}
                      autoComplete="username"
                      onBlur={validateEmail}
                    />
                    <button
                      disabled={!isValidEmail || isLoadingEmailCode}
                      type="button"
                      className={`${isLoadingEmailCode ? "bg-stroke" : "bg-mild"} col-span-3 h-12 rounded-md px-3.5 py-2.5`}
                      onClick={clickSendMailCodeHandler}
                    >
                      {isLoadingEmailCode ? "전송중" : "인증코드 전송"}
                    </button>
                  </>
                ) : (
                  <input
                    value={signUpFormData.email}
                    onChange={changeHandler}
                    type="email"
                    className="col-span-full  my-1 rounded-md border p-2.5"
                    placeholder="이메일 주소"
                    id="email"
                    maxLength={255}
                    autoComplete="username"
                    onBlur={validateEmail}
                  />
                )}
              </>
            )}
          </div>
          {!isValidEmail && (
            <span className="text-alert col-span-12 px-2.5">
              {errors.email}
            </span>
          )}
          {isEmailVerified && (
            <span className="col-span-12 px-2.5 text-green-500">
              이메일 인증 완료
            </span>
          )}
          {isValidEmailButton && !isEmailVerified ? (
            <div className="grid w-full grid-cols-12 items-center gap-2.5">
              <input
                disabled={isEmailVerified}
                value={confirmNumbers.emailConfirm}
                onChange={changeConfirmHandler}
                type="text"
                className="col-span-9  my-1 rounded-md border p-2.5"
                placeholder="인증 번호"
                id="emailConfirm"
                minLength={6}
                maxLength={6}
                autoComplete="username"
              />
              <button
                disabled={isEmailVerified}
                type="button"
                className="bg-mild col-span-3 h-12 rounded-md px-3.5 py-2.5"
                onClick={onClickMailCheckHandler}
              >
                인증하기
              </button>
            </div>
          ) : (
            <></>
          )}
          {/* 비밀번호 입력 창 */}
          <input
            value={signUpFormData.password}
            onChange={changeHandler}
            type="password"
            className=" my-1 w-full rounded-md border p-2.5"
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
            onBlur={confirmPasswordHandler}
          />
          {errors.password && (
            <span className="text-alert col-span-12 px-2.5">
              {errors.password}
            </span>
          )}
          {errors.passwordConfirm && (
            <span className="text-alert col-span-12 px-2.5">
              {errors.passwordConfirm}
            </span>
          )}
          {/* 닉네임 입력 창 */}
          <input
            value={signUpFormData.nickname}
            onChange={changeHandler}
            type="text"
            className=" my-1 w-full rounded-md border p-2.5"
            placeholder="닉네임"
            id="nickname"
            maxLength={20}
            onBlur={validateNickname}
          />
          {errors.nickname && (
            <span className="text-alert col-span-12 px-2.5">
              {errors.nickname}
            </span>
          )}
          {isValidNickname ? (
            <span className="px-2.5 text-green-500">
              사용 가능한 닉네임입니다.
            </span>
          ) : null}
          {/* 전화번호 입력 창 */}
          <div className="grid w-full grid-cols-12 items-center gap-x-2.5">
            {isSendPhoneCodeDisalbed && isValidPhone ? (
              <>
                <input
                  disabled={true}
                  value={signUpFormData.phone}
                  type="phone"
                  className="bg-stroke col-span-9 my-1 rounded-md border p-2.5"
                  placeholder="휴대전화번호"
                  id="phone"
                  maxLength={255}
                  autoComplete="username"
                />
                <button
                  disabled={true}
                  type="button"
                  className="bg-stroke col-span-3 h-12 rounded-md border px-3.5 py-2.5"
                >
                  {isPhoneVerified ? (
                    "인증 완료"
                  ) : (
                    <Timer initialMinutes={5} initialSeconds={0} />
                  )}
                </button>
              </>
            ) : (
              <>
                {isValidPhone ? (
                  <>
                    <input
                      value={signUpFormData.phone}
                      onInput={onInputPhone}
                      onChange={changeHandler}
                      type="text"
                      className="col-span-9  my-1 rounded-md border p-2.5"
                      placeholder="휴대전화번호"
                      id="phone"
                      maxLength="11"
                      onBlur={validatePhone}
                    />
                    <button
                      disabled={!isValidPhone || isLoadingPhoneCode}
                      type="button"
                      className={`${isLoadingPhoneCode ? "bg-stroke" : "bg-mild"}  col-span-3 h-12 rounded-md px-3.5 py-2.5`}
                      onClick={clickSendPhoneCodeHandler}
                    >
                      {isLoadingPhoneCode ? "전송중" : "인증코드 전송"}
                    </button>
                  </>
                ) : (
                  <input
                    value={signUpFormData.phone}
                    onChange={changeHandler}
                    type="phone"
                    className="col-span-full  my-1 rounded-md border p-2.5"
                    placeholder="전화번호"
                    id="phone"
                    maxLength={255}
                    autoComplete="username"
                    onBlur={validatePhone}
                  />
                )}
              </>
            )}
          </div>
          {!isValidPhone && (
            <span className="text-alert col-span-12 px-2.5">
              {errors.phone}
            </span>
          )}
          {errors.phoneConfirm && (
            <span className="text-alert col-span-12 px-2.5">
              {errors.phoneConfirm}
            </span>
          )}
          {isPhoneVerified && (
            <span className="col-span-12 px-2.5 text-green-500">
              전화번호 인증 완료
            </span>
          )}
          {isValidPhoneButton && !isPhoneVerified ? (
            <div className="grid w-full grid-cols-12 items-center gap-2.5">
              <input
                disabled={isPhoneVerified}
                value={confirmNumbers.phoneConfirm}
                onChange={changeConfirmHandler}
                type="text"
                className="col-span-9  my-1 rounded-md border p-2.5"
                placeholder="인증 번호"
                id="phoneConfirm"
                minLength={6}
                maxLength={6}
                autoComplete="username"
              />
              <button
                disabled={isPhoneVerified}
                type="button"
                className="bg-mild col-span-3 h-12 rounded-md px-3.5 py-2.5"
                onClick={onClickPhoneCheckHandler}
              >
                인증하기
              </button>
            </div>
          ) : (
            <></>
          )}
          {/* 생년월일 창 */}
          <input
            value={signUpFormData.birth}
            onChange={changeHandler}
            type="date"
            className=" my-1 w-full rounded-md border p-2.5"
            id="birth"
            min="1900-01-01"
            max="2024-08-16"
            onBlur={validateBirth}
          />
          {errors.birth && (
            <span className="text-alert col-span-12 px-2.5">
              {errors.birth}
            </span>
          )}
        </div>

        <div className="grid w-full grid-cols-2 gap-10">
          {/* 회원가입 버튼 */}
          {isEmailVerified && isPhoneVerified ? (
            <button
              type="submit"
              className="bg-mild h-12 rounded-md px-3.5 py-2.5"
            >
              회원가입
            </button>
          ) : (
            <button
              disabled={true}
              type="submit"
              className="bg-stroke h-12 rounded-md px-3.5 py-2.5"
            >
              회원가입
            </button>
          )}

          {/* 가입 취소 버튼 */}
          <Link
            to="/"
            type="button"
            className="bg-mild rounded-md px-3.5 py-2.5 text-center"
          >
            가입 취소
          </Link>
        </div>
      </form>
    </>
  )
}

export default SignUp
