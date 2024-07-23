import {Link} from "react-router-dom"
import PropTypes from "prop-types"

function NavLogo() {
  return (
    <li className="flex h-12 cursor-pointer items-center px-2.5 text-xl">
      <Link to="/">로고</Link>
    </li>
  )
}

function NavItem({category, href}) {
  return (
    <li className="flex h-12 cursor-pointer items-center px-2.5 text-xl">
      <Link to={href}>{category}</Link>
    </li>
  )
}

NavItem.propTypes = {
  category: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
}

function NavItemList() {
  return (
    <ul className="flex h-12 items-center">
      <NavLogo />
      <NavItem category={"보호 동물"} href={"/shelter"} />
      <NavItem category={"실종 동물"} href={"/lost-and-found"} />
      <NavItem category={"쇼츠"} href={"/shorts"} />
      <NavItem category={"커뮤니티"} href={"/communities"} />
    </ul>
  )
}

export default NavItemList
