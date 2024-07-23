import {useState} from "react"
import {signUpUser} from "api/usersApi"
import {Link} from "react-router-dom"

function SignUp() {
  function SignUpForm() {
    // 회원가입 폼 제출을 위한 인자 저장 state
    const [signUpFormData, setSignUpFormData] = useState({
      name: "default",
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

    // 전화번호 유효성 검사
    const [isValidPhone, setIsValidPhone] = useState(false)
    const [isValidPhoneButton, setIsValidPhoneButton] = useState(false)

    // 유효성 검사 정규표현식
    const emailPattern = /\S+@\S+\.\S+/
    const passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/
    const birthTypePattern = /^\d{8}$/
    const birthPattern =
      /^(19[0-9]{2}|20[0-9]{2})(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/

    // 이메일 유효성 검사
    function validateEmail() {
      if (!signUpFormData.email) {
        errors.email = "*이메일: 필수 정보입니다."
      } else if (!emailPattern.test(signUpFormData.email)) {
        errors.email = "*이메일: 사용할 수 없는 이메일입니다."
      } else {
        setIsValidEmail(true)
      }

      setErrors({
        ...errors,
        email: errors.email,
      })
    }

    // 비밀번호 유효성 검사
    // 8 ~ 16자, 영문 대소문자, 숫자, 특수문자 필수
    function validatePassword() {
      if (!signUpFormData.password) {
        errors.password = "*비밀번호: 필수 정보입니다."
      } else if (!passwordPattern.test(signUpFormData.password)) {
        errors.password =
          "*비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요."
      } else {
        errors.password = ""
      }

      setErrors({
        ...errors,
        password: errors.password,
      })
    }

    const phonePattern = /^\d{3}-\d{4}-\d{4}$/

    // 전화번호 유효성 검사
    function validatePhone() {
      if (!signUpFormData.phone) {
        errors.phone = "*휴대전화번호: 필수 정보입니다."
      } else if (!phonePattern.test(signUpFormData.phone)) {
        errors.phone = "*휴대전화번호: 010-1234-5678 양식으로 작성해주세요."
      } else {
        setIsValidPhone(true)
      }

      setErrors({
        ...errors,
        phone: errors.phone,
      })
    }

    // 생일 유효성 검사
    // 8자리 숫자인지 확인
    function validateBirth() {
      if (!signUpFormData.birth) {
        errors.birth = "*생년월일: 필수 정보입니다."
      } else if (!birthTypePattern.test(signUpFormData.birth)) {
        errors.birth = "*생년월일: 20240723 양식으로 작성해주세요."
      } else if (!birthPattern.test(signUpFormData.birth)) {
        errors.birth =
          "*생년월일: 19000101 - 20991231 이내의 생일을 입력해주세요."
      } else {
        errors.birth = ""
      }

      setErrors({
        ...errors,
        birth: errors.birth,
      })
    }

    // 회원가입 제출시 유효성 검사
    function validateTotalForm() {
      const errors = {}
      if (!signUpFormData.nickname) {
        errors.nickname = "*닉네임: 필수 정보입니다."
      }
      if (!signUpFormData.email) {
        errors.email = "*이메일: 필수 정보입니다."
      } else if (!emailPattern.test(signUpFormData.email)) {
        errors.email = "*이메일: 사용할 수 없는 이메일입니다."
      }
      if (!signUpFormData.password) {
        errors.password = "*비밀번호: 필수 정보입니다."
      } else if (!passwordPattern.test(signUpFormData.password)) {
        errors.password =
          "*비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요."
      }
      if (!signUpFormData.phone) {
        errors.phone = "*휴대전화번호: 필수 정보입니다."
      } else if (!phonePattern.test(signUpFormData)) {
        errors.phone = "*휴대전화번호: 010-1234-5678 양식으로 작성해주세요."
      }

      if (!signUpFormData.birth) {
        errors.birth = "*생년월일: 필수 정보입니다."
      } else if (!birthTypePattern.test(signUpFormData.birth)) {
        errors.birth = "*생년월일: 20240723 양식으로 작성해주세요."
      } else if (!birthPattern.test(signUpFormData.birth)) {
        errors.birth =
          "*생년월일: 19000101 - 20991231 이내의 생일을 입력해주세요."
      } else {
        errors.birth = ""
      }

      return errors
    }

    // Submit 양식
    // signUpUser Axios 요청을 보냄
    // 인자 : name(삭제 예정), email, password, nickname, birth, phone
    function handleSignUpSubmit(e) {
      e.preventDefault()

      const validationErrors = validateTotalForm()

      if (Object.keys(validationErrors).length === 0) {
        console.log("SignUpFormData: ", signUpFormData)
        signUpUser(signUpFormData)
      } else {
        console.log(validationErrors)
        setErrors(validationErrors)
      }
    }

    // 입력시 처리 함수
    // input 태그의 id와 Form의 속성 이름을 반드시 맞춰야함
    function changeHandler(e) {
      const target = e.target
      const id = target.id

      setSignUpFormData({
        ...signUpFormData,
        [id]: target.value,
      })
    }

    // 비밀번호 확인 입력 처리 함수
    function changeConfirmHandler(e) {
      const target = e.target
      const id = target.id

      setConfirmNumbers({
        ...confirmNumbers,
        [id]: target.value,
      })
    }

    // 전화번호 입력시 정규표현식으로 ###-####-#### 형식으로 변환
    function onInputPhone(e) {
      const target = e.target
      if (target.value) {
        target.value = target.value
          .replace(/[^0-9]/g, "")
          .replace(
            /(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{4})([0-9]{4})/g,
            "$1-$2-$3"
          )
      }
    }

    return (
      <form
        className="mt-5 flex w-full flex-col p-5"
        onSubmit={handleSignUpSubmit}
      >
        <div className=" flex w-full flex-col ">
          {/* 이메일 입력 창 */}
          <div className="grid w-full grid-cols-12 items-center gap-x-2.5">
            <input
              value={signUpFormData.email}
              onChange={changeHandler}
              type="email"
              className="col-span-9  my-1 rounded-md border p-2.5"
              placeholder="이메일 주소"
              id="email"
              maxLength={255}
              autoComplete="username"
              onBlur={validateEmail}
            />
            <button
              disabled={!isValidEmail}
              type="button"
              className="col-span-3 h-12 rounded-md bg-yellow px-3.5 py-2.5"
              onClick={() => setIsValidEmailButton(true)}
            >
              인증코드 전송
            </button>
          </div>
          {!isValidEmail && (
            <span className="col-span-12 text-alert">{errors.email}</span>
          )}
          {isValidEmailButton && (
            <div className="grid w-full grid-cols-12 items-center gap-2.5">
              <input
                value={confirmNumbers.emailConfirm}
                onChange={changeConfirmHandler}
                type="email"
                className="col-span-9  my-1 rounded-md border p-2.5"
                placeholder="인증 번호"
                id="emailConfirm"
                maxLength={255}
                autoComplete="username"
              />
              <button
                type="button"
                className="col-span-3 h-12 rounded-md bg-yellow px-3.5 py-2.5"
              >
                인증하기
              </button>
            </div>
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
          />
          {errors.password && (
            <span className="col-span-12 text-alert">{errors.password}</span>
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
          />
          {errors.nickname && (
            <span className="col-span-12 text-alert">{errors.nickname}</span>
          )}
          {/* 전화번호 입력 창 */}
          <div className="grid w-full grid-cols-12 items-center gap-x-2.5">
            <input
              value={signUpFormData.phone}
              onInput={onInputPhone}
              onChange={changeHandler}
              type="text"
              className="col-span-9  my-1 rounded-md border p-2.5"
              placeholder="휴대전화번호"
              id="phone"
              maxLength="13"
              onBlur={validatePhone}
            />
            <button
              disabled={!isValidPhone}
              type="button"
              className="col-span-3 h-12 rounded-md bg-yellow px-3.5 py-2.5"
              onClick={() => setIsValidPhoneButton(true)}
            >
              인증코드 전송
            </button>
          </div>
          {isValidPhone && (
            <span className="col-span-12 text-alert">{errors.phone}</span>
          )}
          {isValidPhoneButton && (
            <div className="grid w-full grid-cols-12 items-center gap-2.5">
              <input
                value={confirmNumbers.phoneConfirm}
                onChange={changeConfirmHandler}
                type="text"
                className="col-span-9  my-1 rounded-md border p-2.5"
                placeholder="인증 번호"
                id="phoneConfirm"
                maxLength={255}
                autoComplete="username"
              />
              <button
                type="button"
                className="col-span-3 h-12 rounded-md bg-yellow px-3.5 py-2.5"
              >
                인증하기
              </button>
            </div>
          )}
          {/* 생년월일 창 */}
          <input
            value={signUpFormData.birth}
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

        {/* 회원가입 버튼 */}
        <div className="grid w-full grid-cols-2 gap-10">
          <button
            type="submit"
            className="h-12 rounded-md bg-yellow px-3.5 py-2.5"
          >
            회원가입
          </button>
          {/* 가입 취소 버튼 */}
          <Link
            to="/"
            type="button"
            className="rounded-md bg-yellow px-3.5 py-2.5 text-center"
          >
            가입 취소
          </Link>
        </div>
      </form>
    )
  }
  return (
    <>
      <SignUpForm />
    </>
  )
}

export default SignUp
