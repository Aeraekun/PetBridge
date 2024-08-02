import {Outlet} from "react-router-dom"
import Navbar from "components/header/Navbar"

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center">
        <Outlet className="w-[1000px]"></Outlet>
      </main>
    </>
  )
}

export default Layout
