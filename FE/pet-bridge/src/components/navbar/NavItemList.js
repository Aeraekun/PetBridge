import NavItem from "./NavItem"
import NavLogo from "./NavLogo"

function NavItemList() {
  return (
    <ul className="flex h-12 items-center">
      <NavLogo />
      <NavItem category={"보호 동물"} href={"/"} />
      <NavItem category={"실종 동물"} href={"/"} />
      <NavItem category={"쇼츠"} href={"/"} />
      <NavItem category={"커뮤니티"} href={"/"} />
    </ul>
  )
}

export default NavItemList
