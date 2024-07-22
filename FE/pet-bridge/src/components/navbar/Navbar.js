import NavAction from "./NavAction"
import NavInput from "./NavInput"
import NavItemList from "./NavItemList"

function Navbar() {
  return (
    <nav className="flex h-20 items-center justify-between border-b px-10">
      <NavItemList />
      <NavInput />
      <NavAction />
    </nav>
  )
}

export default Navbar
