import NavAction from "components/header/NavAction"
import NavItemList from "components/header/NavItemList"

const Navbar = () => {
  return (
    <nav className="flex h-20 flex-col items-center justify-center border-b px-10 sm:flex-row md:h-20 md:justify-between">
      <NavItemList />
      <NavAction />
    </nav>
  )
}

export default Navbar
