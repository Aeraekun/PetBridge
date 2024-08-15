import {NavLink} from "react-router-dom"
import NavLogo from "./NavLogo"

const NavItemList = () => {
  let itemId = 0
  const navItems = [
    {
      id: itemId++,
      category: "보호동물",
      to: "/shelter/0",
    },
    {
      id: itemId++,
      category: "실종",
      to: "/lost-and-found",
    },
    {
      id: itemId++,
      category: "펫픽",
      to: "/petpick",
    },
    {
      id: itemId++,
      category: "입양 홍보",
      to: "/promotions",
    },
    {
      id: itemId++,
      category: "커뮤니티",
      to: "/communities",
    },
    {
      id: itemId++,
      category: "집사 유형 검사",
      to: "/recommendation",
    },
  ]
  return (
    <nav className="flex h-8 items-center sm:h-10 md:h-12">
      <NavLogo />
      <ul className="flex">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.to}
            className={({isActive}) =>
              `rounded-xl truncate ${isActive ? "bg-yellow font-bold" : ""}`
            }
          >
            <span className="flex h-12 cursor-pointer items-center  px-1 text-center text-sm sm:text-lg  md:px-2.5 md:text-xl">
              {item.category}
            </span>
          </NavLink>
        ))}
      </ul>
    </nav>
  )
}

export default NavItemList
