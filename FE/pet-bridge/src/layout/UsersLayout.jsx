import {Outlet} from "react-router-dom"

const UsersLayout = () => {
  return (
    <div>
      <section className="fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <Outlet />
      </section>
    </div>
  )
}

export default UsersLayout
