import {patchUserInfo} from "api/users-api"
import {useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import {
  validateBirth,
  validateNickname,
  validatePhone,
} from "utils/user-validations"

const SocialUpdateContainer = () => {
  const navigate = useNavigate()
  // 입력시 state와 연동 처리
  // 회원가입 폼 제출을 위한 인자 저장 state
  const [updateFormData, setUpdateFormData] = useState({
    nickname: "",
    birth: "",
    phone: "",
  })

  const setError = (new_error, new_error_message) => {
    if (new_error) {
      setErrors({...errors, [new_error]: new_error_message})
    }
  }

  // 에러 메시지 저장 함수
  const [errors, setErrors] = useState({})

  // 입력시 처리 함수
  // input 태그의 id와 Form의 속성 이름을 반드시 맞춰야함
  const changeHandler = (event) => {
    const target = event.target
    const id = target.id

    setUpdateFormData({
      ...updateFormData,
      [id]: target.value,
    })
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    let newErrors = {}

    let nicknameError = validateNickname(updateFormData)
    if (nicknameError.new_error) {
      newErrors.nickname = nicknameError.new_error_message
    }

    let birthError = validateBirth(updateFormData)
    if (birthError.new_error) {
      newErrors.birth = birthError.new_error_message
    }

    let phoneError = validatePhone(updateFormData)
    if (phoneError.new_error) {
      newErrors.phone = phoneError.new_error_message
    }

    setErrors(newErrors)
    // 에러가 없다면
    if (Object.values(newErrors).every((value) => value === "")) {
      // patch 비동기 요청
      try {
        const res = await patchUserInfo(updateFormData)
        navigate("/users/social/success")
        console.log(res)
        return
      } catch (error) {
        console.log(error)
      }
    }

    return console.log(newErrors)
  }

  // 칸 입력 완료 후 Focus 해제(onBlur)시 해당 입력에 대한Validation 동작
  const onBlurHandler = (event) => {
    let new_error = ""
    let new_error_message = ""

    // 이벤트가 발생한 대상
    const target = event.target
    // 아이디 추출
    const inputType = target.id
    // id 값으로 입력 양식 확인 후 양식 검사
    if (inputType === "nickname") {
      ;({new_error, new_error_message} = validateNickname(updateFormData))
      setError(new_error, new_error_message)
    } else if (inputType === "birth") {
      ;({new_error, new_error_message} = validateBirth(updateFormData))
      setError(new_error, new_error_message)
    } else if (inputType === "phone") {
      ;({new_error, new_error_message} = validatePhone(updateFormData))
      setError(new_error, new_error_message)
    }
  }

  return (
    <form
      className="my-10 flex size-full flex-col p-5"
      onSubmit={onSubmitHandler}
    >
      <div className="my-5 flex justify-center">
        <span className="text-2xl font-bold"> 회원 필수 정보 입력</span>
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
          onBlur={onBlurHandler}
        />
        {errors.nickname && (
          <span className="col-span-12 text-alert">{errors.nickname}</span>
        )}
      </div>
      {/* 전화번호 입력 창 */}
      <div className="w-full">
        <input
          value={updateFormData.phone}
          onChange={changeHandler}
          type="text"
          className=" my-1 w-full rounded-md border p-2.5"
          placeholder="전화번호"
          id="phone"
          minLength={11}
          maxLength={11}
          onBlur={onBlurHandler}
        />
        {errors.phone && (
          <span className="col-span-12 text-alert">{errors.phone}</span>
        )}
      </div>
      {/* 생일 입력 창 */}
      <div className="w-full">
        <input
          value={updateFormData.birth}
          onChange={changeHandler}
          type="text"
          className=" my-1 w-full rounded-md border p-2.5"
          placeholder="생일"
          id="birth"
          minLength={8}
          maxLength={8}
          onBlur={onBlurHandler}
        />
        {errors.birth && (
          <span className="col-span-12 text-alert">{errors.birth}</span>
        )}
      </div>
      <div className="my-5 grid w-full grid-cols-2 gap-10">
        {/* 회원가입 버튼 */}
        <button type="submit" className="h-12 rounded-md bg-mild px-3.5 py-2.5">
          회원 가입
        </button>
        {/* 가입 취소 버튼 */}
        <Link
          to="/"
          type="button"
          className="rounded-md bg-mild px-3.5 py-2.5 text-center"
        >
          가입 취소
        </Link>
      </div>
    </form>
  )
}

export default SocialUpdateContainer
