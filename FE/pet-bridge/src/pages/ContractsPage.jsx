import Navbar from "components/header/Navbar"
import {Outlet} from "react-router-dom"

const ContractsPage = () => {
  return (
    <div>
      <Navbar />
      <main className="flex flex-col items-center">
        <Outlet></Outlet>
      </main>
    </div>
  )
}

export default ContractsPage
