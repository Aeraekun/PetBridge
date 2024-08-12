import {patchUserInfo, postPhoneCheck} from "api/users-api"
import Timer from "components/common/Timer"
import {
  postPhoneVerificationCodeThunk,
  selectBirth,
  selectIsLoadingPhoneCode,
  selectNickname,
  selectPhone,
} from "features/user/users-slice"
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import {
  validateBirth,
  validateNickname,
  validatePhone,
} from "utils/user-validations"

const SocialUpdateContainer = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userNickname = useSelector(selectNickname)
  const userPhone = useSelector(selectPhone)
  const userBirth = useSelector(selectBirth)

  // 닉네임, 전화번호, 생일 상태에서 불러와서 저장
  useEffect(() => {
    if (userNickname) {
      updateFormData.nickname = userNickname
    }
  }, [userNickname])

  useEffect(() => {
    if (userPhone) {
      updateFormData.phone = userPhone
    }
  }, [userPhone])

  useEffect(() => {
    if (userBirth) {
      updateFormData.birth = userBirth
    }
  }, [userBirth])
  // 입력시 state와 연동 처리
  // 회원가입 폼 제출을 위한 인자 저장 state
  const [updateFormData, setUpdateFormData] = useState({
    nickname: "",
    birth: "",
    phone: "",
  })

  // 전화번호 유효성 검사
  const [isValidPhone, setIsValidPhone] = useState(false)
  const [isPhoneVerified, setIsPhoneVerified] = useState(false)
  const [isLoadingPhoneCode, setIsLoadingPhoneCode] = useState(false)
  const [isValidPhoneButton, setIsValidPhoneButton] = useState(false)
  const [isSendPhoneCodeDisalbed, setIsSendPhoneCodeDisalbed] = useState(false)
  const [phoneCode, setPhoneCode] = useState("")
  // 전화번호 코드 전송 로딩중
  const isLoadingPhoneCodeState = useSelector(selectIsLoadingPhoneCode)

  useEffect(() => {
    setIsLoadingPhoneCode(isLoadingPhoneCodeState)
  }, [isLoadingPhoneCodeState])

  // phoneCode 변경시 handler
  const changeCodeHandler = (event) => {
    const code = event.target.value
    setPhoneCode(code)
  }

  // const setError = (new_error, new_error_message) => {
  //   console.log(new_error, new_error_message)
  //   if (new_error) {
  //     setErrors({...errors, [new_error]: new_error_message})
  //   }
  // }

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

  // 폼 제출 핸들러
  const onSubmitHandler = async (event) => {
    event.preventDefault()

    let newErrors = {}

    if (userNickname && userNickname === updateFormData.nickname) {
      newErrors.nickname = ""
    } else {
      let nicknameError = await validateNickname(updateFormData)
      if (nicknameError.new_error) {
        newErrors.nickname = nicknameError.new_error_message
      }
    }

    let birthError = validateBirth(updateFormData)
    if (birthError.new_error) {
      newErrors.birth = birthError.new_error_message
    }

    let phoneError = await validatePhone(updateFormData)
    if (phoneError.new_error) {
      newErrors.phone = phoneError.new_error_message
    } else if (!isPhoneVerified) {
      newErrors.phone = "*휴대전화 인증: 인증을 진행해주세요."
    }

    setErrors(newErrors)
    // 에러가 없다면
    if (Object.values(newErrors).every((value) => value === "")) {
      // patch 비동기 요청
      const formData = new FormData()
      formData.append(
        "userEditRequestDto",
        new Blob([JSON.stringify(updateFormData)], {type: "application/json"})
      )

      try {
        const res = await patchUserInfo(formData)
        if (res?.status === 200) {
          alert("개인정보 수정 완료.")
          navigate("/users/social/success")
        } else {
          alert("개인정보 수정 오류. 다시 시도해주세요.")
        }
        console.log(res)
        return
      } catch (error) {
        console.log(error)
      }
    }

    return console.log(newErrors)
  }

  // 칸 입력 완료 후 Focus 해제(onBlur)시 해당 입력에 대한Validation 동작
  const onBlurHandler = async (event) => {
    let new_error = ""
    let new_error_message = ""

    // 이벤트가 발생한 대상
    const target = event.target
    // 아이디 추출
    const inputType = target.id
    // id 값으로 입력 양식 확인 후 양식 검사
    // 닉네임 검사
    if (inputType === "nickname") {
      if (userNickname && userNickname === updateFormData.nickname) {
        new_error = "nickname"
        new_error_message = ""
      } else {
        const validation = await validateNickname(updateFormData)
        new_error = validation.new_error
        new_error_message = validation.new_error_message
      }
      // 생일 검사
    } else if (inputType === "birth") {
      const validation = validateBirth(updateFormData)
      new_error = validation.new_error
      new_error_message = validation.new_error_message
      // 전화번호 검사
    } else if (inputType === "phone") {
      const validation = await validatePhone(updateFormData)
      new_error = validation.new_error
      new_error_message = validation.new_error_message
      if (!new_error_message) {
        setIsValidPhone(true)
      }
    }
    console.log(new_error, new_error_message)
    // 오류 메시지 설정
    if (new_error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [inputType]: new_error_message,
      }))
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [inputType]: "",
      }))
    }
  }
  // 전화번호 인증코드 전송
  const clickSendPhoneCodeHandler = async () => {
    const res = await dispatch(
      postPhoneVerificationCodeThunk({phone: updateFormData.phone})
    )

    console.log(res, updateFormData)

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

  // 전화번호 인증번호 확인
  const onClickPhoneCheckHandler = async () => {
    const phoneConfirmData = {
      phone: updateFormData.phone,
      code: Number(phoneCode),
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
    <form className="my-10 flex size-full flex-col" onSubmit={onSubmitHandler}>
      <div className="my-5 flex justify-center">
        <span className="text-2xl font-bold"> 회원 추가 정보 입력</span>
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
          minLength={2}
          maxLength={20}
          onBlur={onBlurHandler}
        />
      </div>
      {errors.nickname && (
        <span className="text-alert col-span-12">{errors.nickname}</span>
      )}
      {/* 전화번호 입력 창 */}
      <div className="grid w-full grid-cols-12 items-center gap-x-2.5">
        {isSendPhoneCodeDisalbed && isValidPhone ? (
          <>
            <input
              disabled={true}
              value={updateFormData.phone}
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
                  value={updateFormData.phone}
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
                value={updateFormData.phone}
                onChange={changeHandler}
                type="phone"
                className="col-span-full  my-1 rounded-md border p-2.5"
                placeholder="전화번호"
                id="phone"
                maxLength={255}
                autoComplete="username"
                onBlur={onBlurHandler}
              />
            )}
          </>
        )}
      </div>
      {isValidPhoneButton && !isPhoneVerified ? (
        <div className="grid w-full grid-cols-12 items-center gap-2.5">
          <input
            disabled={isPhoneVerified}
            value={phoneCode}
            onChange={changeCodeHandler}
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
      {errors.phone && (
        <span className="text-alert col-span-12">{errors.phone}</span>
      )}
      {isPhoneVerified && (
        <span className="col-span-12 px-2.5 text-green-500">
          전화번호 인증 완료
        </span>
      )}
      {/* 생일 입력 창 */}
      <div className="w-full">
        <input
          value={updateFormData.birth}
          onChange={changeHandler}
          type="date"
          className=" my-1 w-full rounded-md border p-2.5"
          placeholder="생일"
          id="birth"
          min="1900-01-01"
          max="2024-08-16"
          onBlur={onBlurHandler}
        />
        {errors.birth && (
          <span className="text-alert col-span-12">{errors.birth}</span>
        )}
      </div>
      <div className="my-5 grid w-full grid-cols-2 gap-10">
        {/* 회원가입 버튼 */}
        {isPhoneVerified ? (
          <button className="bg-stroke h-12 rounded-md px-3.5 py-2.5">
            정보 입력
          </button>
        ) : (
          <button
            onClick={onSubmitHandler}
            className="bg-mild h-12 rounded-md px-3.5 py-2.5"
          >
            정보 입력
          </button>
        )}

        {/* 가입 취소 버튼 */}
        <Link
          to="/"
          type="button"
          className="bg-mild rounded-md px-3.5 py-2.5 text-center"
        >
          입력 취소
        </Link>
      </div>
    </form>
  )
}

export default SocialUpdateContainer
