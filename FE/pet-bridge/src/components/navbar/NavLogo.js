import {Link} from "react-router-dom"

export default function NavLogo() {
  return (
    <li className="flex h-12 cursor-pointer items-center px-2.5 text-xl">
      <Link to="/">로고</Link>
    </li>
  )
}
