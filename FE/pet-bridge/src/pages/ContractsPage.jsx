import {Outlet} from "react-router-dom"

const ContractsPage = () => {
  return (
    <div>
      <main className="flex flex-col items-center">
        <Outlet></Outlet>
      </main>
    </div>
  )
}

export default ContractsPage
