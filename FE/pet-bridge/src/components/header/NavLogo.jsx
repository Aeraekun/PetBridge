import {Link} from "react-router-dom"
import logoImage from "assets/image/logo.png"

const NavLogo = () => {
  return (
    <li className="flex h-8 cursor-pointer items-center px-2.5 text-xl sm:h-10 md:h-12">
      <Link to="/">
        <img src={logoImage} alt="로고" className="h-8 sm:h-10 md:h-12" />
      </Link>
    </li>
  )
}

export default NavLogo
