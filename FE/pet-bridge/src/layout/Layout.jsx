import {Outlet} from "react-router-dom"
import Navbar from "components/header/Navbar"

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="mx-auto flex w-[400px] flex-col items-center sm:w-11/12">
        <Outlet></Outlet>
      </main>
    </>
  )
}

export default Layout
