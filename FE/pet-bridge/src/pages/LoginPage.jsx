import {Link} from "react-router-dom"
import Button from "components/common/Button"
import Login from "components/auth/Login"

const LoginPage = () => {
  return (
    <section className="fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
      {/* 개발용 임시 홈버튼 */}
      <Link to="/">
        <Button text={"home"} />
      </Link>
      <Login />
    </section>
  )
}

export default LoginPage
