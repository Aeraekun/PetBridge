import NavAction from "components/header/NavAction"
import NavInput from "components/header/NavInput"
import NavItemList from "components/header/NavItemList"

const Navbar = () => {
  return (
    <nav className="flex h-20 items-center justify-between border-b px-10">
      <NavItemList />
      <NavInput />
      <NavAction />
    </nav>
  )
}

export default Navbar
