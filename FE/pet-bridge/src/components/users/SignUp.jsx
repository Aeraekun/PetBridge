import {useState} from "react"
import {signUpUser} from "api/usersApi"

function SignUp() {
  function SignUpForm() {
    const [signUpForm, setSignUpForm] = useState({
      name: "default",
      email: "",
      password: "",
      nickname: "",
      birth: "",
      phone: "",
    })

    // Submit 양식
    function handleSignUpSubmit(e) {
      e.preventDefault()
      console.log("회원가입 버튼 클릭")
      console.log(signUpForm)
      signUpUser(signUpForm)
    }

    function onInputPhone(target) {
      console.log(target)
      if (target.value) {
        target.value = target.value
          .replace(/[^0-9]/g, "")
          .replace(
            /(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g,
            "$1-$2-$3"
          )
      }
    }

    return (
      <form action="" onSubmit={handleSignUpSubmit}>
        {/* 이메일 입력 창 */}
        <input
          value={signUpForm.email}
          onChange={(e) => {
            setSignUpForm({
              ...signUpForm,
              email: e.target.value,
            })
          }}
          type="email"
          className="w-full rounded-md border p-2.5"
          placeholder="email"
          id="email-input"
          maxLength={255}
        />
        {/* 비밀번호 입력 창 */}
        <input
          value={signUpForm.password}
          onChange={(e) => {
            setSignUpForm({
              ...signUpForm,
              password: e.target.value,
            })
          }}
          type="password"
          className="w-full rounded-md border p-2.5"
          placeholder="password"
          id="password-input"
          minLength={8}
          maxLength={16}
        />
        {/* 닉네임 입력 창 */}
        <input
          value={signUpForm.nickname}
          onChange={(e) => {
            setSignUpForm({
              ...signUpForm,
              nickname: e.target.value,
            })
          }}
          type="text"
          className="w-full rounded-md border p-2.5"
          placeholder="nickname"
          id="nickname-input"
          maxLength={20}
        />
        {/* 전화번호 입력 창 */}
        <input
          value={signUpForm.phone}
          onChange={(e) => {
            setSignUpForm({
              ...signUpForm,
              phone: e.target.value,
            })
          }}
          onInput={onInputPhone}
          type="phone"
          className="w-full rounded-md border p-2.5"
          placeholder="phone"
          id="phone-input"
          maxLength="13"
        />
        {/* 생일 선택 창 */}
        <input
          value={signUpForm.birth}
          onChange={(e) => {
            setSignUpForm({
              ...signUpForm,
              birth: e.target.value,
            })
          }}
          type="date"
          className="w-full rounded-md border p-2.5"
          placeholder="birth"
          id="birth-input"
          maxLength="13"
        />
        {/* 회원가입 버튼 */}
        <button className="h-12 rounded-md bg-yellow px-3.5 py-2.5">
          회원가입
        </button>
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
