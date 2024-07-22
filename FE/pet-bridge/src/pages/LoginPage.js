import {Link} from "react-router-dom"
import Button from "components/common/Button"

const Login = () => {
  return (
    <section className="fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
      {/* 개발용 임시 홈버튼 */}
      <Link to="/">
        <Button text={"home"} />
      </Link>

      {/* 로그인 컴포넌트 */}
      <div className="flex size-[600px] flex-col place-content-center items-center rounded-lg border">
        <div className="flex h-[385px] w-[400px] flex-col space-y-2.5">
          <form className=" space-y-2.5">
            {/* 이메일 입력창 */}
            <input
              type="email"
              className="w-full rounded-md border p-2.5"
              placeholder="Email"
              id="email-input"
            />

            {/* 비밀번호 입력창 */}
            <input
              type="password"
              className="w-full rounded-md border p-2.5"
              placeholder="password"
              id="password-input"
            />

            {/* 로그인 버튼 */}
            <button className="h-12 w-full rounded-md bg-yellow px-3.5 py-2.5">
              로그인
            </button>
          </form>

          {/* ID찾기, PW찾기, 회원가입 */}
          <div className="flex justify-between">
            <Link to="/">
              <Button text="ID 찾기" />
            </Link>
            <Link to="/">
              <Button text="PW 찾기" />
            </Link>
            <Link to="/signup">
              <Button text="회원가입" />
            </Link>
          </div>

          {/* 구분선 */}
          <div className="flex h-7 w-full flex-row items-center">
            <hr className="grow border-gray-300" />
            <span className="m-2 line-clamp-1 text-gray-500">Connect With</span>
            <hr className="grow border-gray-300" />
          </div>

          {/* 소셜 로그인 */}
          <div className="flex w-full flex-row justify-between">
            <logo className="size-12 rounded-full bg-[#fee500]"></logo>
            <logo className="size-12 rounded-full bg-[#03C75A]"></logo>
            <logo className="size-12 rounded-full bg-[#4285F4]"></logo>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
