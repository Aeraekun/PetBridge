import {Link} from "react-router-dom"
import Button from "components/common/Button"

function NavAction() {
  return (
    <ul className="flex h-12 items-center text-xl">
      <li className="mx-2.5 flex h-full cursor-pointer items-center text-xl">
        <Link to="/login">로그인</Link>
      </li>
      <li className="mx-2.5 flex h-full cursor-pointer items-center text-xl">
        <Link to="/signup">회원가입</Link>
      </li>
      <li className="mx-2.5 flex h-full cursor-pointer items-center text-xl">
        <Button text="마이 페이지" />
      </li>
    </ul>
  )
}

export default NavAction
