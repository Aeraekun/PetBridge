import {Link, NavLink} from "react-router-dom"

const NavLogo = () => {
  return (
    <li className="flex h-12 cursor-pointer items-center px-2.5 text-xl">
      <Link to="/">로고</Link>
    </li>
  )
}

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
      category: "쇼츠",
      to: "/short",
    },
    {
      id: itemId++,
      category: "커뮤니티",
      to: "/communities",
    },
  ]
  return (
    <nav className="flex h-12 items-center">
      <NavLogo />
      {navItems.map((item) => (
        <NavLink
          key={item.id}
          to={item.to}
          className={({isActive}) =>
            `rounded-xl ${isActive ? "bg-yellow" : ""}`
          }
        >
          <span className="flex h-12 cursor-pointer items-center px-2.5 text-xl">
            {item.category}
          </span>
        </NavLink>
      ))}
    </nav>
  )
}

export default NavItemList
